import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { arrow_back, arrow_forward } from 'src/images';
import { call_icon, explore_icon, hand_raise_icon } from '../home/icons/inex';
import { GameLayout } from 'src/layout';
import { API_URLS } from 'src/constants/API_URLS';
import { Get } from 'src/actions';
import { FaPhoneAlt } from 'react-icons/fa';

const TeamHelpOptions = ({ teamName, teamKey, setIsRunning }) => {
  const [isCallTimerVisible, setIsCallTimerVisible] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [callTime, setCallTime] = useState(60);
  const [hasUsedCall, setHasUsedCall] = useState(false);

  useEffect(() => {
    const savedIsCallTimerVisible = localStorage.getItem(`${teamKey}isCallTimerVisible`) === 'true';
    const savedCallTime = parseInt(localStorage.getItem(`${teamKey}callTimerTime`), 10) || 60;
    const savedHasUsedCall = localStorage.getItem(`${teamKey}hasUsedCall`) === 'true';

    setIsCallTimerVisible(savedIsCallTimerVisible);
    setCallTime(savedCallTime);
    setHasUsedCall(savedHasUsedCall);
  }, []);

  useEffect(() => {
    localStorage.setItem(`${teamKey}isCallTimerVisible`, isCallTimerVisible);
    localStorage.setItem(`${teamKey}callTimerTime`, callTime);
    localStorage.setItem(`${teamKey}hasUsedCall`, hasUsedCall);

    return () => {
      localStorage.removeItem(`${teamKey}isCallTimerVisible`);
      localStorage.removeItem(`${teamKey}callTimerTime`);
      localStorage.removeItem(`${teamKey}hasUsedCall`);
    };
  }, [isCallTimerVisible, callTime]);

  useEffect(() => {
    let callInterval;
    if (isCallTimerVisible && callTime > 0) {
      callInterval = setInterval(() => {
        setCallTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (callTime === 0 || !isCallTimerVisible) {
      setIsCallTimerVisible(false);
      setCallTime(60);
      setIsRunning(true);
    }
    return () => clearInterval(callInterval);
  }, [isCallTimerVisible, callTime]);

  const handleCallClick = () => {
    if (hasUsedCall) return;

    setIsRunning(false);
    setIsCallTimerVisible(true);
    setHasUsedCall(true);
  };

  return (
    <>
      {!isCallTimerVisible ? (
        <div className="my-4 w-full">
          <div className="bg-black text-center p-2 rounded-[30px] w-full">
            <p
              className="text-sm md:text-base lg:text-xl xl:text-2xl text-white"
              style={{
                fontFamily: 'cairo',
              }}
            >
              {teamName || 'Team 1'}
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {!isHandRaised && !isReversed && (
              <>
                <img
                  src={hand_raise_icon}
                  alt="hand_raise_icon"
                  className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                  style={{
                    border: '1px solid black',
                    borderRadius: '15%',
                  }}
                  onClick={() => setIsHandRaised(true)}
                />
                <button
                  disabled={hasUsedCall}
                  style={{
                    opacity: hasUsedCall ? '0.7' : 1,
                  }}
                  onClick={handleCallClick}
                >
                  <img
                    src={call_icon}
                    alt="call_icon"
                    className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                    style={{
                      border: '1px solid black',
                      borderRadius: '15%',
                    }}
                  />
                </button>
                <img
                  src={explore_icon}
                  alt="explore_icon"
                  className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px] cursor-pointer"
                  onClick={() => setIsReversed(true)}
                  style={{
                    border: '1px solid black',
                    borderRadius: '15%',
                  }}
                />
              </>
            )}

            {isHandRaised && (
              <p
                style={{
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#000000',
                  borderRadius: '50px',
                  backgroundColor: '#6DCEF2',
                }}
              >
                جاوب جوابين
              </p>
            )}
            {isReversed && (
              <p
                style={{
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#000000',
                  borderRadius: '50px',
                  backgroundColor: '#6DCEF2',
                }}
              >
                اخذ السؤال!
              </p>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          className="gap-3"
        >
          <div
            style={{
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              height: '100px',
              width: '100px',
              borderRadius: '50%',
              backgroundColor: '#6DCEF2',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FaPhoneAlt className="text-white text-2xl md:text-3xl" />
          </div>

          <p>{`${callTime} seconds`}</p>
          <button
            className="rounded-md m-0 px-5 py-1 text-sm bg-black text-white"
            onClick={() => setIsCallTimerVisible(false)}
          >
            Skip
          </button>

          {/* <p>You have 1 min to call</p> */}
        </div>
      )}
    </>
  );
};

function Question() {
  const navigate = useNavigate();
  const location = useLocation();
  const { question, userCateogory, allCategories, game_name } = location.state || {};

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  // const [isCallTimerVisible, setIsCallTimerVisible] = useState(false);
  // const [callTime, setCallTime] = useState(60);
  // const [isHandRaised, setIsHandRaised] = useState(false);

  useEffect(() => {
    const savedTime = parseInt(localStorage.getItem('timerTime'), 10) || 0;
    const savedIsRunning = localStorage.getItem('timerIsRunning');
    // const savedIsCallTimerVisible = localStorage.getItem('isCallTimerVisible') === 'true';
    // const savedCallTime = parseInt(localStorage.getItem('callTimerTime'), 10) || 60;

    setTime(savedTime);
    setIsRunning(savedIsRunning !== null ? savedIsRunning === 'true' : true);
    // setIsCallTimerVisible(savedIsCallTimerVisible);
    // setCallTime(savedCallTime);
  }, []);

  useEffect(() => {
    localStorage.setItem('timerTime', time);
    localStorage.setItem('timerIsRunning', isRunning);
    // localStorage.setItem('isCallTimerVisible', isCallTimerVisible);
    // localStorage.setItem('callTimerTime', callTime);

    return () => {
      localStorage.removeItem('timerTime');
      localStorage.removeItem('timerIsRunning');
      // localStorage.removeItem('isCallTimerVisible');
      // localStorage.removeItem('callTimerTime');
    };
  }, [time, isRunning]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // useEffect(() => {
  //   let callInterval;
  //   if (isCallTimerVisible && callTime > 0) {
  //     callInterval = setInterval(() => {
  //       setCallTime((prevTime) => prevTime - 1);
  //     }, 1000);
  //   } else if (callTime === 0) {
  //     setIsCallTimerVisible(false);
  //     setCallTime(60);
  //     setIsRunning(true);
  //   }
  //   return () => clearInterval(callInterval);
  // }, [isCallTimerVisible, callTime]);

  // const handleCallClick = () => {
  //   setIsRunning(false);
  //   setIsCallTimerVisible(true);
  // };

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  const handleGetResults = () => {
    try {
      Get(
        {},
        API_URLS.GET_WINNER.replace(':id', allCategories[0]?.id),
        (resp) => {
          navigate('/congrats', { state: { result: resp?.data, allCategories, game_name } });
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
          navigate('/team-score', { state: { userCategories: allCategories, game_name } });
        }}
        onExit={() => {
          navigate('/my-games');
        }}
        onGameOver={handleGetResults}
      />
      <Grid container spacing={2} sx={{ width: '95%', margin: 'auto' }} className="sm:h-[calc(100vh-80px)]">
        <Grid item xs={12} sm={8} md={8} lg={9} className="h-full !px-0">
          <Card
            className="h-full lg:p-5"
            sx={{
              boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
            }}
          >
            <CardContent className="h-full !py-3 lg:p-4">
              <Box
                className="sm:max-h-[10%] mb-2 lg:mb-6"
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <button
                  style={{
                    backgroundColor: '#6DCEF2',
                    borderRadius: '30px',
                    color: 'black',
                    width: '100%',
                    maxWidth: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                  }}
                  className="text-sm md:text-base lg:text-2xl h-[30px] lg:h-[50px]"
                  onClick={handlePauseResume}
                >
                  <img src={arrow_back} alt="arrow_back" />
                  {`${new Date(time * 1000).toISOString().substr(14, 5)}`}
                  <img src={arrow_forward} alt="arrow forward" />
                </button>
                <button
                  style={{
                    background: '#000000',
                    width: '100%',
                    maxWidth: '150px',
                    borderRadius: '30px',
                    color: 'white',
                  }}
                  className="text-sm md:text-base lg:text-2xl h-[30px] lg:h-[50px]"
                >
                  {question?.score}: نقاط
                </button>
              </Box>

              <Box
                className="sm:max-h-[15%] mb-3 lg:mb-6"
                sx={{
                  textAlign: { xs: 'center', sm: 'right' },
                  px: { xs: 2, sm: 0 },
                }}
              >
                <p
                  style={{
                    fontFamily: 'Noto Kufi Arabic, sans-serif',
                  }}
                  className="text-sm lg:text-2xl 2xl:text-4xl"
                >
                  {question?.question}
                </p>
              </Box>

              <div className="sm:h-[60%] mx-auto text-center mb-2 lg:mb-3">
                <img
                  src={question?.question_img}
                  alt="Argentina"
                  className="h-full object-cover mx-auto rounded-[10px]"
                />
              </div>

              <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                <button
                  style={{
                    backgroundColor: '#6DCEF2',
                    width: '100%',
                    maxWidth: '150px',
                    borderRadius: '30px',
                    color: 'black',
                  }}
                  className="text-base md:text-lg lg:text-2xl h-[30px] lg:h-[50px]"
                  onClick={() =>
                    navigate('/answer', {
                      state: { answer: question, timeToAnswer: time, userCateogory, allCategories, game_name },
                    })
                  }
                >
                  الاجابة
                </button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={3} className="sm:h-full">
          <div className="w-full flex sm:flex-col justify-center items-center gap-5 xl:gap-6 2xl:gap-10 h-full px-4 xl:px-5 2xl:px-6">
            <TeamHelpOptions teamName={userCateogory?.team1_name} teamKey="A" setIsRunning={setIsRunning} />
            <TeamHelpOptions teamName={userCateogory?.team2_name} teamKey="B" setIsRunning={setIsRunning} />

            {/* {!isCallTimerVisible ? (
              <div className="my-4 w-full">
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  {!isHandRaised && (
                    <>
                      <img
                        src={hand_raise_icon}
                        alt="hand_raise_icon"
                        className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                        style={{
                          border: '1px solid black',
                          borderRadius: '15%',
                        }}
                        onClick={() => setIsHandRaised(true)}
                      />
                      <img
                        src={call_icon}
                        alt="call_icon"
                        className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] lg:w-[70px] lg:h-[70px]"
                        style={{
                          border: '1px solid black',
                          borderRadius: '15%',
                          cursor: 'pointer',
                        }}
                        onClick={handleCallClick}
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
                    </>
                  )}

                  {isHandRaised && (
                    <p
                      style={{
                        fontFamily: 'Noto Kufi Arabic, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        padding: '1rem',
                        textAlign: 'center',
                        color: '#000000',
                        borderRadius: '50px',
                        backgroundColor: '#6DCEF2',
                      }}
                    >
                      جاوب جوابين
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <p>You have 1 min to call</p>
              </div>
            )} */}
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Question;
