import { Box, Typography, Container, Stack, useTheme } from "@mui/material";

const AboutSection = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#121212",
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={4} textAlign="center">
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={theme.palette.mode === "light" ? "text.primary" : "common.white"}
                        sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                    >
                        About Us
                    </Typography>

                    <Typography
                        variant="body1"
                        color={theme.palette.mode === "light" ? "text.secondary" : "grey.400"}
                        sx={{
                            lineHeight: 1.8,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            px: { xs: 2, md: 6 },
                        }}
                    >
                        We are building a platform where people can easily find and hire skilled household workers
                        such as plumbers, electricians, carpenters, and more. Our goal is to make the process of finding help simple,
                        fast, and affordable.
                    </Typography>

                    <Typography
                        variant="body1"
                        color={theme.palette.mode === "light" ? "text.secondary" : "grey.400"}
                        sx={{
                            lineHeight: 1.8,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            px: { xs: 2, md: 6 },
                        }}
                    >
                        Workers can create profiles, showcase their experience, and set their hourly rates.
                        Hirers can browse available workers by profession, view basic details, and quickly hire based on their needs.
                        We aim to create a simple, transparent, and user-friendly experience for both hirers and workers.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default AboutSection;
