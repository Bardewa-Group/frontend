import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    Box,
    Button,
    Chip,
    Stack,
    Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PayConfirmModal from "./PayConfirmModal";

const statusColor = {
    pending: "warning",
    accepted: "success",
    rejected: "error",
    completed: "primary",
};

export const RequestCard = ({
    req,
    p,
    isRevealed,
    handlePay,
    handleCardClick,
}) => {
    const [payModalOpen, setPayModalOpen] = useState(false);

    const openPayModal = (e) => {
        e.stopPropagation();
        setPayModalOpen(true);
    };

    const closePayModal = () => {
        setPayModalOpen(false);
    };

    const confirmPayment = async () => {
        try {
            console.log("sucess")
            await handlePay(req.id);
        } catch (error) {
            console.error(error);
        } finally {
            setPayModalOpen(false);
        }
    };

    return (
        <Card
            sx={{
                width: "100%",
                borderRadius: 1,
                bgcolor: (theme) => theme.palette.background.paper,
                p: .6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            bgcolor: "primary.light",
                            color: "primary.contrastText",
                            fontWeight: 700,
                        }}
                    >
                        {p.username?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "text.primary",
                        }}
                    >
                        {p.username}
                    </Typography>
                }
                subheader={
                    <Chip
                        label={req.status}
                        size="small"
                        color={statusColor[req.status] || "default"}
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: 600,
                            fontSize: 11,
                            mt: 0.5,
                        }}
                    />
                }
                action={
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            whiteSpace: "nowrap",
                            fontSize: 11,
                            fontWeight: 500,
                        }}
                    >
                        {new Date(req.created_at).toLocaleDateString()}
                    </Typography>
                }
                sx={{
                    pb: 1,
                    "& .MuiCardHeader-content": { overflow: "hidden" }, // makes username and chip aligned properly
                }}
            />


            <Divider sx={{ my: 1.5 }} />

            <CardContent>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="flex-start"
                >
                    {/* Left: profile info */}
                    <Stack flex={1} spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Profession:</strong> {p.profession}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Rate:</strong> ${p.hourly_rate}/hr
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Experience:</strong> {p.experience_years} yrs
                        </Typography>
                    </Stack>

                    {/* Right: contact info or actions */}
                    <Stack spacing={1} alignItems="center">
                        {isRevealed ? (
                            <>
                                <Stack spacing={1}>
                                    {p.contact_email && (
                                        <Box display="flex" alignItems="center">
                                            <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {p.contact_email}
                                            </Typography>
                                        </Box>
                                    )}
                                    {p.contact_number && (
                                        <Box display="flex" alignItems="center">
                                            <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {p.contact_number}
                                            </Typography>
                                        </Box>
                                    )}
                                    {p.location && (
                                        <Box display="flex" alignItems="center">
                                            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {p.location}
                                            </Typography>
                                        </Box>
                                    )}
                                </Stack>

                                {/* Edit Status button only after payment */}
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: 13,
                                        mt: 2,
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCardClick(req);
                                    }}
                                >
                                    Edit Status
                                </Button>
                            </>
                        ) : (
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="small"
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: 14,
                                        py: 1,
                                    }}
                                    onClick={openPayModal}
                                >
                                    Pay ${p.hourly_rate}
                                </Button>
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </CardContent>


            {/* Pay Confirm Modal */}
            <PayConfirmModal
                open={payModalOpen}
                onClose={closePayModal}
                onConfirm={confirmPayment}
                price={p.hourly_rate}
                username={p.username}
            />
        </Card>
    );
};
