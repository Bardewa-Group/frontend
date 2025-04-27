import React, { useContext, useState } from 'react';
import {
    Box,
    IconButton,
    Typography,
    Button,
    Modal,
    AppBar,
    Tabs,
    Tab,
    Toolbar,
    useTheme,
    Avatar,
    Paper,
    List,
    ListItemIcon,
    ListItemText,
    Grid,
    ListItemButton,
    Divider
} from '@mui/material';
import {
    DarkMode,
    LightMode,
    Close,
    AccountCircle,
    Email,
    AdminPanelSettings,
    Phone,
    LocationOn
} from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';
import { ColorModeContext } from '../../../ThemeContext/ThemeContext';

const Setting = ({ handleModalClose, openModal }) => {
    const { logout, user } = useAuth();
    const [tabIndex, setTabIndex] = useState(0);
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();

    return (
        <Modal
            open={openModal}
            onClose={handleModalClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                elevation={theme.palette.mode === 'light' ? 3 : 0}
                sx={{
                    width: { xs: '95%', sm: '80%', md: '60%' },
                    maxHeight: '90vh',
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: theme.palette.background.default,
                }}
            >
                {/* Top AppBar */}
                <AppBar position="static" color="default" elevation={0}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Settings
                        </Typography>
                        <IconButton onClick={colorMode.toggleColorMode}>
                            {theme.palette.mode === 'light' ? <DarkMode /> : <LightMode />}
                        </IconButton>
                        <IconButton onClick={handleModalClose}>
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Main Layout */}
                <Box sx={{ display: 'flex', height: 'calc(90vh - 64px)' }}>
                    {/* Sidebar Tabs */}
                    <Box
                        sx={{
                            width: { xs: 80, sm: 220 },
                            borderRight: 1,
                            borderColor: 'divider',
                            bgcolor: theme.palette.background.paper,
                            pt: 2,
                        }}
                    >
                        <Tabs
                            orientation="vertical"
                            value={tabIndex}
                            onChange={(e, val) => setTabIndex(val)}
                            sx={{
                                '.MuiTab-root': {
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    px: 2,
                                    minHeight: 48,
                                },
                                '.Mui-selected': {
                                    bgcolor: theme.palette.action.selected,
                                    borderRadius: 2,
                                },
                            }}
                        >
                            <Tab icon={<AccountCircle />} iconPosition="start" label="Account" />
                        </Tabs>
                    </Box>

                    {/* Right content */}
                    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, overflowY: 'auto' }}>
                        {tabIndex === 0 && (
                            <Box>
                                {/* User Info */}
                                <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                width: 72,
                                                height: 72,
                                                bgcolor: 'primary.main',
                                                fontSize: 28,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {user?.full_name
                                                ?.split(' ')
                                                .map((n) => n[0])
                                                .join('')
                                                .toUpperCase()}
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" fontWeight={600}>
                                            {user?.full_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            @{user?.username}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Divider sx={{ mb: 3 }} />

                                {/* Profile Info List */}
                                <List>
                                    {[{
                                        icon: <Email />,
                                        label: 'Email',
                                        value: user?.email,
                                    }, {
                                        icon: <AdminPanelSettings />,
                                        label: 'Role',
                                        value: user?.role,
                                    }, {
                                        icon: <Phone />,
                                        label: 'Contact',
                                        value: user?.contact_number || 'Not added',
                                    }, {
                                        icon: <LocationOn />,
                                        label: 'Location',
                                        value: user?.location || 'Not added',
                                    }].map((item, index) => (
                                        <ListItemButton
                                            key={index}
                                            disableRipple
                                            sx={{
                                                borderRadius: 2,
                                                mb: 1,
                                                '&:hover': {
                                                    bgcolor: theme.palette.action.hover,
                                                },
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit' }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.label}
                                                secondary={item.value}
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>

                                {/* Logout Button */}
                                <Box sx={{ textAlign: 'center', mt: 5 }}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        onClick={logout}
                                        sx={{
                                            px: 6,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
};

export default Setting;
