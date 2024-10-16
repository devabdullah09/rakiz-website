import { Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { Games } from './constants';
import GameCard from './GameCard';

function GamePackages() {
  return (
    <>
      <Card
        // make card borderless and remove shadow
        sx={{
          border: 'none',
          boxShadow: 'none',
        }}
        className="mt-10 md:mt-20 mb-10"
      >
        <CardContent>
          <p
            style={{
              fontFamily: 'Noto Kufi Arabic',
            }}
            className="text-4xl xl:text-5xl mb-4 md:mb-6 font-bold text-center"
          >
            باقات الألعاب
          </p>
          <p
            style={{
              fontFamily: 'Noto Kufi Arabic',
            }}
            className="text-lg lg:text-xl xl:text-3xl text-center mb-5 "
          >
            لكل مستخدم لعبة واحدة مجانية يمكنك من خلالها تجربة الفئات الموجودة
          </p>
          <br />
          <Grid container spacing={2}>
            {Games.map((game) => (
              <Grid item xs={6} sm={6} md={3} key={game.title}>
                <GameCard {...game} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default GamePackages;
