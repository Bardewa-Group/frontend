import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    CircularProgress,
} from '@mui/material';
import { baseURL, config, displayError } from '../../helper/config';
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";


const PayConfirmModal = ({ open, onClose, price, onConfirm }) => {
    const [paying, setPaying] = useState(false);

    const newUrl = window.location.origin + window.location.pathname;

    const [formData, setFormData] = useState({
        amount: (price * 0.1).toFixed(2),
        tax_amount: "0",
        total_amount: (price * 0.1).toFixed(2),
        transaction_uuid: uuidv4(),
        product_service_charge: "0",
        product_delivery_charge: "0",
        product_code: "EPAYTEST",
        success_url: newUrl,
        failure_url: newUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: "",
        secret: "8gBm/:&EnhH.1/q", // Test secret key
    });

    const formRef = useRef(null);

    const generateSignature = (total_amount, transaction_uuid, product_code, secret) => {
        const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
        const hash = CryptoJS.HmacSHA256(hashString, secret);
        return CryptoJS.enc.Base64.stringify(hash);
    };

    useEffect(() => {
        const { total_amount, transaction_uuid, product_code, secret } = formData;
        const hashedSignature = generateSignature(total_amount, transaction_uuid, product_code, secret);
        setFormData(prev => ({ ...prev, signature: hashedSignature }));
    }, [formData.total_amount, formData.transaction_uuid, formData.product_code]);

    const handlePayment = () => {
        if (!formData.signature) {
            displayError("Something went wrong generating signature.");
            return;
        }

        setPaying(true);

        // Create a new form dynamically
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"; // or rc-epay if testing

        const addInput = (name, value) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = name;
            input.value = value;
            form.appendChild(input);
        };

        // Add all required fields
        addInput("amount", formData.amount);
        addInput("tax_amount", formData.tax_amount);
        addInput("total_amount", formData.total_amount);
        addInput("transaction_uuid", formData.transaction_uuid);
        addInput("product_service_charge", formData.product_service_charge);
        addInput("product_delivery_charge", formData.product_delivery_charge);
        addInput("product_code", formData.product_code);
        addInput("success_url", formData.success_url);
        addInput("failure_url", formData.failure_url);
        addInput("signed_field_names", formData.signed_field_names);
        addInput("signature", formData.signature);

        // Attach and submit
        document.body.appendChild(form);
        form.submit();

        // Clean up
        document.body.removeChild(form);

        setPaying(false);
    };

    useEffect(() => {
        // Check for payment response in URL
        const urlParams = new URLSearchParams(window.location.search);
        const dataParam = urlParams.get('data');
        if (dataParam) {
            try {
                const decodedData = JSON.parse(
                    atob(dataParam)
                );
                if (decodedData.status === 'COMPLETE') {
                    onConfirm()
                    const newUrl = window.location.origin + window.location.pathname;
                    window.history.replaceState({}, document.title, newUrl);
                } else {
                    console.log('failure');
                }
            } catch (error) {
                console.error('Error parsing payment response:', error);
                console.log('failure');
            }
        }
    }, []);

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="xs"
                sx={{ backdropFilter: "blur(2px)" }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        textAlign: 'center',
                    }}
                >
                    Pay Advance with eSewa
                </DialogTitle>

                <DialogContent sx={{ p: 3 }}>
                    <Stack spacing={3} alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            Advance Payment Amount:
                        </Typography>

                        <Typography variant="h5" fontWeight={700} color="primary">
                            NPR {formData.amount}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Click Pay Now to proceed with secure payment via eSewa.
                        </Typography>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Stack direction="row" spacing={2} width="100%" px={2}>
                        <Button
                            onClick={onClose}
                            fullWidth
                            variant="outlined"
                            size="medium"
                            disabled={paying}
                            sx={{ fontWeight: 600, textTransform: 'none' }}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handlePayment}
                            fullWidth
                            variant="contained"
                            size="medium"
                            disabled={paying}
                            sx={{ fontWeight: 600, textTransform: 'none' }}
                        >
                            {paying ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>

            {/* Hidden Form to auto-submit */}
            <form
                ref={formRef}
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
                style={{ display: 'none' }}
            >
                <input type="hidden" name="amount" value={formData.amount} />
                <input type="hidden" name="tax_amount" value={formData.tax_amount} />
                <input type="hidden" name="total_amount" value={formData.total_amount} />
                <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
                <input type="hidden" name="product_service_charge" value={formData.product_service_charge} />
                <input type="hidden" name="product_delivery_charge" value={formData.product_delivery_charge} />
                <input type="hidden" name="product_code" value={formData.product_code} />
                <input type="hidden" name="success_url" value={formData.success_url} />
                <input type="hidden" name="failure_url" value={formData.failure_url} />
                <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
                <input type="hidden" name="signature" value={formData.signature} />
            </form>
        </>
    );
};

export default PayConfirmModal;
