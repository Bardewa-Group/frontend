import { Box, Avatar, Divider, Typography } from '@mui/material';
import { Drawer, DrawerHeader } from '../Layout';
import Menu from './Menu';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

function getUsername(user) {
    return (
        <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
                textTransform: 'capitalize',
                textAlign: 'center',
                mb: 1,
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: "text.secondary",
                whiteSpace: 'nowrap', 
                overflow: 'hidden',   
                textOverflow: 'ellipsis', 
                maxWidth: '220px',    
            }}
        >
            {
                user?.full_name?.trim() === "" ? "Your Username" : user?.full_name
            }

        </Typography>
    );
}


const Sidebar = ({ isSidebarOpen }) => {
    const { user } = useContext(AuthContext)


    return (

        <>

            <Drawer
                open={isSidebarOpen}
                variant='permanent'
            >
                <DrawerHeader />

                {
                    isSidebarOpen &&
                    <>

                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            p={1}
                            my={1}
                        >
                            <Avatar
                                sx={{
                                    width: { xs: 60, md: 80 },
                                    height: { xs: 60, md: 80 },
                                    mb: 1,
                                }}
                            >
                                {user?.username[0].toUpperCase()}
                            </Avatar>


                            {
                                getUsername(user)
                            }

                        </Box>

                        <Divider sx={{ my: 2 }} />
                    </>
                }


                <Menu
                    isSidebarOpen={isSidebarOpen}
                />

            </Drawer>

        </>
    );
};



export default Sidebar;