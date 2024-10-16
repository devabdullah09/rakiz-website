import { Box, Dialog, DialogContent } from '@mui/material';
import React from 'react';

function ConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          margin: { xs: 2, sm: 'auto' }, // Add margin for small screens
          width: { xs: '100%', sm: 'auto' }, // Full width for small screens
          maxWidth: '600px', // Set max width for larger screens
        },
      }}
    >
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { xs: '10px', sm: '20px' }, // Responsive padding
          }}
        >
          <p
            style={{
              fontWeight: 'bold',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontSize: '1rem',
              color: 'black',
            }}
            className="text-center"
          >
            المتابعة من حيث توقفت
          </p>
          <p
            style={{
              fontWeight: 'bold',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontSize: '1rem',
              color: 'black',
            }}
            className="text-end sm:text-center"
          >
            لديك لعبة نشطة، هل تريد متابعة اللعب أو الاعادة ؟{' '}
          </p>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'row' }, // Stack buttons on small screens
              gap: '20px',
              marginTop: '20px',
              width: '100%',
              justifyContent: 'center', // Center buttons
            }}
          >
            <button
              style={{
                //   background: '#6DCEF2',
                //   width: '100%', // Full width on small screens
                //   maxWidth: '200px', // Max width on larger screens
                //   border: 'none',
                //   borderRadius: '15px',
                //   padding: '10px',
                //   color: '#000000',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                //   fontSize: '1.25rem',
                //   marginBottom: { xs: '10px', sm: '0' }, // Add margin between buttons on small screens
              }}
              className="text-base md:text-lg lg:text-xl xl:text-2xl bg-[#6DCEF2] text-black rounded-2xl sm:min-w-[184px] py-2 px-4"
              onClick={onClose}
            >
              البدء من جديد
            </button>

            <button
              style={{
                // background: '#FFDD57',
                // width: '100%', // Full width on small screens
                // maxWidth: '200px', // Max width on larger screens
                // border: 'none',
                // borderRadius: '15px',
                // padding: '10px',
                // color: '#000000',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                // fontSize: '1.25rem',
              }}
              className="text-base md:text-lg lg:text-xl xl:text-2xl bg-[#FFDD57] text-black rounded-2xl sm:min-w-[184px] py-2 px-4"
              onClick={onConfirm}
            >
              الاستمرار{' '}
            </button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
