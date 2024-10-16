import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Logo } from 'src/images';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';

const GameLayout = ({ gameName, onExit, onBackToDashboard, onGameOver, teamname }) => {
  const [openExitDialog, setOpenExitDialog] = useState(false);
  const [openGameOverDialog, setOpenGameOverDialog] = useState(false);
  const [openBackToBoardDialog, setOpenBackToBoardDialog] = useState(false);
  return (
    <AppBar
      position="static"
      elevation={0}
      className="h-auto sm:[80px]"
      sx={{
        backgroundColor: '#6DCEF2',
        color: 'black',
        // borderRadius: '50px',
        border: '1px solid #00000040',
        // height: { xs: 'auto', sm: '80px' },
        // margin: { xs: '10px', sm: '20px' },
        // maxWidth: 'calc(100% - 40px)',
        // padding: { xs: '5px', sm: '0px' },
      }}
    >
      <Toolbar
        className="flex flex-col sm:flex-row justify-between sm:items-center relative "
        // sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}
      >
        <Box className="w-full sm:w-auto flex items-center justify-between sm:justify-start mt-1 sm:mt-0">
          {/* Left side options */}
          <Button
            color="inherit"
            onClick={() => setOpenBackToBoardDialog(true)}
            sx={{ padding: { xs: '4px', sm: '8px' } }}
          >
            <Box
              sx={{
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                fontSize: { xs: '0.7rem', sm: '0.7rem', md: '0.8rem' },
                background: 'yellow',
                color: '#000000',
                padding: { xs: '5px 10px', sm: '8px 16px' },
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.25 9L8.25 12M8.25 12L11.25 15M8.25 12H15.75M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              انهاء اللعبة
            </Box>
          </Button>

          {/* <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexGrow: 1 }}> */}
          <Button
            color="inherit"
            onClick={() => setOpenGameOverDialog(true)}
            sx={{ padding: { xs: '4px', sm: '8px' } }}
          >
            <Box
              sx={{
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.8rem' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                background: 'yellow',
                color: '#000000',
                borderRadius: '50px',
                padding: { xs: '5px 10px', sm: '8px 16px' },
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.3641 18.3641C20.0519 16.6762 21.0001 14.387 21.0001 12.0001C21.0001 9.61309 20.0519 7.32389 18.3641 5.63606C16.6762 3.94822 14.387 3 12.0001 3C9.61309 3 7.32389 3.94822 5.63606 5.63606M18.3641 18.3641C16.6762 20.0519 14.387 21.0001 12.0001 21.0001C9.61309 21.0001 7.32389 20.0519 5.63606 18.3641C3.94822 16.6762 3 14.387 3 12.0001C3 9.61309 3.94822 7.32389 5.63606 5.63606M18.3641 18.3641L5.63606 5.63606"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              لوحة القيادة
            </Box>
          </Button>

          <Button color="inherit" onClick={() => setOpenExitDialog(true)} sx={{ padding: { xs: '4px', sm: '8px' } }}>
            <Box
              sx={{
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.8rem' },
                background: '#000000',
                color: '#ffffff',
                padding: { xs: '5px 10px', sm: '8px 16px' },
                borderRadius: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.75 7V3.25C11.75 2.65326 11.5129 2.08097 11.091 1.65901C10.669 1.23705 10.0967 1 9.5 1H3.5C2.90326 1 2.33097 1.23705 1.90901 1.65901C1.48705 2.08097 1.25 2.65326 1.25 3.25V16.75C1.25 17.3467 1.48705 17.919 1.90901 18.341C2.33097 18.7629 2.90326 19 3.5 19H9.5C10.0967 19 10.669 18.7629 11.091 18.341C11.5129 17.919 11.75 17.3467 11.75 16.75V13M14.75 13L17.75 10M17.75 10L14.75 7M17.75 10H5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              خروج
            </Box>
          </Button>
        </Box>
        {/* </Box> */}

        {/* Center Typography for medium and large screens, right aligned for small screens */}
        <Typography
          variant="h6"
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            left: { md: '50%' },
            transform: { md: 'translateX(-50%)' },
            fontSize: { xs: '1rem', sm: '1.25rem' },
            textAlign: { xs: 'right', md: 'center' },
            flexGrow: { xs: 1, md: 0 },
            whiteSpace: 'nowrap',
            margin: { xs: '0 5px', md: 0 },
          }}
        >
          {gameName || 'Game'}
        </Typography>

        {/* Right side: Logo and outlined circle with Typography */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            sx={{
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.8rem' },
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              backgroundColor: 'black',
              borderRadius: '50px',
              padding: { xs: '5px 10px', sm: '8px 16px' },
            }}
          >
            دور فريق: {teamname || 'Team'}
          </Typography>
          <IconButton edge="end" color="inherit">
            <Avatar alt="Logo" src={Logo} sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
          </IconButton>
        </Box>
      </Toolbar>
      <div
        style={{
          transition: 'max-height 0.3s ease', // Use max-height for smooth transition
          maxHeight: openExitDialog ? '500px' : '0',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: openExitDialog ? 1 : 0, // Control opacity
        }}
      >
        <GameExitDialog open={openExitDialog} onClose={() => setOpenExitDialog(false)} onExit={onExit} />
      </div>
      <div
        style={{
          transition: 'max-height 0.3s ease', // Use max-height for smooth transition
          maxHeight: openGameOverDialog ? '500px' : '0',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: openGameOverDialog ? 1 : 0, // Control opacity
        }}
      >
        <GameOverDialog
          open={openGameOverDialog}
          onClose={() => setOpenGameOverDialog(false)}
          onGameOver={onGameOver}
        />
      </div>
      <div
        style={{
          transition: 'max-height 0.3s ease', // Use max-height for smooth transition
          maxHeight: openBackToBoardDialog ? '500px' : '0',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: openBackToBoardDialog ? 1 : 0, // Control opacity
        }}
      >
        <BackToBoardDialog
          open={openBackToBoardDialog}
          onClose={() => setOpenBackToBoardDialog(false)}
          onBackToDashboard={onBackToDashboard}
        />
      </div>
    </AppBar>
  );
};

export default GameLayout;

const GameExitDialog = ({ open, onClose, onExit }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="90%" margin="auto" mt={2}>
        <Close onClick={onClose} style={{ cursor: 'pointer' }} />
        <DialogTitle
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize:
              window.innerWidth > 320 && window.innerWidth < 480
                ? '0.5rem'
                : window.innerWidth > 481 && window.innerWidth < 768
                ? '0.8rem'
                : window.innerWidth > 769 && window.innerWidth < 1024
                ? '1.1rem'
                : window.innerWidth > 1025 && window.innerWidth < 1440
                ? '1.4rem'
                : '1.7rem',
            textAlign: 'left',
            padding: '2px',
          }}
        >
          الخروج
        </DialogTitle>
      </Box>
      <hr
        style={{
          width: '90%',
          height: '1px',
          backgroundColor: '#000000',
          border: 'none',
          margin: 'auto',
          padding: '0px',
          opacity: '0.5',
          marginBottom: '10px',
        }}
      />
      <DialogContent>
        <Typography
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize:
              window.innerWidth > 320 && window.innerWidth < 480
                ? '0.5rem'
                : window.innerWidth > 481 && window.innerWidth < 768
                ? '0.8rem'
                : window.innerWidth > 769 && window.innerWidth < 1024
                ? '1.1rem'
                : window.innerWidth > 1025 && window.innerWidth < 1440
                ? '1.4rem'
                : '1.7rem',
            textAlign: 'right',
            padding: '2px',
          }}
        >
          هل تريد الخروج من اللعبة؟
        </Typography>
      </DialogContent>
      <DialogActions
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          margin: 'auto',
          width: '90%',
        }}
      >
        <Button
          fullWidth
          onClick={onClose}
          className="hover:bg-black"
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize: '1rem',
            padding: '5px 10px',
            margin: '0 10px',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '50px',
          }}
        >
          الغاء
        </Button>
        <Button
          onClick={onExit}
          fullWidth
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize: '1rem',
            padding: '5px 10px',
            margin: '0 10px',
            backgroundColor: '#6DCEF2',
            color: '#000000',
            borderRadius: '50px',
          }}
        >
          نعم
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const GameOverDialog = ({ open, onClose, onGameOver }) => {
  const handleConfirm = () => {
    onClose();
    onGameOver();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="90%" margin="auto" mt={2}>
        <Close onClick={onClose} style={{ cursor: 'pointer' }} />
        <DialogTitle
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize:
              window.innerWidth > 320 && window.innerWidth < 480
                ? '0.5rem'
                : window.innerWidth > 481 && window.innerWidth < 768
                ? '0.8rem'
                : window.innerWidth > 769 && window.innerWidth < 1024
                ? '1.1rem'
                : window.innerWidth > 1025 && window.innerWidth < 1440
                ? '1.4rem'
                : '1.7rem',
            textAlign: 'left',
            padding: '2px',
          }}
        >
          لوحة القيادة
        </DialogTitle>
      </Box>
      <hr
        style={{
          width: '90%',
          height: '1px',
          backgroundColor: '#000000',
          border: 'none',
          margin: 'auto',
          padding: '0px',
          opacity: '0.5',
          marginBottom: '10px',
        }}
      />
      <DialogContent>
        <Typography
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize:
              window.innerWidth > 320 && window.innerWidth < 480
                ? '0.5rem'
                : window.innerWidth > 481 && window.innerWidth < 768
                ? '0.8rem'
                : window.innerWidth > 769 && window.innerWidth < 1024
                ? '1.1rem'
                : window.innerWidth > 1025 && window.innerWidth < 1440
                ? '1.4rem'
                : '1.7rem',
            textAlign: 'right',
            padding: '2px',
          }}
        >
          هل تريد الانتقال الى لوحة القيادة؟
        </Typography>
      </DialogContent>
      <DialogActions
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          margin: 'auto',
          width: '90%',
        }}
      >
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize: '1rem',
            padding: '5px 10px',
            margin: '0 10px',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '50px',
          }}
        >
          الغاء
        </Button>
        <Button
          onClick={handleConfirm}
          fullWidth
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize: '1rem',
            padding: '5px 10px',
            margin: '0 10px',
            backgroundColor: '#6DCEF2',
            color: '#000000',
            borderRadius: '50px',
          }}
        >
          نعم
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const BackToBoardDialog = ({ open, onClose, onBackToDashboard }) => {
  const handleConfirm = () => {
    onClose();
    onBackToDashboard();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="90%" margin="auto" mt={2}>
        <Close onClick={onClose} style={{ cursor: 'pointer' }} />
        <DialogTitle
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize:
              window.innerWidth > 320 && window.innerWidth < 480
                ? '0.5rem'
                : window.innerWidth > 481 && window.innerWidth < 768
                ? '0.8rem'
                : window.innerWidth > 769 && window.innerWidth < 1024
                ? '1.1rem'
                : window.innerWidth > 1025 && window.innerWidth < 1440
                ? '1.4rem'
                : '1.7rem',
            textAlign: 'left',
            padding: '2px',
          }}
        >
          العودة الى لوحة القيادة
        </DialogTitle>
      </Box>
      <hr
        style={{
          width: '90%',
          height: '1px',
          backgroundColor: '#000000',
          border: 'none',
          margin: 'auto',
          padding: '0px',
          opacity: '0.5',
          marginBottom: '10px',
        }}
      />
      <DialogContent>
        <Typography
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize:
              window.innerWidth > 320 && window.innerWidth < 480
                ? '0.5rem'
                : window.innerWidth > 481 && window.innerWidth < 768
                ? '0.8rem'
                : window.innerWidth > 769 && window.innerWidth < 1024
                ? '1.1rem'
                : window.innerWidth > 1025 && window.innerWidth < 1440
                ? '1.4rem'
                : '1.7rem',
            textAlign: 'right',
            padding: '2px',
          }}
        >
          هل تريد العودة الى لوحة القيادة؟
        </Typography>
      </DialogContent>
      <DialogActions
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          margin: 'auto',
          width: '90%',
        }}
      >
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize: '1rem',
            padding: '5px 10px',
            margin: '0 10px',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '50px',
          }}
        >
          الغاء
        </Button>
        <Button
          onClick={handleConfirm}
          fullWidth
          sx={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
            fontSize: '1rem',
            padding: '5px 10px',
            margin: '0 10px',
            backgroundColor: '#6DCEF2',
            color: '#000000',
            borderRadius: '50px',
          }}
        >
          نعم
        </Button>
      </DialogActions>
    </Dialog>
  );
};
