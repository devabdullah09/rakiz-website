import { Box, Button, Card, CardContent } from '@mui/material';
import React from 'react';
import { intro_logo } from 'src/images';

// import { useNavigate } from 'react-router-dom';
function Introduction({ onBrowseClick, onCreateClick }) {
  // const navigate = useNavigate();
  return (
    <Card
      sx={{
        backgroundImage: 'linear-gradient(315deg, #6fceed 0%, #dde84a 74%)',
        padding: '1rem',
        color: 'white',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        fontFamily: 'Nutino Kufi Arabic, sans-serif',
        borderRadius: '30px',
      }}
    >
      <CardContent>
        <img
          src={intro_logo}
          alt="home"
          className="m-auto w-[150px] md:w-[230px] mb-3"
          style={{
            gap: '0px',
            opacity: '0px',
          }}
        />
        <p
          style={{
            fontWeight: 'bold',
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-base md:text-lg lg:text-xl xl:text-2xl mb-4"
        >
          الجواب عليك، و السؤال علينا
        </p>
        <p
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-base md:text-lg lg:text-xl xl:text-2xl"
        >
          ٦ فئات، ٣٦ سؤال، و معاهم ٣ وسائل مساعدة
        </p>
        <div className="flex items-center justify-center flex-row flex-wrap gap-4 mt-10">
          <button
            style={{
              fontFamily: 'Noto Kufi Arabic, sans-serif',
            }}
            onClick={() => onBrowseClick()}
            className="text-base md:text-lg lg:text-xl xl:text-2xl bg-black text-[#faef47] rounded-3xl sm:min-w-[184px] py-2 px-4"
          >
            {/* button for Browse games */}
            تصفح الألعاب
          </button>
          <button
            style={{
              fontFamily: 'Noto Kufi Arabic, sans-serif',
            }}
            className="text-base md:text-lg lg:text-xl xl:text-2xl bg-[#faef47] text-black rounded-3xl sm:min-w-[184px] py-2 px-4"
            onClick={() => onCreateClick()}
          >
            {/* Button for create games */}
            إنشاء لعبة
          </button>
          <button
            style={{
              fontFamily: 'Noto Kufi Arabic, sans-serif',
            }}
            className="text-base md:text-lg lg:text-xl xl:text-2xl bg-[#faef47] text-black rounded-3xl sm:min-w-[184px] py-2 px-4"
            onClick={() => onCreateClick()}
          >
            {/* Button for create games */}
            واجهة الأطفال
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Introduction;
