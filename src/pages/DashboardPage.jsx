import { Box, Card, CardContent, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Get, Post } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';
import { AddContained, MinusContained } from 'src/images';
import { Categories, GamePrompt } from 'src/sections/dashboard';

function DashboardPage() {
  const [categories, setCategories] = useState([]);
  const [team1Count, setTeam1Count] = useState(1);
  const [team2Count, setTeam2Count] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery('(max-width:600px)'); // e.g., for mobile devices
  // Initialize user categories state
  const [userCategories, setUserCategories] = useState({
    userId: userId,
    categoryIds: [],
    game_name: '',
    team1_name: '',
    team1_players: 0,
    team2_name: '',
    team2_players: 0,
    team1_score: 0,
    team2_score: 0,
  });

  console.log(userCategories);
  // Update players count when team count changes
  useEffect(() => {
    setUserCategories((prev) => ({
      ...prev,
      team1_players: team1Count,
      team2_players: team2Count,
    }));
  }, [team1Count, team2Count]);

  // Fetch categories from the API
  const getAllCategories = useCallback(() => {
    try {
      Get(
        {},
        API_URLS.GET_CATEGORIES,
        (response) => {
          setCategories(response?.data);
        },
        (error) => {
          enqueueSnackbar('فشل تحميل الفئات', { variant: 'error' });
        }
      );
    } catch (error) {
      enqueueSnackbar('فشل تحميل الفئات', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const handleCreateGame = () => {
    try {
      Post(
        userCategories,
        API_URLS.CREATE_USER_CATEGORIES,
        (response) => {
          enqueueSnackbar('تم إنشاء اللعبة بنجاح', { variant: 'success' });
          console.log('responsesds', response);
          if (response?.data?.userCategories) {
            navigate('/team-score', {
              state: { userCategories: response?.data?.userCategories, game_name: response?.data?.gameName },
            });
          } else {
            //  Show error of game name already exists
            enqueueSnackbar('اسم اللعبة موجود بالفعل', { variant: 'error' });
          }
        },
        (error) => {
          enqueueSnackbar('فشل إنشاء اللعبة', { variant: 'error' });
        }
      );
    } catch (error) {
      enqueueSnackbar('فشل إنشاء اللعبة', { variant: 'error' });
    }
  };

  console.log('jksdgfsdnfd', userCategories);
  return (
    <>
      <GamePrompt
        onSelect={(selected) => {
          if (selected === 'create') {
            //  scroll down to categories
            window.scrollTo({ top: 1000, behavior: 'smooth' });
          } else if (selected === 'myGames') {
            navigate('/my-games');
          }
        }}
      />

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 font-bold text-center"
        >
          اختر الفئات
        </h1>
        <p
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-lg lg:text-xl xl:text-2xl text-black text-center md:w-[75%]"
        >
          ٣ فئات لفريقك، و ٣ فئات للفريق المنافس، بمجموع ٦ فئات بـ ٣٦ سؤال مختلف، اختاروا الفئات بعناية عشان تضمنون
          الفرصة الأكبر للفوز
        </p>
      </div>

      <Categories
        categories={categories}
        onSelectedCategories={(id) => {
          console.log(id);
          setUserCategories({
            ...userCategories,
            categoryIds: [...id],
          });
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '20px',

          margin: 'auto',
        }}
        className="sm:w-[80%] lg:w-[70%]"
      >
        <p
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 font-bold text-center"
        >
          حدد معلومات الفرق
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <input
            placeholder="اسم الفريق"
            className="px-2"
            style={{
              minWidth: '200px',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              color: '#000000',
              height: '40px',
              background: 'transparent',
              borderRadius: '15px',
              border: '1px solid #000000',
              textAlign: 'right',
              margin: '10px 0',
            }}
            onChange={(e) => setUserCategories({ ...userCategories, game_name: e.target.value })}
          />
        </div>

        <Box className="flex flex-col-reverse sm:flex-row justify-center items-center gap-5 w-full">
          <Card
            style={{
              width: { xs: '100%', sm: '100%', md: '100%' },
              minWidth: '180px',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <CardContent
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                // backgroundColor: '#6DCEF2',
              }}
            >
              <p
                style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                  margin: '10px 0',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                }}
              >
                الفريق الثاني
              </p>
              <input
                placeholder="الفريق الثاني"
                className="px-2"
                style={{
                  width: '100%',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  color: '#000000',
                  height: '40px',
                  background: 'transparent',
                  borderRadius: '15px',
                  border: '1px solid #000000',
                  textAlign: 'right',
                  margin: '10px 0',
                }}
                onChange={(e) => setUserCategories({ ...userCategories, team2_name: e.target.value })}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  height: '40px',
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
                  onClick={() => setTeam2Count((prev) => prev + 1)}
                />
                <p>{team2Count}</p>
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
                  onClick={() => setTeam2Count((prev) => Math.max(1, prev - 1))}
                />
              </div>
            </CardContent>
          </Card>

          <Card
            style={{
              width: { xs: '100%', sm: '100%', md: '100%' },
              minWidth: '180px',
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            <CardContent
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <p
                style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                  margin: '10px 0',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                }}
              >
                الفريق الأول
              </p>
              <input
                placeholder=" الفريق الأول"
                className="px-2"
                style={{
                  width: '100%',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  color: '#000000',
                  height: '40px',
                  background: 'transparent',
                  borderRadius: '15px',
                  border: '1px solid #000000',
                  textAlign: 'right',
                  margin: '10px 0',
                }}
                onChange={(e) => setUserCategories({ ...userCategories, team1_name: e.target.value })}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  height: '40px',
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
                  onClick={() => setTeam1Count((prev) => prev + 1)}
                />
                <p>{team1Count}</p>
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
                  onClick={() => setTeam1Count((prev) => Math.max(1, prev - 1))}
                />
              </div>
            </CardContent>
          </Card>
        </Box>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            style={{
              width: '40%',
              height: '50px',
              background: 'yellow',
              color: '#000000',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              margin: '10px 0',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
            onClick={() => {
              // check if exactly 6 category Ids are selected then create game
              if (userCategories?.categoryIds?.length === 6) {
                handleCreateGame();
              } else {
                enqueueSnackbar('يجب اختيار ٦ فئات', { variant: 'error' });
              }
            }}
          >
            بدء اللعب
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
