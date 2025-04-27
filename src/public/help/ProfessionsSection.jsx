import { Box, Stack, Typography, Container, Paper, useTheme } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import BoltIcon from "@mui/icons-material/Bolt";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const professions = [
    { name: "Plumber", icon: <BuildIcon fontSize="large" /> },
    { name: "Electrician", icon: <BoltIcon fontSize="large" /> },
    { name: "Carpenter", icon: <CarpenterIcon fontSize="large" /> },
    { name: "Painter", icon: <FormatPaintIcon fontSize="large" /> },
    { name: "Mechanic", icon: <DirectionsCarIcon fontSize="large" /> },
];

const ProfessionsSection = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                background: theme.palette.mode === 'light'
                    ? "linear-gradient(135deg, #f8fafc, #f1f5f9)"
                    : "linear-gradient(135deg, #1e1e1e, #2a2a2a)",
                py: { xs: 10, md: 14 },
                px: { xs: 2, md: 6 },
            }}
        >
            <Container maxWidth="lg">
                {/* Heading */}
                <Typography
                    variant="h3"
                    fontWeight={800}
                    textAlign="center"
                    sx={{
                        fontSize: { xs: "2rem", md: "3rem" },
                        mb: 8,
                        color: "text.primary",
                    }}
                >
                    Find Professionals by Expertise
                </Typography>

                {/* Profession cards */}
                <Stack
                    direction="row"
                    spacing={4}
                    flexWrap="wrap"
                    justifyContent="center"
                    rowGap={5}
                    useFlexGap
                >
                    {professions.map((item) => (
                        <Paper
                            key={item.name}
                            elevation={theme.palette.mode === 'light' ? 2 : 0}
                            sx={{
                                width: { xs: 140, md: 180 },
                                height: { xs: 140, md: 200 },
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 5,
                                bgcolor: theme.palette.background.paper,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: theme.palette.mode === 'light'
                                        ? '0 8px 24px rgba(0,0,0,0.1)'
                                        : '0 8px 24px rgba(0,0,0,0.5)',
                                    transform: 'translateY(-4px)',
                                },
                            }}
                        >
                            <Box
                                mb={1}
                                color="primary.main"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                color="text.primary"
                                sx={{
                                    fontSize: { xs: "0.95rem", md: "1rem" },
                                    mt: 1,
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Paper>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default ProfessionsSection;
