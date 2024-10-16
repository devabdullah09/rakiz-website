import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { call_icon, explore_icon, hand_raise_icon } from '../home/icons/inex';
import { Get, Post } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';
import { useSnackbar } from 'notistack';
import { GameLayout } from 'src/layout';

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { question, userCateogory, allCategories, game_name } = location?.state || {}; // Retrieve the state
  const userId = localStorage.getItem('userId');
  const { enqueueSnackbar } = useSnackbar();
  const resultModel = {
    team: null,
    gameId: question?.id,
    categoryId: userCateogory?.category?.id,
    userId: userId,
    userCategoryId: userCateogory?.id,
    score: question?.score,
  };

  const handleAddResults = (team) => {
    try {
      resultModel.team = team;
      Post(
        resultModel,
        API_URLS.CREATE_USER_CATEGORY_RESULTS,
        (resp) => {
          navigate('/team-score', { state: { userCategories: allCategories, game_name: game_name } });
        },
        (error) => {
          navigate(/question/, { state: { question: question, userCateogory: userCateogory, game_name: game_name } });
        }
      );
    } catch (error) {
      enqueueSnackbar('Cannot Update Results', { variant: 'error' });
    }
  };

  const handleGetResults = () => {
    try {
      Get(
        {},
        API_URLS.GET_WINNER.replace(':id', allCategories[0]?.id),
        (resp) => {
          navigate('/congrats', { state: { result: resp?.data, allCategories: allCategories, game_name: game_name } });
        },
        (error) => {}
      );
    } catch (error) {}
  };

  return (
    <div
      style={{
        overflowX: 'hidden',
        // background: '#f9f9f9',
        height: '100%',
      }}
    >
      <GameLayout
        gameName={game_name}
        teamname={allCategories[0]?.team1_name}
        onBackToDashboard={() => {
          navigate('/team-score', { state: { userCategories: allCategories, game_name: game_name } });
        }}
        onExit={() => {
          navigate('/my-games');
        }}
        onGameOver={() => {
          handleGetResults();
        }}
      />
      <Grid
        container
        spacing={2}
        sx={{ width: '95%', margin: '0px auto 30px auto' }}
        className="sm:h-[calc(100vh-80px)] "
      >
        <Grid item xs={12} sm={8} md={9} className="h-full pb-4">
          <Card
            sx={{
              width: '95%',
              height: '98%', // Make the card height responsive
              margin: 'auto',
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: { xs: '10px', sm: '20px' }, // Responsive padding
                  textAlign: 'center', // Center text
                  width: '100%', // Full width
                }}
                className="gap-5 lg:gap-10"
              >
                <p
                  style={{
                    fontFamily: 'Noto Kufi Arabic, sans-serif',
                  }}
                  className="text-2xl xl:text-6xl font-bold"
                >
                  منو جاوب صح؟
                </p>
                <div className="w-full">
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                      width: '100%',
                      justifyContent: 'center', // Center buttons
                    }}
                  >
                    <button
                      style={{
                        background: '#000000',
                        width: '100%', // Full width on small screens
                        maxWidth: '200px', // Max width on larger screens
                        borderRadius: '5px',
                        padding: '10px',
                        color: '#FFFFFF',
                        fontFamily: 'Cairo, sans-serif',
                        fontSize: '1.25rem',
                      }}
                      onClick={() => handleAddResults(userCateogory?.team1_name)}
                    >
                      {userCateogory?.team1_name}
                    </button>
                    <button
                      style={{
                        background: '#000000',
                        width: '100%', // Full width on small screens
                        maxWidth: '200px', // Max width on larger screens
                        borderRadius: '5px',
                        padding: '10px',
                        color: '#FFFFFF',
                        fontFamily: 'Cairo, sans-serif',
                        fontSize: '1.25rem',
                      }}
                      onClick={() => handleAddResults(userCateogory?.team2_name)}
                    >
                      {userCateogory?.team2_name}
                    </button>
                  </Box>
                  <button
                    style={{
                      marginTop: '20px', // Add margin to separate from above buttons
                      background: '#808080',
                      width: '100%', // Full width on small screens
                      maxWidth: '410px', // Max width on larger screens
                      borderRadius: '5px',
                      padding: '10px',
                      color: '#FFFFFF',
                      fontFamily: 'Noto Kufi Arabic, sans-serif',
                      fontSize: '1.25rem',
                    }}
                    onClick={() => handleAddResults('none')}
                  >
                    ولا أحد
                  </button>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className="h-full ">
          <div className="h-full w-full flex sm:flex-col justify-center items-center  gap-5 xl:gap-6 2xl:gap-10 px-4 xl:px-5 2xl:px-6">
            <div className="w-full my-4">
              <div className="bg-black text-center p-2 rounded-[30px] w-full">
                <p
                  className="text-sm md:text-base lg:text-xl xl:text-2xl text-white"
                  style={{
                    fontFamily: 'cairo',
                  }}
                >
                  {userCateogory?.team1_name}
                </p>{' '}
              </div>
              <p
                className="text-sm md:text-base lg:text-2xl xl:text-3xl my-3 text-center font-bold text-black"
                style={{
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                }}
              >
                وسائل مساعدة
              </p>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  src={hand_raise_icon}
                  alt="hand_raise_icon"
                  className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                  style={{
                    border: '1px solid black',
                    borderRadius: '15%',
                  }}
                />
                <img
                  src={call_icon}
                  alt="call_icon"
                  className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                  style={{
                    border: '1px solid black',
                    borderRadius: '15%',
                  }}
                />
                <img
                  src={explore_icon}
                  alt="explore_icon"
                  className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                  style={{
                    border: '1px solid black',
                    borderRadius: '15%',
                  }}
                />
              </Box>
            </div>
            <div className="w-full my-4">
              <div className="bg-black text-center p-2 rounded-[30px] w-full">
                <p
                  className="text-sm md:text-base lg:text-xl xl:text-2xl text-white"
                  style={{
                    fontFamily: 'cairo',
                  }}
                >
                  {userCateogory?.team2_name}
                </p>
              </div>
              <p
                className="text-sm md:text-base lg:text-2xl xl:text-3xl my-3 text-center font-bold text-black"
                style={{
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                }}
              >
                وسائل مساعدة
              </p>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  src={hand_raise_icon}
                  alt="hand_raise_icon"
                  className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                  style={{
                    border: '1px solid black',
                    borderRadius: '15%',
                  }}
                />
                <img
                  src={call_icon}
                  alt="call_icon"
                  className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                  style={{
                    border: '1px solid black',
                    borderRadius: '15%',
                  }}
                />
                <img
                  src={explore_icon}
                  alt="explore_icon"
                  className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                  style={{
                    border: '1px solid black',
                    borderRadius: '15%',
                  }}
                />
              </Box>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Result;
