import { Button, Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { KnowledgeTestImage } from './images';

function KnowledgeTest() {
  return (
    <Card
      sx={{
        backgroundColor: '#6DCEF2',
        color: '#000',
        padding: '16px',
        maxWidth: '100%',
        margin: '0 auto',
        borderRadius: '25px',
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <h1
                style={{
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                }}
                className="text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 font-bold self-end"
              >
                اختبر معلوماتك
              </h1>
              <p
                style={{
                  fontFamily: 'Noto Kufi Arabic, sans-serif',
                }}
                className="text-lg lg:text-xl xl:text-2xl text-right mb-5 md:mb-10"
              >
                هي لعبة ثقافية ممتعة مناسبة لجميع الاعمار فيها تختبر معلومات يمعتكم، اللعبة تشمل جميع انواع الاسئلة حسب
                الفئة المختارة.
              </p>
              <div className="text-end">
                <button className="text-base md:text-lg lg:text-xl xl:text-2xl bg-[#faef47] text-black rounded-3xl sm:min-w-[184px] py-2 px-4 font-bold">
                  إنشاء لعبة
                </button>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '50px 0',
            }}
          >
            <img
              src={KnowledgeTestImage}
              alt="Knowledge-Test"
              className="w-[200px] sm:w-[220px] md:w-[250px] lg:w-[270px] xl:w-[300px]"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default KnowledgeTest;
