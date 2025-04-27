import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                bgcolor: "linear-gradient(135deg, #f0f4f8, #ffffff)",
                px: { xs: 3, md: 8 },
                py: { xs: 8, md: 12 },
                backgroundImage: `url(https://www.transparenttextures.com/patterns/cubes.png)`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto',
            }}
        >
            <Container maxWidth="lg">
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

                    {/* (Optional) Right Section - Hero Image */}
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
