import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Divider,
    TextField,
    CircularProgress,
    Box,
} from '@mui/material';
import { displayError } from '../../helper/config';

const PayConfirmModal = ({ open, onClose, onConfirm, price, username }) => {
    const [txnId, setTxnId] = useState('');
    const [paying, setPaying] = useState(false);

    const payAmount = (price * 0.1).toFixed(2);
    const esewaNumber = "9816710346"; // your real eSewa number here
    const qrImageLink = "https://your-qr-code-link.com"; // optional: your QR image here

    const handleConfirmPayment = async () => {
        if (!txnId) {
            displayError("Please enter your Transaction ID after payment.");
            return;
        }

        setPaying(true);

        try {
            const payAmount = (price * 0.1).toFixed(2); // Same 10% advance
            const pid = "ORDER-" + new Date().getTime(); // Generate unique product id
            const scd = "EPAYTEST"; // Change to your real Merchant Code in production
            const url = "https://uat.esewa.com.np/epay/transrec"; // For TEST, change to https://esewa.com.np/epay/transrec for LIVE

            const formData = new URLSearchParams();
            formData.append('amt', payAmount);
            formData.append('rid', txnId);
            formData.append('pid', pid);
            formData.append('scd', scd);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            });

            const text = await response.text();

            if (text.includes("Success")) {
                // Valid Transaction
                setPaying(false);
                onConfirm(); // Pass txnId if needed
            } else {
                // Invalid Transaction
                setPaying(false);
                displayError("Payment verification failed. Please check your Transaction ID and try again.");
            }
        } catch (error) {
            setPaying(false);
            displayError("Network error while verifying payment.");
        } finally {
            // onConfirm(); 
        }
    };


    return (
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
                        Send <strong>NPR {payAmount}</strong> to
                    </Typography>

                    <Typography variant="h5" fontWeight={700} color="primary">
                        {esewaNumber}
                    </Typography>

                    {/* QR CODE optional */}
                    <Box
                        component="img"
                        src={qrImageLink}
                        alt="eSewa QR"
                        sx={{ width: 120, height: 120, borderRadius: 2, mt: 1 }}
                    />

                    <Divider sx={{ width: '100%', my: 2 }} />

                    {/* Transaction ID input */}
                    <TextField
                        label="Enter eSewa Transaction ID"
                        value={txnId}
                        onChange={(e) => setTxnId(e.target.value)}
                        fullWidth
                    />

                    {/* Optional: Upload screenshot feature here later */}

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
                        onClick={handleConfirmPayment}
                        fullWidth
                        variant="contained"
                        size="medium"
                        disabled={paying}
                        sx={{ fontWeight: 600, textTransform: 'none' }}
                    >
                        {paying ? <CircularProgress size={24} color="inherit" /> : "Confirm Payment"}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default PayConfirmModal;
