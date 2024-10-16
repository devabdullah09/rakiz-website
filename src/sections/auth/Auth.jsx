import { Grid } from '@mui/material';
import React from 'react';
import { BlueBackgroundWithLines } from 'src/images';

function Auth(props) {
  return (
    <Grid
      container
      style={{
        backgroundImage: `url(${BlueBackgroundWithLines})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid item xs={11} sm={8} md={5} lg={4}>
      {props.children}
      </Grid>
    </Grid>
  );
}

export default Auth;
