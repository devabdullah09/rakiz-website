import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Logo } from 'src/images';

export default function AppLayout() {
  const navigate = useNavigate();
  const menuItems = ['العب', 'شلون لنعبھا', 'تواصل معنا'];
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      // pasre jwt token
      const jwtObject = JSON.parse(atob(token.split('.')[1]));
      setUser(jwtObject);
    }
  }, [token]);

  const handleMenuItemClick = (index, item) => {
    setSelectedMenuIndex(index);
    setDrawerOpen(false); // Close the drawer on menu item click
    switch (item) {
      case 'العب':
        // Navigate to the home page
        break;
      case 'شلون لنعبھا':
        navigate('/how-to-play');
        break;
      case 'تواصل معنا':
        navigate('/contact-us');
        break;
      default:
        break;
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensures the layout takes full height
        overflow: 'hidden', // Ensures horizontal scrolling is disabled
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          background: '#6DCEF2',
          boxShadow: 'none',
          color: '#FFFFFF',
          borderRadius: { xs: '30px', sm: '50px' },
          border: '1px solid #00000040',
          height: { xs: '60px', sm: '70px' }, // Ensure this matches the AppBar height
          margin: { xs: '10px', sm: '20px' },
          maxWidth: { xs: '90%', sm: 'calc(100% - 40px)' },
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar stays above the Drawer
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: '10px', sm: '10px' },
              padding: { xs: '0 10px', sm: '0 10px' },
            }}
          >
            <Typography
              variant="body"
              component="div"
              fontWeight="bold"
              sx={{
                display: { xs: 'block', sm: 'block', md: 'block' },
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                border: '1px solid #00000040',
                color: '#000000',
                padding: { xs: '5px 10px' },
                backgroundColor: 'yellow',
                borderRadius: '50px',
                fontSize:
                  window.innerWidth > 320 && window.innerWidth < 480
                    ? '0.4rem'
                    : window.innerWidth > 481 && window.innerWidth < 768
                    ? '0.6rem'
                    : window.innerWidth > 769 && window.innerWidth < 1024
                    ? '0.8rem'
                    : window.innerWidth > 1025 && window.innerWidth < 1440
                    ? '1rem'
                    : '1.5rem',
              }}
            >
              عدد الدلعاب المتبقیہ:0
            </Typography>
            {!token ? (
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '5px 10px',
                  color: '#000000',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  fontSize:
                    window.innerWidth > 320 && window.innerWidth < 480
                      ? '0.5rem'
                      : window.innerWidth > 481 && window.innerWidth < 768
                      ? '0.6rem'
                      : window.innerWidth > 769 && window.innerWidth < 1024
                      ? '0.8rem'
                      : window.innerWidth > 1025 && window.innerWidth < 1440
                      ? '1rem'
                      : '1.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/login')}
              >
                دخول
              </button>
            ) : (
              <button
                style={{
                  background: 'black',
                  border: '1px solid #000000',
                  borderRadius: '50px',
                  padding: '5px 10px',
                  color: 'white',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  fontSize:
                    window.innerWidth > 320 && window.innerWidth < 480
                      ? '0.5rem'
                      : window.innerWidth > 481 && window.innerWidth < 768
                      ? '0.6rem'
                      : window.innerWidth > 769 && window.innerWidth < 1024
                      ? '0.8rem'
                      : window.innerWidth > 1025 && window.innerWidth < 1440
                      ? '1rem'
                      : '1.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate('/account-settings');
                }}
              >
                {user?.full_name?.split(' ')[0] || 'تسجیل خروج'}
              </button>
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {!isMediumUp && (
            <Box sx={{ display: 'block' }}>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          {isMediumUp && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              {menuItems.reverse().map((item, index) => (
                <Typography
                  key={index}
                  // variant="h6"
                  component="div"
                  fontWeight="bold"
                  sx={{
                    cursor: 'pointer',
                    fontFamily: 'Noto Kufi Arabic, sans-serif',
                    color: selectedMenuIndex === index ? '#FFFFFF' : '#000000',
                    backgroundColor: selectedMenuIndex === index ? '#000000' : 'transparent',
                    padding: '10px 20px',
                    borderRadius: selectedMenuIndex === index ? '50px' : 'none',
                    fontSize:
                      window.innerWidth > 320 && window.innerWidth < 480
                        ? '0.4rem'
                        : window.innerWidth > 481 && window.innerWidth < 768
                        ? '0.7rem'
                        : window.innerWidth > 769 && window.innerWidth < 1024
                        ? '1rem'
                        : window.innerWidth > 1025 && window.innerWidth < 1440
                        ? '1.3rem'
                        : '1.6rem',
                  }}
                  onClick={() => handleMenuItemClick(index, item)}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          )}
          <img
            src={Logo}
            alt="logo"
            style={{
              width: '50px',
              height: '50px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          />
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: { xs: '70%', sm: '80%' },
            margin: 'auto',
            marginTop: '64px', // Ensure the drawer starts below the AppBar
            // borderRadius: { xs: '30px', sm: '50px' },
            paddingTop: { xs: '0px', sm: '40px' }, // Move the content below the AppBar height
            boxSizing: 'border-box',
            // padding: '10px 0', // Add padding to the drawer
            zIndex: (theme) => theme.zIndex.appBar - 1, // Ensure it's below the AppBar
          },
        }}
      >
        <List sx={{ width: '100%' }}>
          {menuItems.reverse().map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleMenuItemClick(index, item)}
              sx={{
                justifyContent: 'flex-end',
                textAlign: 'right',
                paddingRight: '20px',
                width: 'fit-content',
                marginLeft: 'auto',
              }}
            >
              <ListItemText
                primary={item}
                sx={{
                  textAlign: 'right',
                  color: selectedMenuIndex === index ? '#FFFFFF' : '#000000',
                  backgroundColor: selectedMenuIndex === index ? '#000000' : 'transparent',
                  padding: '10px 20px',
                  borderRadius: selectedMenuIndex === index ? '50px' : 'none',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: { xs: '20px', sm: '40px' },
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </Box>

      <footer
        style={{
          backgroundColor: '#000000',
          color: 'white',
          width: '100%', // Ensures it spans the full width
          padding: '10px 0', // Optional: adds padding to the footer
          position: 'sticky', // Makes it sticky
          bottom: 0, // Sticks it to the bottom
        }}
      >
        <Footer />
      </footer>
    </Box>
  );
}
