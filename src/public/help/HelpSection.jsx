import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HelpSection = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: 8,
                bgcolor: theme.palette.mode === 'light' ? "#f9f9f9" : "background.default",
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                    mb={5}
                    color="text.primary"
                >
                    Help & FAQs
                </Typography>

                {/* Accordions */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Accordion
                        sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            bgcolor: theme.palette.background.paper,
                            boxShadow: theme.palette.mode === 'light'
                                ? "0px 4px 12px rgba(0,0,0,0.05)"
                                : "0px 4px 12px rgba(255,255,255,0.05)",
                            '&:before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight="bold">
                                How do I hire a professional?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">
                                Simply create an account, browse available professionals, and send a hire request based on your needs.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            bgcolor: theme.palette.background.paper,
                            boxShadow: theme.palette.mode === 'light'
                                ? "0px 4px 12px rgba(0,0,0,0.05)"
                                : "0px 4px 12px rgba(255,255,255,0.05)",
                            '&:before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight="bold">
                                Is there a guarantee for the services?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">
                                We verify all workers, but it's important to discuss terms and services directly with the professional.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            bgcolor: theme.palette.background.paper,
                            boxShadow: theme.palette.mode === 'light'
                                ? "0px 4px 12px rgba(0,0,0,0.05)"
                                : "0px 4px 12px rgba(255,255,255,0.05)",
                            '&:before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight="bold">
                                How can I contact support?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">
                                You can reach us through the "Contact Us" form below or by emailing support@hirepro.com.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>

            </Container>
        </Box>
    );
};

export default HelpSection;
