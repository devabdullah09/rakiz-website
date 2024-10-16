import { Box, Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Ad } from '.';
import { AddContained, MinusContained } from 'src/images';
import { call_icon, explore_icon, hand_raise_icon } from '../home/icons/inex';
import { useLocation, useNavigate } from 'react-router-dom';
import { Get } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';
import { QuizzCard } from './components/QuizzCard';
import { GameLayout } from 'src/layout';
import './team-stats.css';

function TeamStats() {
  // const getScreenHeight = () => {
  //   return window.innerHeight;
  // };
  const navigate = useNavigate();
  // const [userCategories, setUserCategories] = useState([]);
  const userId = localStorage.getItem('userId');
  const location = useLocation();
  const [teamScore, setTeamScore] = useState({
    team1_score: 0,
    team2_score: 0,
  });
  const { userCategories, game_name } = location.state || {};
  // const [screenHeight, setScreenHeight] = useState(getScreenHeight());

  console.log('jhsdfsdfdsfsdf', game_name);

  const getScore = useCallback(() => {
    try {
      Get(
        {},
        API_URLS.GET_SCORE.replace(':userId', userId)
          .replace(':team1_name', userCategories[0]?.team1_name)
          .replace(':team2_name', userCategories[0]?.team2_name),
        (response) => {
          console.log('response', response?.data);
          setTeamScore({
            team1_score: response?.data?.team1_score,
            team2_score: response?.data?.team2_score,
          });
        },
        (error) => {
          console.log('error', error);
        }
      );
    } catch (error) {
      console.log('error', error);
    }
  }, [userId, userCategories]);

  useEffect(() => {
    getScore();
  }, [getScore]);
  console.log('userCategories', teamScore);

  // const getAllCategories = useCallback(() => {
  //   try {
  //     Get(
  //       {},
  //       API_URLS.GET_USER_CATEGORIES.replace(':id', userId),
  //       (response) => {
  //         // setUserCategories(response.data);
  //       },
  //       (error) => {
  //         console.log('error', error);
  //       }
  //     );
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   getAllCategories();
  // }, [getAllCategories]);

  const handleGetResults = () => {
    try {
      Get(
        {},
        API_URLS.GET_WINNER.replace(':id', userCategories[0]?.id),
        (resp) => {
          navigate('/congrats', { state: { result: resp?.data, allCategories: userCategories, game_name: game_name } });
        },
        (error) => {}
      );
    } catch (error) {}
  };

  // Responsive height detection for orientation

  // useEffect(() => {
  //   const handleResize = () => {
  //     setScreenHeight(getScreenHeight());
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  return (
    <div>
      <GameLayout
        gameName={game_name}
        teamname={userCategories[0]?.team1_name}
        onBackToDashboard={() => {
          console.log('already on dashboard');
        }}
        onExit={() => {
          navigate('/my-games');
        }}
        onGameOver={() => {
          handleGetResults();
        }}
      />
      {userCategories?.length === 0 && <p>No Games Found</p>}
      <Grid container spacing={2} sx={{ width: '90%', margin: 'auto' }}>
        {userCategories?.map((uc) => (
          <Grid item xs={6} sm={6} md={4} lg={4} key={uc.id}>
            <QuizzCard userCateogory={uc} allCategories={userCategories} game_name={game_name} />
          </Grid>
        ))}

        {/* <Grid xs={12} sm={12} md={12} lg={12}>
          <br />
        </Grid> */}
        <Grid xs={12} sm={6} md={6} lg={4} order={{ xs: 1, sm: 1, md: 1, lg: 1 }} sx={{ width: '95%', margin: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              width: '90%',
              margin: 'auto',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: { xs: 'center', md: 'center' },
              marginTop: { xs: '20px', sm: '20px', md: '0', lg: '0' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-between',
                alignItems: 'flex-between',
                gap: { xs: 2, md: 3 },
                width: { xs: '50%', md: '100%' },
              }}
            >
              <Typography
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: { xs: '10px 0px' },
                  borderRadius: '5px',
                  textAlign: 'center',
                  // '&:hover': { backgroundColor: 'darkgray' },
                  width: '100%',
                }}
              >
                {userCategories[0]?.team1_name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  // alignItems: 'center',
                  width: '100%',
                  // height: '100%',
                  color: '#000000',
                  border: '1px solid #000000',
                  borderRadius: '5px',
                }}
              >
                <img
                  src={AddContained}
                  alt="add"
                  style={{
                    background: '#000000',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    margin: '2px',
                  }}
                />
                <Typography>{teamScore?.team1_score || 0}</Typography>
                <img
                  src={MinusContained}
                  alt="minus"
                  style={{
                    background: '#000000',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    margin: '2px',
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: { xs: 'center', md: 'center', lg: 'flex-between' },
                alignItems: { xs: 'center', md: 'center', lg: 'flex-between' },
                width: '100%',
                // backgroundColor: 'blue',
              }}
            >
              <Typography
                sx={{
                  width: '100%',
                  textAlign: { xs: 'center', md: 'center', lg: 'right' },
                  margin: 'auto',
                  border: 'none',
                  borderRadius: '15px',
                  // padding: '5px 10px',
                  color: '#000000',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  fontSize: { xs: '1.4rem', md: '1.5rem', lg: '1.8rem' },
                }}
              >
                وسائل مساعدة
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  // marginBottom: '30px',
                  color: '#000000',
                  borderRadius: '5px',
                }}
              >
                <img
                  src={explore_icon}
                  alt="explore"
                  style={{
                    background: '#FFFFFF',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    padding: '2px',
                    border: '1px solid #000000',
                  }}
                />
                <img
                  src={call_icon}
                  alt="call"
                  style={{
                    background: '#FFFFFF',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    padding: '2px',
                    border: '1px solid #000000',
                  }}
                />
                <img
                  src={hand_raise_icon}
                  alt="hand raise"
                  style={{
                    background: '#FFFFFF',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    padding: '2px',
                    border: '1px solid #000000',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={4} order={{ xs: 3, sm: 3, md: 3, lg: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '70%', sm: '70%', md: '70%', lg: '90%' },
              margin: 'auto',
              marginTop: { xs: '20px', sm: '20px', md: '20px', lg: '5%' },
            }}
          >
            <img
              src={Ad}
              alt="Adniyar"
              style={{
                // height: 'auto',
                width: '80%',
                // margin: 'auto',
                // cursor: 'pointer',
                // width: 'auto',
                // maxWidth: 'auto',
                // height: { xs: '120px', md: 'auto' },
              }}
              // className="central-image"
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={4} order={{ xs: 2, sm: 2, md: 2, lg: 3 }} sx={{ width: '95%', margin: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              gap: 3,
              width: '90%',
              margin: 'auto',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: { xs: 'center', md: 'center' },
              marginTop: { xs: '20px', sm: '20px', md: '0', lg: '0' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                justifyContent: { xs: 'center', md: 'center', lg: 'flex-between' },
                alignItems: { xs: 'center', md: 'center', lg: 'flex-between' },
                width: '100%',
                // backgroundColor: 'blue',
              }}
            >
              <Typography
                sx={{
                  width: '100%',
                  textAlign: { xs: 'center', md: 'center', lg: 'right' },
                  margin: 'auto',
                  border: 'none',
                  borderRadius: '15px',
                  // padding: '5px 10px',
                  color: '#000000',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  fontSize: { xs: '1.4rem', md: '1.5rem', lg: '1.8rem' },
                }}
              >
                وسائل مساعدة
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  // marginBottom: '30px',
                  color: '#000000',
                  borderRadius: '5px',
                }}
              >
                <img
                  src={explore_icon}
                  alt="explore"
                  style={{
                    background: '#FFFFFF',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    padding: '2px',
                    border: '1px solid #000000',
                  }}
                />
                <img
                  src={call_icon}
                  alt="call"
                  style={{
                    background: '#FFFFFF',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    padding: '2px',
                    border: '1px solid #000000',
                  }}
                />
                <img
                  src={hand_raise_icon}
                  alt="hand raise"
                  style={{
                    background: '#FFFFFF',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    padding: '2px',
                    border: '1px solid #000000',
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-between',
                alignItems: 'flex-between',
                gap: { xs: 2, md: 3 },
                width: { xs: '50%', md: '100%' },
              }}
            >
              <Typography
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: { xs: '10px 0px' },
                  borderRadius: '5px',
                  textAlign: 'center',
                  // '&:hover': { backgroundColor: 'darkgray' },
                  width: '100%',
                }}
              >
                {userCategories[0]?.team2_name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  // alignItems: 'center',
                  width: '100%',
                  // height: '100%',
                  color: '#000000',
                  border: '1px solid #000000',
                  borderRadius: '5px',
                  // padding: '0 10px',
                }}
              >
                <img
                  src={AddContained}
                  alt="add"
                  style={{
                    background: '#000000',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    margin: '2px',
                  }}
                />
                <Typography>{teamScore?.team1_score || 0}</Typography>
                <img
                  src={MinusContained}
                  alt="minus"
                  style={{
                    background: '#000000',
                    width: '35px',
                    height: '35px',
                    borderRadius: '5px',
                    margin: '2px',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default TeamStats;
