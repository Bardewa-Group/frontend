import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    CircularProgress,
    MenuItem,
    Container,
    useTheme,
    Grid,
    IconButton,
    Divider
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { config, displayError, displaySuccess } from '../../../private/helper/config';

const Qualification = () => {
    const theme = useTheme();
    const { authConfig } = useAuth();
    const professions = [
        'Plumber', 'Electrician', 'Carpenter', 'Painter',
        'Mechanic', 'Gardener', 'Cleaner', 'Welder', 'Roofer', 'Mover'
    ];

    const [qual, setQual] = useState(null);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profession, setProfession] = useState('');
    const [rate, setRate] = useState('');
    const [bio, setBio] = useState('');
    const [exp, setExp] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(config.get_qualifications, authConfig);
                if (data.success && data.data) {
                    setQual(data.data);
                    setProfession(data.data.profession);
                    setRate(data.data.hourly_rate);
                    setBio(data.data.bio);
                    setExp(data.data.experience_years);
                    setEdit(false);
                } else {
                    setEdit(true);
                }
            } catch (e) {
                displayError('Failed to load qualifications.');
            }
            setLoading(false);
        })();
    }, [authConfig]);

    const save = async () => {
        if (!profession || !rate || !bio || !exp) return displayError('Please complete all fields.');
        try {
            const payload = { profession, hourly_rate: rate, bio, experience_years: exp };
            const { data } = await axios.post(config.get_qualifications, payload, authConfig);
            if (data.success) {
                setQual(payload);
                setEdit(false);
                displaySuccess('Qualifications updated successfully.');
            } else {
                displayError('Failed to save qualifications.');
            }
        } catch (e) {
            displayError('Network error.');
        }
    };

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: theme.palette.mode === 'light' ? '#f9fafb' : theme.palette.background.default, py: 6 }}>
            <Box sx={{ px: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Configure your qualifications to get started.
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: 4,

                        borderRadius: 4,
                        bgcolor: theme.palette.background.paper,
                        boxShadow: theme.palette.mode === 'light' ? '0 2px 12px rgba(0,0,0,0.05)' : '0 2px 12px rgba(0,0,0,0.5)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: theme.palette.mode === 'light' ? '0 6px 18px rgba(0,0,0,0.08)' : '0 6px 18px rgba(0,0,0,0.6)',
                        },
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                sx={{
                                    bgcolor: theme.palette.primary.light,
                                    color: theme.palette.primary.contrastText,
                                    width: 56,
                                    height: 56,
                                    mr: 2,
                                }}
                            >
                                <WorkIcon fontSize="medium" />
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                                My Qualification
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={() => setEdit(!edit)}
                            sx={{
                                bgcolor: theme.palette.action.hover,
                                '&:hover': {
                                    bgcolor: theme.palette.primary.main,
                                    color: 'white',
                                },
                            }}
                        >
                            {edit ? <CancelIcon /> : <EditIcon />}
                        </IconButton>
                    </Box>

                    {/* Main Content */}
                    {!edit ? (
                        <>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary">
                                        Profession
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {qual.profession}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary">
                                        Hourly Rate
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        NPR {qual.hourly_rate}/hr
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" color="text.secondary">
                                        Experience
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {qual.experience_years} years
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 5 }}>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="caption" color="text.secondary">
                                    Bio
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ mt: 1, lineHeight: 1.8, color: theme.palette.text.primary }}
                                >
                                    {qual.bio}
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <Box component="form" noValidate sx={{ mt: 2 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Profession"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                    >
                                        {professions.map((p) => (
                                            <MenuItem key={p} value={p}>
                                                {p}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Hourly Rate (NPR)"
                                        type="number"
                                        value={rate}
                                        onChange={(e) => setRate(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Experience (Years)"
                                        type="number"
                                        value={exp}
                                        onChange={(e) => setExp(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Bio"
                                        multiline
                                        minRows={4}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<SaveIcon />}
                                    onClick={save}
                                    sx={{
                                        px: 5,
                                        py: 1.5,
                                        fontWeight: 600,
                                        borderRadius: 2,
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Qualification;
