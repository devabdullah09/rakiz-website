import React, { useState } from 'react';
import { Auth } from '.';
import { Box, useTheme, useMediaQuery, Card, CardContent, TextField } from '@mui/material';
import { ArrowBackOutlinedCircular } from 'src/images';
import { useNavigate } from 'react-router-dom';
import { Post } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';
import { useSnackbar } from 'notistack';

function ForgetPassword() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const handleForgetPassword = (email) => {
    try {
      Post(
        { email: email },
        API_URLS.FORGET_PASSWORD,
        (response) => {
          // show email sent message
          enqueueSnackbar('Email has been sent for pasword reset. Check your email', { variant: 'success' });
          navigate('/login');
        },
        (error) => {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
      );
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };
  return (
    <Auth>
      <Card
        style={{
          background: '#6DCEF2',
          opacity: '0.9',
          borderRadius: '20px',
          padding: isSmallScreen ? '10px' : '20px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onClick={() => navigate('/login')}
        >
          <img
            src={ArrowBackOutlinedCircular}
            alt="back"
            style={{
              width: isSmallScreen ? '30px' : '42px',
              height: isSmallScreen ? '30px' : '42px',
              cursor: 'pointer',
              marginTop: isSmallScreen ? '10px' : '10px',
            }}
          />
          <p
            style={{
              fontSize: isSmallScreen ? '15px' : '20px',
              color: '#FFFFFF',
              cursor: 'pointer',
              margin: '10px 0',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
            }}
          >
            العودة لتسجيل الدخول
          </p>
        </Box>
        <CardContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              fontSize: isSmallScreen ? '20px' : '44px',
              color: '#FFFFFF',
              cursor: 'pointer',
              margin: '10px 0',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
            }}
          >
            نسيت كلمة السر
          </p>
          <TextField
            placeholder="البريد الإلكتروني"
            style={{
              width: '100%',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              color: '#FFFFFF',
              background: 'transparent',
              borderRadius: '5px',
              border: '1px solid #FFFFFF',
              textAlign: 'right',
              input: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
              direction: 'rtl',
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            style={{
              width: '100%',
              height: isSmallScreen ? '50px' : '70px',
              background: 'yellow',
              color: '#000000',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontSize: isSmallScreen ? '20px' : '28px',
              fontWeight: 'bold',
              borderRadius: '5px',
              border: '1px solid #FFFFFF',
              textAlign: 'center',
              margin: '20px 0 0',
            }}
            onClick={() => handleForgetPassword(email)}
          >
            نسيت كلمة السر
          </button>
        </CardContent>
      </Card>
    </Auth>
  );
}

export default ForgetPassword;
