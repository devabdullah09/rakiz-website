import { Box, Card, CardContent, Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Auth } from '.';
import { useNavigate } from 'react-router-dom';
import { Get, Post } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';
import { useSnackbar } from 'notistack';

function AccountSettings() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [oneUser, setOneUser] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const { enqueueSnackbar } = useSnackbar();

  const [userModel, setUserModel] = useState({
    id: userId,
    first_name: null,
    last_name: null,
    country_code: null,
    phone_number: null,
    birth_date: null,
    email: null,
  });

  useEffect(() => {
    if (token) {
      const jwtObject = JSON.parse(atob(token.split('.')[1]));
      setUser(jwtObject);
    }
  }, [token]);

  const getUserById = useCallback(() => {
    try {
      Get(
        {},
        API_URLS.GET_USER_BY_ID.replace(':id', userId),
        (response) => {
          // enqueueSnackbar('profile data updated', { variant: 'success' });
          setOneUser(response?.data);
        },
        (error) => {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
      );
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  }, [userId, enqueueSnackbar]);
  
  useEffect(() => {
    getUserById();
  }, [getUserById]);

  const handleSaveChanges=()=>{
    const payload=userModel
    const first_name=payload?.first_name?payload?.first_name:oneUser?.first_name
    const last_name = payload?.last_name ? payload?.last_name : oneUser?.last_name;

    payload.full_name = first_name + ' ' + last_name;
    try {
      Post(
        userModel,
        API_URLS.UPDATE_USER,
        resp=>{
          enqueueSnackbar('profile data updated', { variant: 'success' });
          localStorage.clear();

          navigate('/login');
        },
        error=>{
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
      )
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '80%',
                marginLeft: '10%',
                marginRight: '10%',
                marginTop: '10%',
                marginBottom: '3%',
              }}
            >
              <button
                style={{
                  fontSize: '1rem',
                  fonteWeight: 'bold',
                  width: '50%',
                  height: '50px',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  background: 'black',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                }}
              >
                حساب تعريفي
              </button>
              <button
                style={{
                  fontSize: '1rem',
                  fonteWeight: 'bold',
                  width: '50%',
                  borderRadius: '5px',
                  height: '50px',
                  color: '#000000',
                  cursor: 'pointer',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  // overlap the border of the first button to create a single border
                  borderLeft: '1px solid #000000',
                }}
                onClick={() => {
                  navigate('/forget-password');
                }}
              >
                تغيير كلمة المرور
              </button>
            </Box>
            <Box
              style={{
                display: 'flex',
                gap: '5px',
                width: '80%',
                marginLeft: '10%',
                marginRight: '10%',
              }}
            >
              <input
                placeholder={oneUser?.first_name || 'first name'}
                style={{
                  width: '50%',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  color: '#000000',
                  height: '40px',
                  background: 'transparent',
                  borderRadius: '5px',
                  border: '1px solid #000000',
                  textAlign: 'right',
                  margin: '10px 0',
                }}
                onChange={(e)=>{
                  setUserModel({
                    ...userModel,
                    first_name:e.target.value
                  })
                }}
              />
              <input
                placeholder={oneUser?.last_name || 'last name'}
                style={{
                  width: '50%',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  color: '#000000',
                  height: '40px',
                  background: 'transparent',
                  borderRadius: '5px',
                  border: '1px solid #000000',
                  textAlign: 'right',
                  margin: '10px 0',
                }}
                onChange={(e)=>{
                  setUserModel({
                    ...userModel,
                    last_name:e.target.value
                  });
                }}
              />
            </Box>
            <Box
              style={{
                display: 'flex',
                gap: '5px',
                width: '80%',
                marginLeft: '10%',
                marginRight: '10%',
              }}
            >
              <input
                placeholder={oneUser?.country_code}
                style={{
                  width: '30%',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  color: '#000000',
                  height: '40px',
                  background: '#E3E3E3',
                  borderRadius: '5px',
                  border: '1px solid #000000',
                  textAlign: 'right',
                  margin: '10px 0',
                }}
                onClick={(e)=>{
                  setUserModel({
                    ...userModel,
                    country_code:e.target.value
                  })
                }}
              />
              <input
                placeholder={oneUser?.phone_number}
                style={{
                  width: '70%',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  color: '#000000',
                  height: '40px',
                  background: 'transparent',
                  borderRadius: '5px',
                  border: '1px solid #000000',
                  textAlign: 'left',
                  margin: '10px 0',
                }}
                onChange={(e)=>{
                  setUserModel({
                    ...userModel,
                    phone_number:e.target.value
                  });
                }}
              />
            </Box>
            <Box
              style={{
                gap: '5px',
                width: '80%',
                marginLeft: '10%',
                marginRight: '10%',
              }}
            >
              <input
                placeholder={oneUser?.email}
                style={{
                  width: '100%',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  color: '#000000',
                  height: '40px',
                  background: 'transparent',
                  borderRadius: '5px',
                  border: '1px solid #000000',
                  textAlign: 'right',
                  margin: '10px 0',
                }}
                onChange={(e)=>{
                  setUserModel({
                    ...userModel,
                    email:e.target.value
                  });
                }}
              />
              <input
                placeholder={oneUser?.birth_date}
                style={{
                  width: '100%',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  color: '#000000',
                  height: '40px',
                  background: 'transparent',
                  borderRadius: '5px',
                  border: '1px solid #000000',
                  textAlign: 'right',
                  margin: '10px 0',
                }}
                onChange={(e)=>{
                  setUserModel({
                    ...userModel,
                    birth_date: e.target.value,
                  });
                }}
              />
              <button
                style={{
                  width: '100%',
                  height: '50px',
                  background: '#6DCEF2',
                  color: '#000000',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  border: '1px solid #000000',
                  textAlign: 'center',
                  margin: '20px 0 0',
                }}
                onClick={() => {
                  handleSaveChanges();
                }}
              >
                حفظ التغييرات
              </button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Auth>
              <Card
                style={{
                  background: '#6DCEF2',
                  opacity: '0.9',
                  borderRadius: '20px',
                  width: '100%',
                  padding: isSmallScreen ? '10px' : '20px',
                }}
              >
                <CardContent
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/* Show Avatar */}
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Avatar"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                    }}
                  />
                  {/* Show User name */}
                  <p
                    style={{
                      fontFamily: 'Noto Kufi Arabic, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: '#000000',
                      margin: '10px 0',
                    }}
                  >
                    {user?.full_name}
                  </p>
                  {/* Show User email */}
                  <p
                    style={{
                      fontFamily: 'Cairo, sans-serif',
                      fontSize: '1rem',
                      color: '#000000',
                      margin: '10px 0',
                    }}
                  >
                    {user?.email}
                  </p>
                  {/* Show Logout Button */}
                  <button
                    style={{
                      width: '60%',
                      height: '50px',
                      background: 'yellow',
                      color: '#000000',
                      fontFamily: 'Noto Kufi Arabic, sans-serif',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      borderRadius: '10px',
                      border: '1px solid #000000',
                      textAlign: 'center',
                      margin: '20px 0 0',
                    }}
                    onClick={() => {
                      // clear token, user, and user id from local storage
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      localStorage.removeItem('user_id');
                      navigate('/');
                    }}
                  >
                    تسجيل الخروج
                  </button>
                </CardContent>
              </Card>
            </Auth>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AccountSettings;

// const ChangePassword = () => {
//   return (
//     <Card>
//       <CardContent>
//         <Grid container spacing={3}>
//           <Grid
//             item
//             xs={12}
//             sm={12}
//             md={6}
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <Box
//               sx={{
//                 display: 'flex',
//                 width: '80%',
//                 marginLeft: '10%',
//                 marginRight: '10%',
//                 marginTop: '10%',
//                 marginBottom: '3%',
//               }}
//             >
//               <button
//                 style={{
//                   fontSize: '1rem',
//                   fonteWeight: 'bold',
//                   width: '50%',
//                   height: '50px',
//                   color: '#000000',
//                   cursor: 'pointer',
//                   borderRadius: '5px',
//                   background: 'black',
//                   fontFamily: 'Noto Kufi Arabic, sans-serif',
//                 }}
//               >
//                 حساب تعريفي
//               </button>
//               <button
//                 style={{
//                   fontSize: '1rem',
//                   fonteWeight: 'bold',
//                   width: '50%',
//                   borderRadius: '5px',
//                   height: '50px',
//                   color: '#FFFFFF',
//                   cursor: 'pointer',
//                   fontFamily: 'Noto Kufi Arabic, sans-serif',
//                   // overlap the border of the first button to create a single border
//                   borderLeft: '1px solid #000000',
//                 }}
//               >
//                 تغيير كلمة المرور
//               </button>
//             </Box>
//             <Box
//               style={{
//                 display: 'flex',
//                 gap: '5px',
//                 width: '80%',
//                 marginLeft: '10%',
//                 marginRight: '10%',
//               }}
//             >
//               <input
//                 placeholder="كلمة المرور القديمة"
//                 style={{
//                   width: '100%',
//                   fontFamily: 'Noto Kufi Arabic, sans-serif',
//                   color: '#000000',
//                   height: '40px',
//                   background: 'transparent',
//                   borderRadius: '5px',
//                   border: '1px solid #000000',
//                   textAlign: 'right',
//                   margin: '10px 0',
//                 }}
//               />
//               <input
//                 placeholder="كلمة المرور الجديدة"
//                 style={{
//                   width: '100%',
//                   fontFamily: 'Noto Kufi Arabic, sans-serif',
//                   color: '#000000',
//                   height: '40px',
//                   background: 'transparent',
//                   borderRadius: '5px',
//                   border: '1px solid #000000',
//                   textAlign: 'right',
//                   margin: '10px 0',
//                 }}
//               />
//               <input
//                 placeholder="تأكيد كلمة المرور الجديدة"
//                 style={{
//                   width: '100%',
//                   fontFamily: 'Noto Kufi Arabic, sans-serif',
//                   color: '#000000',
//                   height: '40px',
//                   background: 'transparent',
//                   borderRadius: '5px',
//                   border: '1px solid #000000',
//                   textAlign: 'right',
//                   margin: '10px 0',
//                 }}
//               />
//               <button
//                 style={{
//                   width: '100%',
//                   height: '50px',
//                   background: '#6DCEF2',
//                   color: '#000000',
//                   fontFamily: 'Noto Kufi Arabic, sans-serif',
//                   fontSize: '20px',
//                   fontWeight: 'bold',
//                   borderRadius: '5px',
//                   border: '1px solid #000000',
//                   textAlign: 'center',
//                   margin: '20px 0 0',
//                 }}
//               >
//                 حفظ التغييرات
//               </button>
//             </Box>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };
