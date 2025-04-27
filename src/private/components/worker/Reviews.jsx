import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Rating,
    Box,
    CircularProgress,
    Stack,
    Divider,
    Grid,
    Avatar
} from '@mui/material';
import axios from 'axios';
import { config } from '../../helper/config';
import { useAuth } from '../../../context/AuthContext';
import { displayError } from '../../../private/helper/config';

const Reviews = () => {
    const { authConfig } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(config.get_reviews, authConfig);
                setReviews(data);
            } catch (err) {
                displayError(err.message || 'Failed to load reviews');
            } finally {
                setLoading(false);
            }
        })();
    }, [authConfig]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: (theme) => theme.palette.mode === 'light' ? '#f9fafb' : theme.palette.background.default,
                py: 3,
            }}
        >
            <Box sx={{ px: 4, }}>
                {/* Page Title */}
                <Box mb={5}>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        Feedback from hirers about your services.
                    </Typography>
                </Box>

                {/* Reviews Section */}
                {reviews.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 10 }}>
                        <Typography color="text.secondary" fontSize="1.1rem">
                            🎯 No reviews yet. Deliver excellent service to earn feedback!
                        </Typography>
                    </Box>
                ) : (
                    <Stack spacing={4}>
                        {reviews.map((review) => (
                            <Box
                                key={review.id}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    background: (theme) => theme.palette.mode === 'light'
                                        ? 'linear-gradient(135deg, #ffffff, #f5f7fa)'
                                        : 'linear-gradient(135deg, #1f1f1f, #2a2a2a)',
                                    boxShadow: (theme) => theme.palette.mode === 'light'
                                        ? '0 2px 10px rgba(0,0,0,0.05)'
                                        : '0 2px 10px rgba(0,0,0,0.5)',
                                }}
                            >
                                {/* Reviewer Top Section */}
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar
                                            sx={{ width: 44, height: 44, bgcolor: 'primary.main', fontWeight: 600 }}
                                        >
                                            {review.hire_request.hirer_username.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {review.hire_request.hirer_username}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(review.created_at).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Rating
                                            value={review.rating}
                                            precision={0.5}
                                            readOnly
                                            size="medium"
                                        />
                                    </Grid>
                                </Grid>

                                {/* Review Comment */}
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                    mt={2}
                                    mb={1}
                                    sx={{ lineHeight: 1.6 }}
                                >
                                    "{review.comment}"
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                {/* Service Info */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Profession:</strong> {review.hire_request.profession}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Hourly Rate:</strong> NPR {review.hire_request.hourly_rate}/hr
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Box>
        </Box>
    );
};

export default Reviews;
