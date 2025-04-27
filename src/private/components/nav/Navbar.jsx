import { Toolbar, IconButton, Box, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../../images/logo.png";
import { AppBar } from '../Layout';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {

    const leftSection = () => {
        return (
            <>
                <IconButton
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    edge="start"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
            </>
        );
    };

    const rightSection = () => {
        return (
            <Tooltip title={"HirePro"}>

                <Box
                    sx={{
                        cursor: "pointer"
                    }}
                >
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{
                            height: "55px",
                            filter: "brightness(3) saturate(1.5)", // punch up the image colors
                            width: "auto",
                        }}
                    />
                </Box>
            </Tooltip>
        );
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {leftSection()}
                    {rightSection()}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;