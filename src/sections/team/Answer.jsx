import { ArrowBack } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, IconButton } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { call_icon, explore_icon, hand_raise_icon } from '../home/icons/inex';
import { GameLayout } from 'src/layout';
import { API_URLS } from 'src/constants/API_URLS';
import { Get } from 'src/actions';

function Answer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { answer, userCateogory, allCategories, game_name } = location?.state || {}; // Retrieve the state

  console.log('jsdfdsfdsf', allCategories);

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
    <>
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
          <Box className="flex flex-col sm:flex-row justify-between items-center gap-3 w-4/5 m-auto -mb-10">
            <button
              style={{
                backgroundColor: '#6DCEF2',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                width: '100%',
                maxWidth: '150px',
                borderRadius: '30px',
                color: 'black',
              }}
              className="text-base lg:text-2xl 2xl:text-4xl h-[40px] lg:h-[50px]"
            >
              {answer?.score}: نقاط
            </button>
            <button
              style={{
                backgroundColor: 'red',
                borderRadius: '30px',
                color: 'white',
                width: '100%',
                maxWidth: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
              }}
              className="text-base lg:text-2xl 2xl:text-4xl h-[40px] lg:h-[50px]"
            >
              Report Now
            </button>
          </Box>

          <Card
            sx={{
              borderRadius: '30px',
              p: '20px',
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
              mt: '20px',
            }}
            className="h-full"
          >
            <CardContent className="h-full">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  px: { xs: '10px', sm: '0px' },
                }}
                className="mb-3 lg:mb-6"
              >
                <p
                  style={{
                    fontFamily: 'Noto Kufi Arabic, sans-serif',
                    color: '#000000',
                  }}
                  className="text-base lg:text-2xl 2xl:text-4xl font-bold"
                >
                  {answer?.answer}
                </p>
              </Box>

              <div className="h-[80%] overflow-hidden mx-auto text-center mb-2 lg:mb-3">
                <img src={answer?.answer_img} alt="Answer" className="h-full object-cover mx-auto rounded-[10px]" />
              </div>
            </CardContent>
          </Card>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              width: '80%',
              margin: 'auto',
              mt: '-27px',
            }}
          >
            <button
              style={{
                backgroundColor: 'black',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                width: '100%',
                maxWidth: '150px',
                borderRadius: '10px',
                color: 'white',
              }}
              className="text-base md:text-lg lg:text-2xl h-[40px] lg:h-[50px]"
              onClick={() =>
                navigate('/result', {
                  state: {
                    question: answer,
                    userCateogory: userCateogory,
                    allCategories: allCategories,
                    game_name: game_name,
                  },
                })
              }
            >
              ؟ من أجاب{' '}
            </button>
            {/* <p
              style={{
                backgroundColor: '#6DCEF2',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                borderRadius: '10px',
                color: 'black',
                fontSize: '1.25rem',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <img src={pause} alt="pause" height={15} width={15} />
              &nbsp;
              {'00:' + (timeToAnswer || 0)} &nbsp;
              <img src={clock} alt="clock" height={15} width={15} />
            </p> */}
            <button
              style={{
                backgroundColor: '#6DCEF2',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                width: '100%',
                maxWidth: '300px',
                borderRadius: '10px',
                color: 'black',
              }}
              className="text-base lg:text-2xl 2xl:text-4xl h-[40px] lg:h-[50px]"
              onClick={() =>
                navigate('/question', {
                  state: {
                    question: answer,
                    userCateogory: userCateogory,
                    allCategories: allCategories,
                    game_name: game_name,
                  },
                })
              }
            >
              <IconButton>
                <ArrowBack />
              </IconButton>{' '}
              العودة إلى السؤال
            </button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={3} className="h-full">
          <Box className="h-full w-full flex sm:flex-col justify-center items-center  gap-5 xl:gap-6 2xl:gap-10 px-4 xl:px-5 2xl:px-6">
            <div className="w-full my-4">
              <div className="bg-black text-center p-2 rounded-[30px] w-full">
                <p
                  className="text-sm md:text-base lg:text-xl xl:text-2xl text-white"
                  style={{
                    fontFamily: 'cairo',
                  }}
                >
                  {userCateogory?.team1_name || 'Team 1'}
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
            <div className="w-full my-4">
              <div className="bg-black text-center p-2 rounded-[30px] w-full">
                <p
                  className="text-sm md:text-base lg:text-xl xl:text-2xl text-white"
                  style={{
                    fontFamily: 'cairo',
                  }}
                >
                  {userCateogory?.team2_name || 'Team 2'}
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
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Answer;
