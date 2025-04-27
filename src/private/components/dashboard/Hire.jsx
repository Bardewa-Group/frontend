import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../helper/config';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    CircularProgress,
    Chip,
    CardHeader,
    Avatar,
    CardActions,
} from '@mui/material';
import { Autocomplete } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import TokenSharpIcon from '@mui/icons-material/TokenSharp';
import { WorkerCard } from './Card';

const Hire = () => {
    const { authConfig } = useAuth();
    const [workers, setWorkers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [filteredWorkers, setFilteredWorkers] = useState([]);

    // Static list of professions
    const [professions] = useState([
        'Plumber',
        'Electrician',
        'Carpenter',
        'Painter',
        'Mechanic',
        'Gardener',
        'Cleaner',
        'Welder',
        'Roofer',
        'Mover',
    ]);
    const [professionFilter, setProfessionFilter] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all workers and their hire request statuses
    useEffect(() => {
        Promise.all([
            axios.get(config.view_workers, authConfig),
            axios.get(config.hire_requested_list, authConfig),
        ])
            .then(([workersRes, reqRes]) => {
                const allWorkers = workersRes.data.filter(worker => worker.profession.trim() !== ""); // Only workers with profession
                const allRequests = reqRes.data;
                setWorkers(allWorkers);
                setRequests(allRequests);
                setFilteredWorkers(allWorkers);
            })
            .catch(err => setError(err.message || 'Failed to load data'))
            .finally(() => setLoading(false));
    }, [authConfig]);

    // Apply profession filter
    const applyFilters = () => {
        if (!professionFilter.length) {
            setFilteredWorkers(workers);
        } else {
            const filtered = workers.filter(w =>
                professionFilter.includes(w.profession)
            );
            setFilteredWorkers(filtered);
        }
    };

    const handleRequest = workerId => {
        axios
            .post(
                config.request_workers,
                { worker_profile: workerId },
                authConfig
            )
            .then(() => axios.get(config.hire_requested_list, authConfig))
            .then(res => setRequests(res.data))
            .catch(err => console.error(err));
    };

    if (loading) {
        return (
            <Box textAlign="center" mt={6}>
                <CircularProgress />
                <Typography mt={2}>Loading workers...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center" mt={6}>
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3} flexWrap="wrap">
                <Autocomplete
                    multiple
                    options={professions}
                    getOptionLabel={opt => opt}
                    onChange={(e, value) => setProfessionFilter(value)}
                    renderInput={params => (
                        <TextField
                            {...params}
                            size="small"
                            label="Profession"
                            variant="outlined"
                            sx={{ width: 300 }}
                        />
                    )}
                />
                <Button variant="contained" size="small" onClick={applyFilters}>
                    Filter
                </Button>
            </Box>


            {filteredWorkers.length === 0 ? (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h6" color="textSecondary">
                        No workers match your criteria.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredWorkers.map(worker => {
                        const req = requests.find(r => r.worker_profile.id === worker.id);
                        const status = req?.status;
                        return (
                            <Grid item xs={12} sm={6} md={4} key={worker.id}>
                                {/* <Card elevation={3} sx={{ borderRadius: 2 }}>
                                    <CardHeader
                                        avatar={<Avatar>{worker.username[0].toUpperCase()}</Avatar>}
                                        title={worker.username}
                                        subheader={worker.profession}
                                    />
                                    <CardContent>
                                        <Typography variant="body2">
                                            Rate: ${worker.hourly_rate} / hr
                                        </Typography>
                                        <Typography variant="body2">
                                            Experience: {worker.experience_years} yr{worker.experience_years > 1 ? 's' : ''}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {status === 'accepted' ? (
                                            <Chip
                                                icon={<TokenSharpIcon />}
                                                label="Hired"
                                                color="success"
                                                variant="outlined"
                                            />
                                        ) : status === 'pending' ? (
                                            <Chip label="Requested" variant="outlined" />
                                        ) : (
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleRequest(worker.id)}
                                            >
                                                Request Hire
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card> */}
                                <WorkerCard
                                    worker={worker}
                                    status={status}
                                    handleRequest={handleRequest}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
};

export default Hire;
