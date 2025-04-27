import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    MenuItem,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { config, displayError, displaySuccess } from '../../../private/helper/config';

const ProfileCompletionModel = ({ setOpenModal }) => {
    const { authConfig } = useAuth();
    const [role, setRole] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async () => {
        if (!role || !contactNumber || !location) {
            displayError("All fields are required.");
            return;
        }

        try {
            const payload = {
                role,
                contact_number: contactNumber,
                location,
            };

            const response = await axios.post(config.get_user_detils, payload, authConfig);

            if (response.data.message === "Profile updated successfully") {
                displaySuccess("Profile updated successfully.");
                window.location.reload();
                setOpenModal(false);
            }

        } catch (error) {
            console.error(error);
            displayError("Failed to update profile.");
        }
    };

    return (
        <Modal open={true}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                    width: 400,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Complete Your Registration
                </Typography>

                <Typography sx={{ mb: 2 }}>
                    Please select your role and fill in your contact details to continue.
                </Typography>

                <TextField
                    select
                    fullWidth
                    label="Select Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="worker">Worker</MenuItem>
                    <MenuItem value="hirer">Hirer</MenuItem>
                </TextField>

                <TextField
                    fullWidth
                    label="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{ mb: 3 }}
                />

                <Button variant="contained" fullWidth onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default ProfileCompletionModel;
