import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Navbar from './nav/Navbar'
import Sidebar from './sidebar/Sidebar';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Breadcrumbs, Link, useTheme } from '@mui/material';
import Dashboard from './dashboard/Dashboard';
import { AuthContext } from '../../context/AuthContext';
import Qualification from './worker/Qualification';
import RequestList from './worker/RequestList';
import Reviews from './worker/Reviews';
import Client from './hire/Client';
import Home from '../../public/Home';

export const drawerWidth = "245px";


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);


function generateBreadcrumb(location) {
  const segments = location.split('/').filter(segment => segment);
  const breadcrumb = [];

  segments.forEach((segment, index) => {
    if (!isNaN(segment)) {
      return;
    }

    const link = '/' + segments.slice(0, index + 1).join('/');
    breadcrumb.push({
      title: segment.charAt(0).toUpperCase() + segment.slice(1),
      link: link
    });
  });

  return breadcrumb;
}


const BreadcrumbsComponent = ({ theme, url, mainLink = '/dashboard' }) => {
  const breadcrumbs = generateBreadcrumb(url);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        margin: 0,
        padding: 2,
        spacing: 0,
        fontSize: '1.3rem',
      }}
    >
      {/* Main Link */}
      <Link
        underline="hover"
        color={theme.palette.primary.main}
        href={mainLink}
        sx={{
          fontSize: '1.3rem',
          fontWeight: 500,
          color: theme.palette.primary.dark, // <-- Darker main color
        }}
      >
        Main
      </Link>

      {/* Dynamic Breadcrumbs */}
      {breadcrumbs.map((breadcrumb, index) => (
        <Box key={index}>
          {index < breadcrumbs.length - 1 ? (
            <Link
              underline="hover"
              color={theme.palette.primary.main}
              sx={{
                fontSize: '1.3rem',
                fontWeight: 500,
                color: theme.palette.primary.dark, // <-- Same dark link color for in-between
              }}
            >
              {breadcrumb.title}
            </Link>
          ) : (
            <Typography
              sx={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: theme.palette.text.primary, // <-- Last breadcrumb (active page) = default text color
              }}
            >
              {breadcrumb.title}
            </Typography>
          )}
        </Box>
      ))}
    </Breadcrumbs>
  );
};




const Layout = () => {
  const theme = useTheme()
  const { user } = React.useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();


  return (

    <>

      <Box sx={{ display: 'flex', userSelect: "none" }}>

        {location.pathname !== "/" && (
          <>
            <Navbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Sidebar isSidebarOpen={isSidebarOpen} />
          </>
        )}

        <Box component="main" sx={{ flexGrow: 1, px: 2 }}>
          {location.pathname !== "/" && (
            <>
              <DrawerHeader />
              <BreadcrumbsComponent theme={theme} url={location.pathname} />
            </>
          )}
          <Box sx={{ marginTop: 1 }}>
            <Routes>


              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
              <Route path="/" element={<Home />} />

              <Route path="login" element={<Navigate to="/dashboard" replace />} />


              {/* main component  */}
              <Route path="/dashboard" element={<Dashboard />} />


              {
                user?.role == "worker" &&
                <>
                  <Route path="/qualification" element={<Qualification />} />
                  <Route path="/request" element={<RequestList />} />
                  <Route path="/reviews" element={<Reviews />} />
                </>
              }

              {
                user?.role == "hirer" &&
                <>
                  <Route path="/client" element={<Client />} />
                </>
              }



            </Routes>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Layout

