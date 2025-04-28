import { Box } from "@mui/material";
import HeroSection from "./help/HeroSection";
import ProfessionsSection from "./help/ProfessionsSection";
import HowItWorksSection from "./help/HowItWorksSection";
import MapSection from "./help/MapSection";
import HelpSection from "./help/HelpSection";  // New
import ContactSection from "./help/ContactSection";  // New
import FooterSection from "./help/FooterSection";
import ScrollToTopButton from "./help/ScrollToTopButton";  // Adjust the path if needed
import AboutSection from "./help/AboutSection";

const Home = () => {
    return (
        <Box>

            <HeroSection />
            <Box id="about">
                <AboutSection />
            </Box>

            <Box id="professions">
                <ProfessionsSection />
            </Box>

            <Box id="howitworks">
                <HowItWorksSection />
            </Box>

            <MapSection />

            <Box id="help">
                <HelpSection />
            </Box>

            <Box id="contact">
                <ContactSection />
            </Box>

            <FooterSection />
            <ScrollToTopButton />
        </Box>
    );
};

export default Home;
