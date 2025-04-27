import { Fab, useScrollTrigger, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { animateScroll as scroll } from "react-scroll";

const ScrollToTopButton = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 300, // Show after scrolling 300px
    });

    const handleClick = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });
    };

    return (
        <Zoom in={trigger}>
            <Fab
                color="primary"
                size="small"
                onClick={handleClick}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 9999,
                    boxShadow: 3,
                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Zoom>
    );
};

export default ScrollToTopButton;
