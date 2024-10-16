import { Card, Button } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Get } from 'src/actions';
// import { API_URLS } from 'src/constants/API_URLS';
import { congrats, congrats_cover } from 'src/images';
import { GameLayout } from 'src/layout';

function CongratsCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, allCategories, game_name } = location?.state || {};

  // const handleGetResults = () => {
  //   try {
  //     Get(
  //       {},
  //       API_URLS.GET_WINNER.replace(':id', allCategories[0]?.id),
  //       (resp) => {
  //         navigate('/congrats', { state: { result: resp?.data } });
  //       },
  //       (error) => {}
  //     );
  //   } catch (error) {}
  // };

  return (
    <>
      <GameLayout
        teamname={allCategories[0]?.team1_name}
        onBackToDashboard={() => {
          navigate('/team-score', { state: { userCategories: allCategories, game_name: game_name } });
        }}
        onExit={() => {
          navigate('/my-games');
        }}
        onGameOver={() => {
          console.log('game over');
        }}
      />
      <div
        style={{
          backgroundImage: `url(${congrats_cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            height: 'auto',
            width: '80%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#A6DDE8',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={congrats}
            alt="congrats"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              marginTop: '0px',
            }}
          />

          <h1
            style={{
              color: '#000000',
              textAlign: 'center',
              marginTop: '-50px',
              // set font family for happy birthday
              fontFamily: 'cursive',
            }}
          >
            {' '}
            Congratulations!{' '}
          </h1>

          <p
            style={{
              color: '#000000',
              fontSize: '40px',
              fontWeight: 'bold',
              fontFamily: 'cursive',
              textAlign: 'center',
              width: '100%',
              margin: 0,
            }}
          >
            {result?.status}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '90%',
              marginTop: '20px',
              margin: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '45%',
                background: '#6DCEF2',
                height: '200px',
                marginBottom: '20px',
              }}
            >
              <p
                style={{
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '100%',
                  borderRadius: '15px',
                  height: '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#000000',
                  margin: 0,
                }}
              >
                {result?.team1_name || 'Team 1'}
              </p>
              <p
                style={{
                  color: '#fff',
                  fontSize: '50px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                {result?.team1_score || 0}
              </p>
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>V/S</span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '45%',
                background: '#6DCEF2',
                height: '200px',
                justifyContent: 'flex-start',
                marginBottom: '20px',
              }}
            >
              <p
                style={{
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRadius: '15px',
                  width: '100%',
                  height: '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#000000',
                  margin: 0,
                }}
              >
                {result?.team2_name || 'Team 2'}
              </p>
              <p
                style={{
                  color: '#fff',
                  fontSize: '50px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                {result?.team2_score || 0}
              </p>
            </div>
          </div>

          <Button
            variant="contained"
            color="primary"
            style={{
              margin: '20px',
              backgroundColor: 'yellow',
              color: '#000000',
              padding: '10px 20px',
              fontFamily: 'Nutino, sans-serif',
              fontSize: '1.5rem',
            }}
            onClick={() => navigate('/my-games')}
          >
            العب مرة ثانية
          </Button>
        </Card>
      </div>
    </>
  );
}

export default CongratsCard;
