import { Box, Container, Typography, TextField, Button, Stack, useTheme } from "@mui/material";

const ContactSection = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: 8,
                bgcolor: theme.palette.mode === 'light' ? "#f9f9f9" : "background.paper",
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                    mb={5}
                    color="text.primary"
                >
                    Contact Us
                </Typography>

                <Box
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        bgcolor: theme.palette.background.paper,
                        boxShadow: theme.palette.mode === 'light'
                            ? "0px 4px 20px rgba(0, 0, 0, 0.05)"
                            : "0px 4px 20px rgba(255, 255, 255, 0.05)",
                    }}
                >
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Your Name"
                            variant="outlined"
                            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                        />
                        <TextField
                            fullWidth
                            label="Your Email"
                            variant="outlined"
                            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            multiline
                            rows={4}
                            variant="outlined"
                            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                        />

                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                py: 1.5,
                                fontSize: 16,
                                borderRadius: 2,
                            }}
                        >
                            Send Message
                        </Button>
                    </Stack>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mt={4}
                >
                    Or email us directly at <strong>support@HireHub.com</strong>
                </Typography>
            </Container>
        </Box>
    );
};

export default ContactSection;
