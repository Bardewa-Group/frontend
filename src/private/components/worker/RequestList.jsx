import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Grid,
    Card,
    Avatar,
    Typography,
    Button,
    Box,
    CircularProgress,
    Chip,
    Stack,
    Divider
} from '@mui/material';
import { config } from '../../helper/config';
import { useAuth } from '../../../context/AuthContext';
import { displayError, displaySuccess } from '../../../private/helper/config';
import CustomCard from './CustomCard';

const statusColorMap = {
    pending: 'warning',
    accepted: 'success',
    rejected: 'error'
};

const RequestList = () => {
    const { authConfig } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(config.request_to_me, authConfig);
                setRequests(data);
            } catch (err) {
                displayError(err.message || 'Failed to load requests');
            } finally {
                setLoading(false);
            }
        })();
    }, [authConfig]);

    const handleResponse = async (reqId, status) => {
        setActionLoading(reqId);
        try {
            const { data } = await axios.patch(
                `${config.request_to_me}${reqId}/`,
                { status },
                authConfig
            );
            setRequests(prev =>
                prev.map(r => (r.id === reqId ? { ...r, status: data.status } : r))
            );
            displaySuccess(`Request ${status}`);
        } catch (err) {
            displayError(err.message || 'Action failed');
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: (theme) => theme.palette.mode === 'light' ? '#f9fafb' : 'background.default',
                py: 3,
            }}
        >
            <Container maxWidth="lg">

                {/* Left-Aligned Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Review and manage all your incoming job offers.
                    </Typography>
                </Box>

                {/* Content */}
                {requests.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 10 }}>
                        <Typography color="text.secondary">
                            🎯 No requests at the moment.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {requests.map((req) => (
                            <Grid item xs={12} sm={6} md={4} key={req.id}>
                                <CustomCard
                                    req={req}
                                    statusColorMap={statusColorMap}
                                    handleResponse={handleResponse}
                                    actionLoading={actionLoading}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>

    );
};

export default RequestList;
