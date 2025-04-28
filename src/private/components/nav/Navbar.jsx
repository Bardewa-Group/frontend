import React, { useState, useEffect, useContext } from 'react';
import {
    Toolbar,
    IconButton,
    Box,
    Tooltip,
    Badge,
    Menu,
    MenuItem,
    Typography,
    Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from "../../images/logo.png";
import { AppBar } from '../Layout';
import { AuthContext, useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { config } from '../../helper/config';
import { displayError } from '../../../private/helper/config';
import { keyframes } from '@mui/system'; // <--- ADD this import at top

// Animation keyframes
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { user } = useContext(AuthContext);
    const { authConfig } = useAuth();

    const [notifications, setNotifications] = useState([]);
    const [newNotificationCount, setNewNotificationCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    useEffect(() => {
        if (!user) return;

        // 1. First Load seenNotificationIds
        const stored = JSON.parse(localStorage.getItem('seenNotifications') || "[]");
        const seenIdsSet = new Set(stored);
        

        // 2. Then call fetch after slight delay (to ensure state updates)
        setTimeout(() => {
            fetchNotifications(seenIdsSet);
        }, 100); // tiny delay ensures clean loading

        const interval = setInterval(() => fetchNotifications(seenIdsSet), 5000);

        return () => clearInterval(interval);

    }, [user, authConfig]);


    const fetchNotifications = async (currentSeenIds) => {
        try {
            let res;
            let latestData = [];

            if (user?.role === "worker") {
                res = await axios.get(config.request_to_me, authConfig);
                latestData = res.data.filter(r => r.status === "pending");
            } else if (user?.role === "hirer") {
                res = await axios.get(config.hire_accepted_list, authConfig);
                latestData = res.data;
            }

            const latestIds = new Set(latestData.map(item => item.id));
            let newCount = 0;

            for (let id of latestIds) {
                if (!currentSeenIds.has(id)) {
                    newCount++;
                }
            }

            setNewNotificationCount(newCount);
            setNotifications(latestData);

        } catch (err) {
            displayError(err.message || 'Failed to fetch notifications');
        }
    };


    const handleBellClick = (event) => {
        setAnchorEl(event.currentTarget);

        // When opening dropdown → mark all notifications as seen
        const allIds = notifications.map(item => item.id);
        localStorage.setItem('seenNotifications', JSON.stringify(allIds));
        
        setNewNotificationCount(0);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const leftSection = () => (
        <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            edge="start"
            aria-label="menu"
        >
            <MenuIcon />
        </IconButton>
    );

    const rightSection = () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user && (
                <Tooltip title="Notifications">
                    <IconButton
                        color="inherit"
                        onClick={handleBellClick}
                        sx={{
                            animation: newNotificationCount > 0 ? `${pulse} 1s infinite` : 'none', // <-- here
                            transformOrigin: 'center',
                        }}
                    >
                        <Badge
                            badgeContent={newNotificationCount}
                            color="error"
                            invisible={newNotificationCount === 0}
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>
            )}

            {/* Logo */}
            <Tooltip title="HireHub">
                <Box sx={{ cursor: "pointer" }}>
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{
                            height: "55px",
                            filter: "brightness(3) saturate(1.5)",
                            width: "auto",
                        }}
                    />
                </Box>
            </Tooltip>
        </Box>
    );

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

            {/* Notification Dropdown */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 4,
                    sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        minWidth: 300,
                        maxHeight: 400,
                        overflowY: 'auto',
                    },
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Notifications</Typography>
                </Box>

                {notifications.length === 0 ? (
                    <MenuItem disabled>
                        <Typography color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
                            🎯 No notifications yet
                        </Typography>
                    </MenuItem>
                ) : (
                    notifications.map((item) => (
                        <MenuItem key={item.id} sx={{ alignItems: 'start' }}>
                            <Stack spacing={0.5}>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                    color="text.primary"
                                >
                                    {user.role === "worker"
                                        ? `New Request from ${item.hirer_username || "Unknown"}`
                                        : item.status === "accepted"
                                            ? `${item.worker_profile?.username || "Unknown"} accepted your request`
                                            : `${item.worker_profile?.username || "Unknown"} completed the work`}
                                </Typography>

                                {/* Worker Details */}
                                {user.role === "worker" ? (
                                    <>
                                        <Typography variant="body2" color="text.secondary">
                                            Status: {item.status || "N/A"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Created At: {new Date(item.created_at).toLocaleString() || "N/A"}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body2" color="text.secondary">
                                            Profession: {item.worker_profile?.profession || "N/A"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Rate: ${item.worker_profile?.hourly_rate || "N/A"}
                                        </Typography>
                                    </>
                                )}
                            </Stack>
                        </MenuItem>
                    ))
                )}
            </Menu>
        </>
    );
};

export default Navbar;
