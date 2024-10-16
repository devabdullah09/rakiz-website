import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import { buttonImage, NoGamesFound } from '.';
import ConfirmationDialog from './ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import { Arrow2Down } from '../dashboard/images';
import { Get } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';
import { GamePrompt } from '../dashboard';

function MyGames() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [userCategories, setUserCategories] = useState([]);
  const [selectedUserCategory, setSelectedUserCategory] = useState(null);

  const [gameName, setGameName] = useState(null);

  const userId = localStorage.getItem('userId');
  const getUserCategories = useCallback(() => {
    Get(
      {},
      API_URLS.GET_USER_CATEGORIES.replace(':id', userId),
      (response) => {
        setUserCategories(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [userId]);

  useEffect(() => {
    getUserCategories();
  }, [getUserCategories]);

  // Styles for the input container
  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: { xs: '80%', sm: '50%', md: '30%' }, // Responsive width
    height: '40px',
    background: 'transparent',
    borderRadius: '5px',
    border: '1px solid #000000',
    margin: { xs: '10px 0', sm: '20px 0' },
    color: '#000000',
  };

  // Styles for the input field itself
  const inputStyle = {
    flex: 1,
    fontFamily: 'Noto Kufi Arabic, sans-serif',
    background: 'transparent',
    border: 'none',
    color: '#000000',
    textAlign: 'right',
    height: '100%',
    paddingRight: '10px',
    '&::placeholder': {
      color: '#000000',
    },
  };

  console.log('userCategories', userCategories);

  const onSelect = (selected) => {
    if (selected === 'create') {
      navigate('/start-game');
    } else if (selected === 'myGames') {
      const elem = document.getElementById('my-games');

      if (elem) {
        elem.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      <GamePrompt onSelect={onSelect} />

      {/* <Card
        sx={{
          backgroundImage: 'linear-gradient(315deg, #6fceed 0%, #dde84a 74%)',
          padding: '1rem',
          color: 'white',
          textAlign: 'center',
          borderRadius: '20px',
        }}
      >
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontWeight: 'bold',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontSize: '4rem',
              color: 'black',
              margin: '0', // Remove default margins to reduce gap
              padding: '5px 0', // Optional padding adjustment
            }}
          >
            إنشاء لعبة
          </p>
          <p
            style={{
              fontWeight: 'bold',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontSize: '2rem',
              color: 'black',
              margin: '0', // Remove default margins to reduce gap
              padding: '5px 0', // Optional padding adjustment
            }}
          >
            لعبة جماعية تفاعلية نختبر فيها معرفتكم و ثقافتكم
          </p>
          <br />
          <p
            style={{
              // fontWeight: 'bold',
              fontFamily: 'Noto Kufi Arabic, sans-serif',
              fontSize: '2rem',
              color: 'black',
              width: '60%',
              margin: '0', // Remove default margins to reduce gap
              padding: '5px 0', // Optional padding adjustment
            }}
          >
            لانشاء لعبة جديدة اضغط على ( لعبة جديدة ) و لاسترجاع الألعاب السابقة، اضغط على ( ألعابي ){' '}
          </p>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <button
              style={{
                background: 'black',
                border: 'none',
                padding: '10px 20px', // Adjust padding for height and width
                color: 'yellow',
                fontFamily: 'Noto Kufi Arabic',
                fontSize: '1rem',
                cursor: 'pointer',
                borderRadius: '30px', // Adjust border radius for the button
                width: '150px', // Adjust width
                height: '50px', // Adjust height
              }}
              onClick={() => navigate('/start-game')}
            >
              لعبة جديدة
            </button>
            &nbsp;&nbsp;
            <button
              style={{
                background: 'yellow',
                border: 'none',
                borderRadius: '30px', // Adjust border radius for the button
                padding: '10px 20px', // Adjust padding for height and width
                color: 'black',
                fontFamily: 'Noto Kufi Arabic',
                fontSize: '1rem',
                cursor: 'pointer',
                width: '150px', // Adjust width
                height: '50px', // Adjust height
              }}
              onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
            >
              ألعابي
            </button>
            <br />
            <br />
          </Box>
          <img src={Arrow2Down} alt="arrow" style={{ width: '50px', height: '50px' }} />
        </CardContent>
      </Card> */}
      <div className="my-10" id="my-games">
        <p
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-2xl lg:text-3xl xl:text-4xl mb-4 md:mb-6 font-bold text-center"
        >
          ألعابي
        </p>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack items on small screens
            justifyContent: 'space-between',
            alignItems: 'center', // Center items on small screens
            gap: 2,
            padding: '10px 0',
          }}
        >
          <div>
            <img
              src={buttonImage}
              alt="button"
              style={{ cursor: 'pointer', maxWidth: '100%' }} // Responsive width
              height={50}
              width={200}
            />
          </div>
          <div style={inputContainerStyle}>
            <input placeholder="اسم اللعبة" style={inputStyle} type="text" />
          </div>
        </Box>

        {/* Empty */}
        {userCategories?.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <img
              src={NoGamesFound}
              alt="game"
              style={{
                maxWidth: '100%',
                width: { xs: '200px', sm: '200px' }, // Responsive width
                height: 'auto',
                marginBottom: '20px',
              }}
            />
            <p
              style={{
                fontWeight: 'bold',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                fontSize: '1rem',
                color: 'black',
              }}
            >
              لم يتم العثور على أي لعبة تم لعبها
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontFamily: 'Noto Kufi Arabic, sans-serif',
                fontSize: '1rem',
                color: 'black',
              }}
            >
              لم تلعب أي لعبة بعد، ابدأ اللعب الآن.
            </p>
          </Box>
        )}

        {userCategories?.length > 0 && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                // height: '100%',
                // padding: '10px 0',
              }}
            >
              <p
                style={{
                  backgroundColor: '#000000',
                  fontWeight: 'bold',
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  fontSize: '1.3rem',
                  color: 'white',
                  // margin: '5% 15%',
                  borderRadius: '30px',
                  textAlign: 'center',
                  padding: '5px 10px',
                }}
              >
                عدد مرات اللعب :{userCategories?.length}
              </p>
            </Box>
            <Grid container flexDirection={'row-reverse'}>
              {userCategories?.map((category) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={category?.game_name}>
                  <Card
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      margin: '10px',
                      borderRadius: '20px',
                      boxShadow: '0px 0px 10px 0px #000000',
                    }}
                  >
                    <h2 style={{ textAlign: 'center' }}>{category?.game_name}</h2>
                    <Grid container spacing={0} sx={{ gap: 0 }}>
                      {category?.games?.map((game) => (
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          md={4}
                          lg={4}
                          key={game.id}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 0,
                            margin: 0,
                          }}
                        >
                          <img
                            src={game.category?.avatar}
                            alt={game.category?.name}
                            style={{
                              width: '100%',
                              maxWidth: '160px',
                              height: { xs: '200px', sm: '200px', md: '400px', lg: '400px' },
                              marginRight: '0', // Ensure no space between the image and text
                            }}
                          />
                          <p
                            style={{
                              fontWeight: 'bold',
                              fontFamily: 'Noto Kufi Arabic, sans-serif',
                              fontSize:
                                window.innerWidth > 350 && window.innerWidth < 550
                                  ? '0.4rem'
                                  : window.innerWidth > 550 && window.innerWidth < 1024
                                  ? '0.6rem'
                                  : '1rem',
                              color: 'black',
                              backgroundColor: 'yellow',
                              textAlign: 'center',
                              margin: 0,
                              width: '70%',
                            }}
                          >
                            {console.log('ksdfhdsfsdf', window.innerWidth)}
                            <strong>{game?.category?.name}</strong>
                          </p>
                        </Grid>
                      ))}
                    </Grid>
                    <Button
                      sx={{
                        backgroundColor: '#6DCEF2',
                        color: 'black',
                        border: 'none',
                        width: '80%',
                        margin: 'auto',
                        marginY: '10px',
                        maxWidth: '300px',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: { xs: '0.7rem', sm: '1rem', md: '1rem', lg: '1rem' },
                      }}
                      onClick={() => {
                        setGameName(category?.game_name);
                        setSelectedUserCategory(category?.games);
                        setOpen(true);
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 'bold',
                          fontFamily: 'Noto Kufi Arabic, sans-serif',
                          color: 'black',
                          textAlign: 'center',
                          margin: 0,
                        }}
                      >
                        ألعب
                      </p>
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {open && (
          <ConfirmationDialog
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={() => {
              setOpen(false);
              navigate('/team-score', { state: { userCategories: selectedUserCategory, game_name: gameName } });
            }}
          />
        )}
      </div>
    </>
  );
}

export default MyGames;
