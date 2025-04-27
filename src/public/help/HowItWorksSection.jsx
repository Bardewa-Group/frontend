import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const steps = [
    {
        title: "Find",
        desc: "Browse and discover verified workers nearby for any type of service you need.",
        icon: <SearchIcon fontSize="large" />,
    },
    {
        title: "Hire",
        desc: "Book your preferred worker with clear pricing and instant confirmation.",
        icon: <AssignmentTurnedInIcon fontSize="large" />,
    },
    {
        title: "Review",
        desc: "Rate your experience and help others find the best service providers.",
        icon: <ThumbUpAltIcon fontSize="large" />,
    },
];

const HowItWorksSection = () => {
    return (
        <Box
            sx={{
                py: { xs: 10, md: 14 },
                px: { xs: 2, md: 4 },
                bgcolor: "background.default",
            }}
        >
            <Container maxWidth="lg">
                {/* Heading */}
                <Typography
                    variant="h3"
                    fontWeight={800}
                    textAlign="center"
                    mb={8}
                    sx={{
                        fontSize: { xs: "2rem", md: "3rem" },
                        color: "text.primary",
                    }}
                >
                    How It Works
                </Typography>

                {/* Steps */}
                <Grid container spacing={4}>
                    {steps.map((step, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 4,
                                    textAlign: "center",
                                    borderRadius: 4,
                                    height: "100%",
                                    transition: "all 0.3s ease",
                                    bgcolor: "background.paper",
                                    "&:hover": {
                                        boxShadow: 8,
                                        transform: "translateY(-5px)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        mb: 3,
                                        color: "primary.main",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    {step.icon}
                                </Box>
                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                    mb={2}
                                    sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}
                                >
                                    {step.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: { xs: "0.95rem", md: "1rem" },
                                        maxWidth: "90%",
                                        mx: "auto",
                                    }}
                                >
                                    {step.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default HowItWorksSection;
