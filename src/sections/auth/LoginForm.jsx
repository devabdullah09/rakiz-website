import { Card, CardContent, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import { Auth, LoginLogo } from '.';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Post } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';
import { useSnackbar } from 'notistack';

function LoginForm() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('البريد الإلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
    password: Yup.string().required('كلمة المرور مطلوبة'),
  });

  const handleSubmit = (values) => {
    // Handle form submission
    console.log('Form values:', values);
    try {
      Post(
        values,
        API_URLS.LOGIN,
        (response) => {
          console.log('Login response:', response);
          localStorage.setItem('token', response?.data?.token);
          // decode jwt token and save user data in local storage
          const base64Url = response?.data?.token?.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jwtPayload = JSON.parse(window.atob(base64));
          localStorage.setItem('user', jwtPayload);
          localStorage.setItem('userId', response?.data?.userId);
          console.log('User data:', response);
          enqueueSnackbar('تم تسجيل الدخول بنجاح', { variant: 'success' });
          navigate('/how-to-play');
        },
        (error) => {
          enqueueSnackbar('فشل تسجيل الدخول', { variant: 'error' });
          console.log('Login error:', error);
        }
      )
    } catch (error) {
      enqueueSnackbar('فشل تسجيل الدخول', { variant: 'error' });
      
    }
  };

  return (
    <Auth>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur }) => (
          <Form>
            <Card
              style={{
                background: '#6DCEF2',
                opacity: '0.9',
                borderRadius: '20px',
                padding: isSmallScreen ? '10px' : '20px',
              }}
            >
              <CardContent
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <img
                  src={LoginLogo}
                  alt="logo"
                  style={{
                    width: isSmallScreen ? '80px' : '120px',
                    height: isSmallScreen ? '90px' : '136px',
                    marginBottom: isSmallScreen ? '10px' : '20px',
                  }}
                />
                <div style={{ width: '100%', margin: '10px 0' }}>
                  <Field
                    name="email"
                    placeholder="البريد الإلكتروني"
                    style={{
                      width: '100%',
                      fontFamily: 'Noto Kufi Arabic, sans-serif',
                      color: '#FFFFFF',
                      height: '40px',
                      background: 'transparent',
                      borderRadius: '5px',
                      border: '1px solid #FFFFFF',
                      textAlign: 'right',
                    }}
                    type="email"
                  />
                  <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                </div>
                <div style={{ width: '100%', margin: '10px 0' }}>
                  <Field
                    name="password"
                    placeholder="كلمة المرور"
                    style={{
                      width: '100%',
                      height: '40px',
                      background: 'transparent',
                      borderRadius: '5px',
                      border: '1px solid #FFFFFF',
                      textAlign: 'right',
                    }}
                    type="password"
                  />
                  <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    color: '#FFFFFF',
                  }}
                >
                  <a href="/register" style={{ fontSize: isSmallScreen ? '12px' : '14px', color: '#FFFFFF' }}>
                    إنشاء حساب جديد
                  </a>
                  <a href="/forget-password" style={{ fontSize: isSmallScreen ? '12px' : '14px', color: '#FFFFFF' }}>
                    نسيت كلمة المرور؟
                  </a>
                </div>
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
                    cursor: 'pointer',
                  }}
                  type="submit"
                >
                  تسجيل الدخول
                </button>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </Auth>
  );
}

export default LoginForm;
