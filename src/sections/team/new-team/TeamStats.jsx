import { GameLayout } from 'src/layout';
import Footer from './components/footer';
// import Header from "./components/header";
import Item from './components/item';
import './team-stats.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Get } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { AddContained, MinusContained } from 'src/images';
import { call_icon, explore_icon, hand_raise_icon } from 'src/sections/home/icons/inex';
import { Ad } from '..';
const TeamStats = () => {
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
    <div className="h-screen flex flex-col">
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
      <section className="pb-0 pt-4 w-full px-2 sm:px-5 md:px-10 h-[calc(100%-26%-80px)] grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-x-8 gap-y-4 ">
        {userCategories?.map((item) => (
          <Item
            key={item}
            className="grid-item"
            userCateogory={item}
            allCategories={userCategories}
            game_name={game_name}
          />
        ))}
      </section>

      <div
        className="mx-auto my-[2%] h-[25%] shadow-xl rounded-lg p-3"
        style={{
          top: 'auto',
          bottom: 0,
          left: 0,
          right: 0,
          width: '90%',
        }}
      >
        <div className="h-full grid grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col sm:flex-row w-full gap-2 justify-center lg:justify-start items-center mx-auto">
            <Box
              className="w-4/5 mx-auto"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-between',
                alignItems: 'flex-between',
                gap: 0.5,
              }}
            >
              <Typography
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: { xs: '5px 0px' },
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
                  alignItems: 'center',
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
                    width:
                      window.innerWidth > 320 && window.innerWidth < 480
                        ? '25px'
                        : window.innerWidth > 481 && window.innerWidth < 768
                        ? '30px'
                        : window.innerWidth > 769 && window.innerWidth < 1024
                        ? '35px'
                        : window.innerWidth > 1025 && window.innerWidth < 1440
                        ? '35px'
                        : '35px',
                    height:
                      window.innerWidth > 320 && window.innerWidth < 480
                        ? '25px'
                        : window.innerWidth > 481 && window.innerWidth < 768
                        ? '30px'
                        : window.innerWidth > 769 && window.innerWidth < 1024
                        ? '35px'
                        : window.innerWidth > 1025 && window.innerWidth < 1440
                        ? '35px'
                        : '35px',
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
                    width:
                      window.innerWidth > 320 && window.innerWidth < 480
                        ? '25px'
                        : window.innerWidth > 481 && window.innerWidth < 768
                        ? '30px'
                        : window.innerWidth > 769 && window.innerWidth < 1024
                        ? '35px'
                        : window.innerWidth > 1025 && window.innerWidth < 1440
                        ? '35px'
                        : '35px',
                    height:
                      window.innerWidth > 320 && window.innerWidth < 480
                        ? '25px'
                        : window.innerWidth > 481 && window.innerWidth < 768
                        ? '30px'
                        : window.innerWidth > 769 && window.innerWidth < 1024
                        ? '35px'
                        : window.innerWidth > 1025 && window.innerWidth < 1440
                        ? '35px'
                        : '35px',
                    borderRadius: '5px',
                    margin: '2px',
                  }}
                />
              </Box>
            </Box>
            <div className="flex flex-col gap-1 justify-center lg:justify-between items-center w-full">
              <p className="text-center text-black font-bold text-base md:text-lg lg:text-xl">وسائل مساعدة</p>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#000000',
                  borderRadius: '5px',
                }}
              >
                <img
                  src={explore_icon}
                  alt="explore"
                  className="bg-white border border-black p-1 rounded-md w-[35px]"
                />
                <img src={call_icon} alt="call" className="bg-white border border-black p-1 rounded-md w-[35px]" />
                <img
                  src={hand_raise_icon}
                  alt="hand raise"
                  className="bg-white border border-black p-1 rounded-md w-[35px]"
                />
              </Box>
            </div>
          </div>
          <div className="hidden lg:flex justify-center items-center w-[70%] lg:w-[80%] mx-auto">
            <img
              src={Ad}
              alt="Adniyar"
              style={{
                width: '90%',
                margin: 'auto',
              }}
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row w-full gap-2 justify-center lg:justify-start items-center  mx-auto">
            <div className="flex flex-col gap-1 justify-center lg:justify-between items-center w-full">
              <p className="text-center text-black font-bold text-base md:text-lg lg:text-xl">وسائل مساعدة</p>
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
                  className="bg-white border border-black p-1 rounded-md w-[35px]"
                />
                <img src={call_icon} alt="call" className="bg-white border border-black p-1 rounded-md w-[35px]" />
                <img
                  src={hand_raise_icon}
                  alt="hand raise"
                  className="bg-white border border-black p-1 rounded-md w-[35px]"
                />
              </Box>
            </div>
            <Box
              className="w-4/5 mx-auto"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-between',
                alignItems: 'flex-between',
                gap: 0.5,
                // backgroundColor: 'grey', // Example background color
                // width: { xs: '50%', md: '100%' },
              }}
            >
              <Typography
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: { xs: '5px 0px' },
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
                  alignItems: 'center',
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
                    width:
                      window.innerWidth > 320 && window.innerWidth < 480
                        ? '25px'
                        : window.innerWidth > 481 && window.innerWidth < 768
                        ? '30px'
                        : window.innerWidth > 769 && window.innerWidth < 1024
                        ? '35px'
                        : window.innerWidth > 1025 && window.innerWidth < 1440
                        ? '35px'
                        : '35px',
                    height:
                      window.innerWidth > 320 && window.innerWidth < 480
                        ? '25px'
                        : window.innerWidth > 481 && window.innerWidth < 768
                        ? '30px'
                        : window.innerWidth > 769 && window.innerWidth < 1024
                        ? '35px'
                        : window.innerWidth > 1025 && window.innerWidth < 1440
                        ? '35px'
                        : '35px',
                    borderRadius: '5px',
                    margin: '2px',
                  }}
                />
                <Typography>{teamScore?.team2_score || 0}</Typography>
                <img
                  src={MinusContained}
                  alt="minus"
                  style={{
                    background: '#000000',
                    width:
                      window.innerWidth > 320 && window.innerWidth < 480
                        ? '25px'
                        : window.innerWidth > 481 && window.innerWidth < 768
                        ? '30px'
                        : window.innerWidth > 769 && window.innerWidth < 1024
                        ? '35px'
                        : window.innerWidth > 1025 && window.innerWidth < 1440
                        ? '35px'
                        : '35px',
                    height:
                      window.innerWidth > 320 && window.innerWidth < 480
                        ? '25px'
                        : window.innerWidth > 481 && window.innerWidth < 768
                        ? '30px'
                        : window.innerWidth > 769 && window.innerWidth < 1024
                        ? '35px'
                        : window.innerWidth > 1025 && window.innerWidth < 1440
                        ? '35px'
                        : '35px',
                    borderRadius: '5px',
                    margin: '2px',
                  }}
                />
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;
