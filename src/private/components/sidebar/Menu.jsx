import React, { useState, useContext } from 'react';
import {
    List,
    ListItem,
    Collapse,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    ExpandLess,
    ExpandMore,
    Settings as SettingsIcon,
    Dashboard as DashboardIcon,
    Assignment as AssignmentIcon,
    StarBorder as StarBorderIcon,
    School as SchoolIcon,
    PersonAddAlt as PersonAddAltIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Setting from './Setting';
import { AuthContext } from '../../../context/AuthContext';

const Menu = ({ isSidebarOpen }) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [openSections, setOpenSections] = useState([]);
    const { user } = useContext(AuthContext);

    const handleToggle = (section) => {
        setOpenSections((prev) =>
            prev.includes(section)
                ? prev.filter((item) => item !== section)
                : [...prev, section]
        );
    };

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const workerRoutes = [
        // {
        //     section: "Dashboard",
        //     multiple: false,
        //     subitems: [
        //         {
        //             title: "Dashboard",
        //             icon: <DashboardIcon />,
        //             action: () => navigate("/dashboard"),
        //         },
        //     ],
        // },
        {
            section: "Jobs",
            multiple: true,
            subitems: [
                {
                    title: "Qualification",
                    icon: <SchoolIcon />,
                    action: () => navigate("/qualification"),
                },
                {
                    title: "Request",
                    icon: <AssignmentIcon />,
                    action: () => navigate("/request"),
                },
                {
                    title: "Reviews",
                    icon: <StarBorderIcon />,
                    action: () => navigate("/reviews"),
                },
            ],
        },
        {
            section: "Settings",
            multiple: true,
            subitems: [
                {
                    title: "General Settings",
                    icon: <SettingsIcon />,
                    action: handleModalOpen,
                },
            ],
        },
    ];

    const hireRoutes = [
        {
            section: "Dashboard",
            multiple: false,
            subitems: [
                {
                    title: "Dashboard",
                    icon: <DashboardIcon />,
                    action: () => navigate("/dashboard"),
                },
            ],
        },
        {
            section: "Client",
            multiple: true,
            subitems: [
                {
                    title: "Connected Client",
                    icon: <PersonAddAltIcon />,
                    action: () => navigate("/client"),
                },

            ],
        },
        {
            section: "Settings",
            multiple: true,
            subitems: [
                {
                    title: "General Settings",
                    icon: <SettingsIcon />,
                    action: handleModalOpen,
                },
            ],
        },
    ];

    let router = [];

    if (user?.role === "worker") {
        router = workerRoutes;
    } else if (user?.role === "hirer") {
        router = hireRoutes;
    } else {
        router = [];
    }



    const renderMenuItems = () => {
        return router.map((item, index) => (
            <React.Fragment key={index}>
                {!isSidebarOpen && !item.multiple && (
                    <ListItem disablePadding onClick={item.subitems[0].action}>
                        <ListItemButton sx={{ "&:hover": { color: 'text.secondary' } }}>
                            <ListItemIcon sx={{ color: "text.secondary" }}>
                                {item.subitems[0].icon}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                )}

                {!isSidebarOpen && item.multiple && item.subitems.map((subItem, subIndex) => (
                    <ListItem disablePadding key={subIndex} onClick={subItem.action}>
                        <ListItemButton sx={{ "&:hover": { color: 'text.secondary' } }}>
                            <ListItemIcon sx={{ color: "text.secondary" }}>
                                {subItem.icon}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                ))}

                {item.multiple && isSidebarOpen && (
                    <>
                        <ListItem disablePadding onClick={() => handleToggle(item.section)}>
                            <ListItemButton sx={{ "&:hover": { color: 'text.secondary' } }}>
                                <ListItemText primary={item.section} sx={{ fontWeight: 'bold' }} />
                                {openSections.includes(item.section) ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={openSections.includes(item.section)} timeout="auto" unmountOnExit>
                            {item.subitems.map((subItem, subIndex) => (
                                <ListItem disablePadding key={subIndex} onClick={subItem.action}>
                                    <ListItemButton sx={{ "&:hover": { color: 'text.secondary' } }}>
                                        <ListItemIcon sx={{ color: "text.secondary" }}>
                                            {subItem.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={subItem.title} sx={{ fontWeight: 'medium' }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </Collapse>
                    </>
                )}

                {!item.multiple && isSidebarOpen && (
                    <ListItem disablePadding onClick={item.subitems[0].action}>
                        <ListItemButton sx={{ "&:hover": { color: 'text.secondary' } }}>
                            <ListItemIcon sx={{ color: "text.secondary" }}>
                                {item.subitems[0].icon}
                            </ListItemIcon>
                            <ListItemText primary={item.subitems[0].title} sx={{ fontWeight: 'medium' }} />
                        </ListItemButton>
                    </ListItem>
                )}
            </React.Fragment>
        ));
    };

    return (
        <>
            <Setting openModal={openModal} handleModalClose={handleModalClose} />
            <List>{renderMenuItems()}</List>
        </>
    );
};

export default Menu;
