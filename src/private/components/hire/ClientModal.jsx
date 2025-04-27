import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Stack,
    Divider,
    Button,
    Rating,
    TextField,
    Avatar,
    Box
} from "@mui/material";

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ClientModal = ({ selectedReq, handleClose, handleComplete, rating, setRating, comment, setComment, handleReview }) => {
    const worker = selectedReq?.worker_profile;

    return (
        <Dialog open={Boolean(selectedReq)} onClose={handleClose} fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { borderRadius: 4 } }}>

            {/* Title */}
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar>{worker?.username?.charAt(0)}</Avatar>
                <Box>
                    <Typography variant="h6" fontWeight={700}>
                        {worker?.username || "N/A"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Worker Profile
                    </Typography>
                </Box>
            </DialogTitle>

            {/* Content */}
            <DialogContent dividers sx={{ p: 3 }}>
                <Stack spacing={3}>

                    {/* Worker Info Section */}
                    <Stack spacing={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <WorkOutlineIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                <strong>Profession:</strong> {worker?.profession || "N/A"}
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <AttachMoneyIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                <strong>Rate:</strong> ${worker?.hourly_rate || "0.00"}/hr
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                <strong>Experience:</strong> {worker?.experience_years || "0"} yrs
                            </Typography>
                        </Box>
                    </Stack>

                    <Divider />

                    {/* Mark as Completed */}
                    {selectedReq?.status === "accepted" && (
                        <Stack spacing={2} alignItems="center" mt={2}>
                            <Typography variant="body2" fontWeight={600} textAlign="center" color="text.primary">
                                Is the work completed?
                            </Typography>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: 14,
                                    px: 5,
                                    py: 1,
                                    borderRadius: 2,
                                }}
                                onClick={handleComplete}
                            >
                                Mark as Completed
                            </Button>
                        </Stack>
                    )}

                    {/* Leave Review */}
                    {selectedReq?.status === "completed" && !selectedReq?.review && (
                        <Stack spacing={2} mt={2}>
                            <Typography variant="body2" fontWeight={600}>
                                Leave a Review
                            </Typography>

                            <Rating
                                value={rating}
                                onChange={(_, value) => setRating(value)}
                                size="medium"
                            />

                            <TextField
                                label="Write your comment"
                                fullWidth
                                multiline
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                variant="outlined"
                                size="small"
                            />

                            <Button
                                variant="contained"
                                size="medium"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 600,
                                    fontSize: 14,
                                    px: 4,
                                    py: 1,
                                    borderRadius: 2,
                                }}
                                onClick={handleReview}
                            >
                                Submit Review
                            </Button>
                        </Stack>
                    )}

                    {/* View Submitted Review */}
                    {selectedReq?.review && (
                        <Stack spacing={2} mt={2}>
                            <Typography variant="body2" fontWeight={600}>
                                Your Review
                            </Typography>
                            <Rating value={selectedReq?.review?.rating || 0} readOnly size="medium" />
                            <Typography variant="body2" color="text.secondary">
                                "{selectedReq?.review?.comment || "No comment"}"
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </DialogContent>

            {/* Actions */}
            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    size="medium"
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: 14,
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClientModal;
