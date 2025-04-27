import React from 'react';
import {
    Card,
    Avatar,
    Typography,
    Button,
    Box,
    Chip,
    Stack,
    Divider
} from '@mui/material';

const CustomCard = ({ req, statusColorMap, handleResponse, actionLoading }) => {
    return (
        <Card
            sx={{
                p: 3,
                borderRadius: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                bgcolor: 'background.paper',
            }}
        >
            <Stack spacing={3} height="100%">

                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                width: 48,
                                height: 48,
                                fontSize: 20
                            }}
                        >
                            {req.hirer_username.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={700}>
                                {req.hirer_username}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(req.created_at).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </Typography>
                        </Box>
                    </Stack>

                    <Chip
                        label={req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        color={statusColorMap[req.status]}
                        size="small"
                        sx={{ fontWeight: 700, textTransform: 'capitalize' }}
                    />
                </Box>

                {/* Request Info */}
                <Box flexGrow={1}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                        Request ID: <strong>{req.id}</strong>
                    </Typography>
                </Box>

                <Divider />

                {/* Actions */}
                {req.status === 'pending' && (
                    <Stack direction="row" spacing={2} justifyContent="center" pt={2}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleResponse(req.id, 'accepted')}
                            disabled={actionLoading === req.id}
                            sx={{
                                fontWeight: 700,
                                minWidth: 100,
                                borderRadius: 2,
                                '&:hover': { backgroundColor: 'success.dark' }
                            }}
                        >
                            {actionLoading === req.id ? 'Processing...' : 'Accept'}
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => handleResponse(req.id, 'rejected')}
                            disabled={actionLoading === req.id}
                            sx={{
                                fontWeight: 700,
                                minWidth: 100,
                                borderRadius: 2,
                                '&:hover': { backgroundColor: 'error.light', color: 'white' }
                            }}
                        >
                            {actionLoading === req.id ? 'Processing...' : 'Reject'}
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Card>
    )
}

export default CustomCard;
