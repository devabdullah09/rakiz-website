import React from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Contact } from 'src/images';

function ContactUs(props) {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  return (
    <Card style={{ overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <CardContent>
        <Grid container spacing={0} style={{ height: '100%' }}>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f3f3f3',
              animation: 'fadeIn 2s',
            }}
          >
            <Box p={3} width="100%">
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      align="center"
                      style={{
                        marginBottom: '20px', 
                        color: '#000000' }}
                    >
                      اتصل بنا
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="ادخال الاسم"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: '15px', backgroundColor: 'white', borderRadius: '5px' }}
                      inputProps={{
                        style: { textAlign: 'right', direction: 'rtl' },
                      }}
                    />
                    <TextField
                      fullWidth
                      placeholder="ادخال البريد الالكتروني"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: '15px', backgroundColor: 'white', borderRadius: '5px' }}
                      inputProps={{
                        style: { textAlign: 'right', direction: 'rtl' },
                      }}
                    />
                    <TextField
                      fullWidth
                      placeholder="رقم التیلفون"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ marginBottom: '15px', backgroundColor: 'white', borderRadius: '5px' }}
                      inputProps={{
                        style: { textAlign: 'right', direction: 'rtl' },
                      }}
                    />
                    <TextField
                      fullWidth
                      placeholder="الرسالة"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      multiline
                      rows={4}
                      style={{ marginBottom: '15px', backgroundColor: 'white', borderRadius: '5px' }}
                      inputProps={{
                        style: { textAlign: 'right', direction: 'rtl' },
                      }}
                    />
                    <Button
                      fullWidth
                      style={{
                        backgroundColor: '#6DCEF2',
                        color: 'white',
                        padding: '10px 0',
                        transition: 'background-color 0.3s ease',
                        borderRadius: '5px',
                      }}
                      type="submit"
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#6DCEF2')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#6DCEF2')}
                    >
                      ارسال
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'fadeIn 2s',
            }}
          >
            <img
              src={Contact}
              alt="contact us"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease-in-out',
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ContactUs;
