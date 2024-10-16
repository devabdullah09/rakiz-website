import { Box, Card, CardContent } from '@mui/material';
import React from 'react';
import { Arrow2Down } from './images';

function GamePrompt({ onSelect }) {
  return (
    <Card
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
        {/* Create Game */}
        <p
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 font-bold text-center text-black"
        >
          إنشاء لعبة
        </p>
        <p
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-lg lg:text-xl xl:text-2xl  text-black"
        >
          لعبة جماعية تفاعلية نختبر فيها معرفتكم و ثقافتكم
        </p>
        <br />
        <p
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-lg lg:text-xl xl:text-2xl mb-5 text-black lg:w-3/5"
        >
          لانشاء لعبة جديدة اضغط على ( لعبة جديدة ) و لاسترجاع الألعاب السابقة، اضغط على ( ألعابي ){' '}
        </p>
        <div className="flex items-center gap-5 my-5">
          <button
            className="font-bold text-lg lg:text-xl xl:text-2xl bg-black text-[#faef47] rounded-3xl sm:min-w-[184px] py-2 px-5"
            onClick={() => onSelect('create')}
          >
            لعبة جديدة
          </button>

          <button
            className="font-bold text-lg lg:text-xl xl:text-2xl bg-[#faef47] text-black rounded-3xl sm:min-w-[184px] py-2 px-5"
            onClick={() => onSelect('myGames')}
          >
            ألعابي
          </button>
        </div>
        <img src={Arrow2Down} alt="arrow" style={{ width: '50px', height: '50px' }} />
      </CardContent>
    </Card>
  );
}

export default GamePrompt;
