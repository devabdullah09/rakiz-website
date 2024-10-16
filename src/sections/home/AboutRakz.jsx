import { Grid } from '@mui/material';
import React from 'react';
import { Games } from './images';

function AboutRakz() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <img
          src={Games}
          alt="games"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '642px',
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // gap: '0rem',
        }}
      >
        <h2
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 font-semibold self-end"
        >
          نبذة عن رَكز
        </h2>
        <p
          style={{
            fontFamily: 'Noto Kufi Arabic, sans-serif',
          }}
          className="text-lg lg:text-xl xl:text-2xl text-right "
        >
          لعبة جماعية ممتعة، تحتوي على ٦ فئات مختلفة و ٣٦ سؤال يختبر معلوماتكم، و عشان نضيف الحماس لليمعة ضفنا ٣ وسائل
          مساعدة لكل فريق، اختاروهم بعناية
        </p>

        <div className="flex justify-center items-center my-10">
          {['ترفيه', 'متعة', 'ذكاء', 'تحدي'].map((text, index) => (
            <React.Fragment key={index}>
              <p
                style={{
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                  padding: '0.5rem',
                }}
                className="text-sm md:text-base lg:text-lg xl:text-xl texrt-center border-[3px] border-[#6DCEF2] rounded-md"
              >
                {text}
              </p>
              {index < 3 && (
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#6DCEF2',
                    margin: 0,
                  }}
                >
                  <span className="hidden md:inline">&#x2013;&#x2013;</span>
                  <span>&#x2013;&#x2013;&#x2013;</span>
                  {/* Dashes in a single line for better scaling */}
                </p>
              )}
            </React.Fragment>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default AboutRakz;
