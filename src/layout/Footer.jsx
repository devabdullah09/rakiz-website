import React from 'react';
import { Box, Grid } from '@mui/material';
import { AppGStore } from 'src/images';

function Footer() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{ padding: '10px 20px' }}
        >
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} All rights reserved by Rakiz.</p>
          <img src={AppGStore} alt="Apple Store" height={40} width={200} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Footer;
