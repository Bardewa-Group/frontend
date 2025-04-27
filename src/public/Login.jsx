import { useContext, useEffect, useState } from "react";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    CircularProgress,
    Tooltip,
    useTheme,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from "../context/AuthContext";
import Cover from "../private/images/cover.png";
import Logo from "../private/images/logo.png"
import { LightMode, DarkMode } from '@mui/icons-material';
import { InitialLoader } from "../private/helper/config";
import { ColorModeContext } from "../ThemeContext/ThemeContext";
import Signup from "./Signup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoader, setInitialLoader] = useState(true);
    const [open, setOpen] = useState(false);
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const navigate = useNavigate()


    const handleLogin = async () => {
        setLoading(true);
        try {
            await login({ username, password });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    useEffect(() => {
        toast.dismiss();
        setInitialLoader(false);
    }, []);

    return (
        <>
            <Grid container sx={{ height: '100vh' }}>
                <Grid item xs={12} md={6} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: { xs: 2, sm: 4 },
                    position: 'relative',
                }}>
                    <IconButton onClick={colorMode.toggleColorMode} sx={{ position: "absolute", top: 20, right: 20 }}>
                        {theme.palette.mode === 'light' ? <DarkMode /> : <LightMode />}
                    </IconButton>

                    <Container maxWidth="xs" sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <img src={Logo} alt="hotel logo" style={{ width: '140px' }} />
                        </Box>

                        <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary">
                            Sign In to HirePro
                        </Typography>
                        <Typography variant="h6" textAlign="center" color="secondary" sx={{ mb: 2 }}>
                            Join Now
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                // autoComplete="off"
                                placeholder="username"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <TextField
                                margin="normal"
                                type="password"
                                autoComplete="new-password"
                                placeholder="password"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Box mt={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ py: 1, borderRadius: 2 }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Sign In"}
                                </Button>
                            </Box>
                        </form>

                        <Typography align="center" sx={{ mt: 3, mb: 1, color: 'text.secondary' }}>
                            or sign up with
                        </Typography>
                        <Tooltip title="Not Available">
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <IconButton disabled>
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton disabled>
                                    <GoogleIcon />
                                </IconButton>
                                <IconButton disabled>
                                    <AppleIcon />
                                </IconButton>
                            </Box>
                        </Tooltip>

                        <Typography align="center" sx={{ mt: 3, color: 'primary.main' }}>
                            New to HirePro?{' '}
                            <span onClick={() => setOpen(true)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                Sign Up
                            </span>
                        </Typography>
                    </Container>
                </Grid>

                <Grid item xs={12} md={6} sx={{
                    backgroundImage: `url(${Cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: { xs: 'none', md: 'block' },
                }} />
            </Grid>

            {open && <Signup onClose={() => setOpen(false)} />}
            <InitialLoader initialLoader={initialLoader} />
        </>
    );
};

export default Login;