import { Box } from "@mui/material";
import HeroSection from "./help/HeroSection";
import ProfessionsSection from "./help/ProfessionsSection";
import HowItWorksSection from "./help/HowItWorksSection";
import FooterSection from "./help/FooterSection";
import MapSection from "./help/MapSection";

const Home = () => {
    return (
        <Box>
            <HeroSection />
            <ProfessionsSection />
            <HowItWorksSection />
            <MapSection />
            <FooterSection />
        </Box>
    );
};

export default Home;
