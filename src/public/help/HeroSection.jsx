import { Box, Container, Typography, Button, Stack, AppBar, Toolbar, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";


const HeroSection = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "linear-gradient(135deg, #f0f4f8, #ffffff)",
                backgroundImage: `url(https://www.transparenttextures.com/patterns/cubes.png)`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto',
            }}
        >
            {/* Navbar */}
            <AppBar position="static" color="transparent" elevation={0} sx={{ p: 2 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate('/')}
                    >
                        HirePro
                    </Typography>

                    <Stack direction="row" spacing={3} alignItems="center">
                        <Link
                            to="professions"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            style={{ cursor: "pointer", fontWeight: 600, color: theme.palette.text.primary, textDecoration: "none" }}
                        >
                            Professions
                        </Link>

                        <Link
                            to="howitworks"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            style={{ cursor: "pointer", fontWeight: 600, color: theme.palette.text.primary, textDecoration: "none" }}
                        >
                            How It Works
                        </Link>

                        <Link
                            to="help"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            style={{ cursor: "pointer", fontWeight: 600, color: theme.palette.text.primary, textDecoration: "none" }}
                        >
                            Help
                        </Link>

                        <Link
                            to="contact"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            style={{ cursor: "pointer", fontWeight: 600, color: theme.palette.text.primary, textDecoration: "none" }}
                        >
                            Contact
                        </Link>


                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                fontWeight: 700,
                                borderRadius: 2,
                                textTransform: "none",
                                borderColor: "primary.main",
                                color: "primary.main",
                                "&:hover": {
                                    borderColor: "primary.dark",
                                    color: "primary.dark",
                                },
                            }}
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={8}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {/* Text Section */}
                    <Box flex={1} textAlign={{ xs: "center", md: "left" }}>
                        <Typography
                            variant="h2"
                            fontWeight={800}
                            sx={{
                                fontSize: { xs: "2.5rem", md: "3.8rem" },
                                lineHeight: 1.2,
                            }}
                            mb={3}
                        >
                            Hire Trusted Professionals Easily
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: "1rem", md: "1.2rem" },
                                maxWidth: { md: "500px" },
                            }}
                            mb={4}
                        >
                            Connect with skilled workers like plumbers, electricians, carpenters and more — all verified and ready to help.
                        </Typography>

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            justifyContent={{ xs: "center", md: "flex-start" }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: 16,
                                    px: 4,
                                    py: 1.5,
                                    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
                                    borderRadius: 2,
                                }}
                                onClick={() => navigate("/login")}
                            >
                                Get Started
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: 16,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    color: "primary.main",
                                    borderColor: "primary.main",
                                    "&:hover": {
                                        borderColor: "primary.dark",
                                        color: "primary.dark",
                                    },
                                }}
                                onClick={() => navigate("/login")}
                            >
                                Explore Workers
                            </Button>
                        </Stack>
                    </Box>

                    {/* Hero Image Section */}
                    <Box
                        flex={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mt: { xs: 6, md: 0 } }}
                    >
                        <img
                            src="https://illustrations.popsy.co/gray/work-from-home.svg"
                            alt="Hero Illustration"
                            style={{ width: "100%", maxWidth: "500px", height: "auto" }}
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default HeroSection;
