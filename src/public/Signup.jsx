import { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import { config, displayError, displaySuccess } from "../private/helper/config";

const Signup = ({ onClose }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: ""
    });

    const [signUpLoading, setSignUpLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        setSignUpLoading(true);
        try {
            const response = await fetch(config.create_user, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (errorData.username && errorData.username.includes("A user with that username already exists.")) {
                    displayError("This username is already taken. Please choose another one.");
                } else if (errorData.email) {
                    displayError("Invalid or duplicate email.");
                } else {
                    displayError(errorData.message || "Failed to sign up");
                }
                return;
            }

            displaySuccess("You can now login!");
            onClose();
        } catch (error) {
            console.error(error);
            displayError("Failed to send sign-up request");
        } finally {
            setSignUpLoading(false);
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    width: 400,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Create a New User
                </Typography>

                <form onSubmit={handleSignUpSubmit} autoComplete="off">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />

                    <Box mt={2}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={signUpLoading}
                        >
                            {signUpLoading ? <CircularProgress size={24} /> : "Sign Up"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default Signup;
