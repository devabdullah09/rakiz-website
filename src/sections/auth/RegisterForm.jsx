import React, { useState } from 'react';
import { Auth } from '.';
import { Box, Card, CardContent, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackOutlinedCircular, Visibilityoff, Visibilityon } from 'src/images';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Post } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';
import { countryCodes } from 'src/constants/constants';
import { useSnackbar } from 'notistack';

function RegisterForm() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = theme.breakpoints.down('sm');
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    birth_date: '',
    country_code: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('الاسم الأول مطلوب'),
    last_name: Yup.string().required('اسم العائلته مطلوب'),
    email: Yup.string().email('البريد الإلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
    birth_date: Yup.date().required('تاريخ الميلاد مطلوب'),
    country_code: Yup.string().required('كود الدولة مطلوب'),
    phone_number: Yup.string().required('رقم التليفون مطلوب'),
    password: Yup.string().min(6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل').required('كلمة المرور مطلوبة'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'كلمات المرور غير متطابقة')
      .required('تأكيد كلمة المرور مطلوب'),
  });

  const handleSubmit = (values) => {
    values.name = `${values.first_name} ${values.last_name}`;
    try {
      Post(
        values,
        API_URLS.REGISTER,
        (response) => {
          enqueueSnackbar('تم تسجيل الحساب بنجاح', { variant: 'success' });
          navigate('/login');
        },
        (error) => {
          enqueueSnackbar('حدث خطأ أثناء تسجيل الحساب', { variant: 'error' });
        }
      );
    } catch (error) {
      enqueueSnackbar('حدث خطأ أثناء تسجيل الحساب', { variant: 'error' });
    }
  };

  return (
    <Auth>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, setFieldValue, values, touched, errors }) => (
          <Form>
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
                  alignItems: 'flex-start',
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
                    margin: isSmallScreen ? '0 10px' : '0 20px',
                    marginTop: isSmallScreen ? '10' : '20px',
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
                    margin: '10px 0',
                    fontFamily: 'Noto Kufi Arabic, sans-serif',
                  }}
                >
                  إنشاء حساب جديد
                </p>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2, // Add gap between text fields
                    width: '100%',
                  }}
                >
                  <TextField
                    name="last_name"
                    placeholder="اسم العائلة"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.last_name && Boolean(errors.last_name)}
                    helperText={touched.last_name && errors.last_name}
                    size="small"
                    inputProps={{ dir: 'rtl' }}
                    sx={{
                      flex: 1,
                      input: { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                    }}
                  />
                  <TextField
                    name="first_name"
                    placeholder="الاسم الأول"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.first_name && Boolean(errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                    size="small"
                    inputProps={{ dir: 'rtl' }}
                    sx={{
                      flex: 1,
                      input: { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                      },
                    }}
                  />
                </Box>
                <TextField
                  name="email"
                  placeholder="البريد الإلكتروني"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  size="small"
                  inputProps={{ dir: 'rtl' }}
                  sx={{
                    width: '100%',
                    mt: 2,
                    input: { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                  }}
                />
                <TextField
                  name="birth_date"
                  placeholder="تاريخ الميلاد"
                  type="date"
                  value={values.birth_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.birth_date && Boolean(errors.birth_date)}
                  helperText={touched.birth_date && errors.birth_date}
                  size="small"
                  inputProps={{ dir: 'rtl' }}
                  sx={{
                    width: '100%',
                    mt: 2,
                    input: { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&:hover fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Select
                  name="country_code"
                  value={values.country_code}
                  onChange={(e) => setFieldValue('country_code', e.target.value)}
                  displayEmpty
                  sx={{
                    width: '100%',
                    mt: 2,
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                  }}
                >
                  {countryCodes.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  name="phone_number"
                  placeholder="رقم التليفون"
                  type="text"
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone_number && Boolean(errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                  size="small"
                  inputProps={{ dir: 'rtl' }}
                  sx={{
                    width: '100%',
                    mt: 2,
                    input: { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                  }}
                />
                <TextField
                  name="password"
                  placeholder="كلمة المرور"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  size="small"
                  inputProps={{ dir: 'rtl' }}
                  sx={{
                    width: '100%',
                    mt: 2,
                    input: { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <img
                        src={showPassword ? Visibilityon : Visibilityoff}
                        alt="Toggle visibility"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                        height={20}
                        width={20}
                      />
                    ),
                  }}
                />
                <TextField
                  name="confirmPassword"
                  placeholder="تأكيد كلمة المرور"
                  type={showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  size="small"
                  inputProps={{
                    dir: 'rtl',
                  }}
                  sx={{
                    width: '100%',
                    mt: 2,
                    input: { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'white' },
                      '&fieldset': { borderColor: 'white' },
                      '&.Mui-focused fieldset': { borderColor: 'white' },
                      // make placeholder color white
                      '& input::placeholder': {
                        color: '#ffffff',
                      },
                      '& input': {
                        textAlign: 'right',
                        color: 'white',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <img
                        src={showPassword ? Visibilityon : Visibilityoff}
                        alt="Toggle visibility"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                        height={20}
                        width={20}
                      />
                    ),
                  }}
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
                    cursor: 'pointer',
                  }}
                  type="submit"
                >
                  تسجيل
                </button>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </Auth>
  );
}

export default RegisterForm;