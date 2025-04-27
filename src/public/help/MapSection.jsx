import { Box, Container, Typography, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const MapSection = () => {
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                py: { xs: 10, md: 14 },
                px: { xs: 2, md: 4 },
            }}
        >
            <Container maxWidth="lg">
                {/* Heading */}
                <Stack spacing={2} alignItems="center" mb={8}>
                    <LocationOnIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        textAlign="center"
                        sx={{
                            fontSize: { xs: "2rem", md: "3rem" },
                            color: "text.primary",
                        }}
                    >
                        Locate Us
                    </Typography>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        color="text.secondary"
                        sx={{ maxWidth: 600 }}
                    >
                        We are based in the heart of Kathmandu — New Baneshwor. Easily accessible and ready to serve you!
                    </Typography>
                </Stack>

                {/* Embedded Google Map */}
                <Box
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        width: "100%",
                        height: { xs: "300px", md: "500px" },
                        boxShadow: (theme) => `0 8px 24px ${theme.palette.divider}`,
                    }}
                >
                    <iframe
                        title="WorkerConnect Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.698885049932!2d85.33797877532874!3d27.688519276195796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198ee6f0b5f9%3A0x53b64beed52b2191!2sNew%20Baneshwor%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1714452639737!5m2!1sen!2snp"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Box>
            </Container>
        </Box>
    );
};

export default MapSection;
