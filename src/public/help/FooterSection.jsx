import { Box, Container, Stack, Typography } from "@mui/material";

const FooterSection = () => {
    return (
        <Box
            sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
                py: { xs: 4, md: 6 },
                mt: 8,
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                    textAlign={{ xs: "center", sm: "left" }}
                >
                    {/* Left: CopyRight */}
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} HirePro. All rights reserved.
                    </Typography>

                    {/* Right: Minimal Links (optional future) */}
                    <Stack direction="row" spacing={2}>
                        <Typography variant="body2" color="text.secondary" sx={{ cursor: "pointer" }}>
                            Privacy Policy
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ cursor: "pointer" }}>
                            Terms of Service
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default FooterSection;
