import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    Button,
    Stack,
    Divider,
    CircularProgress,
    Grid,
    Rating,
    Paper
} from '@mui/material';
import axios from 'axios';
import { config } from '../../helper/config';
import { useAuth } from '../../../context/AuthContext';
import { displayError } from '../../../private/helper/config';

const WorkerReviewModal = ({ open, onClose, worker }) => {
    const { authConfig } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && worker) {
            (async () => {
                setLoading(true);
                try {
                    const { data } = await axios.get(`${config.get_worker_review}?worker_id=${worker.id}`, authConfig);
                    setReviews(data);
                } catch (err) {
                    displayError(err.message || 'Failed to load reviews');
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [open, worker, authConfig]);

    if (!worker) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="body">
            <DialogTitle>
                <Typography variant="h5" fontWeight={600}>
                    Worker Profile & Reviews
                </Typography>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 4 }}>
                <Stack spacing={4}>

                    {/* Worker Basic Info */}
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: (theme) => theme.palette.action.hover }}>
                        <Stack spacing={1}>
                            <Typography variant="h6" fontWeight={600}>
                                {worker.username}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {worker.profession}
                            </Typography>

                            <Stack direction="row" spacing={2} mt={1}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Hourly Rate:</strong> ${worker.hourly_rate}/hr
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Experience:</strong> {worker.experience_years} year{worker.experience_years > 1 ? 's' : ''}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>

                    {/* Reviews Section */}
                    <Box>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                            Reviews
                        </Typography>

                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : reviews.length === 0 ? (
                            <Typography align="center" color="text.secondary">
                                No reviews yet.
                            </Typography>
                        ) : (
                            <Box sx={{ maxHeight: 250, overflowY: 'auto', pr: 1 }}>
                                <Stack spacing={3}>
                                    {reviews.map((review) => (
                                        <Paper
                                            key={review.id}
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                borderRadius: 2,
                                                bgcolor: (theme) => theme.palette.background.default,
                                                border: `1px solid`,
                                                borderColor: (theme) => theme.palette.divider,
                                            }}
                                        >
                                            <Stack spacing={1}>
                                                {/* Rating and Date */}
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Rating value={review.rating} precision={0.5} readOnly size="small" />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {new Date(review.created_at).toLocaleDateString()}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                {/* Comment */}
                                                <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic' }}>
                                                    "{review.comment}"
                                                </Typography>

                                                <Divider sx={{ my: 2 }} />

                                                {/* Hire Info */}
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={4}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>From:</strong> {review.hire_request.hirer_username}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Profession:</strong> {review.hire_request.profession}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <strong>Hourly Rate:</strong> ${review.hire_request.hourly_rate}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Paper>
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} variant="contained" size="medium">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkerReviewModal;
