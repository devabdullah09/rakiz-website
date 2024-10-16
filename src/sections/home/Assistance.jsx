import { Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { helpingData } from './constants';
import AssistanceCard from './AssistanceCard';
function Assistance() {
  return (
    <div
      className="bg-[#6DCEF2] px-4 py-10 md:m-4 rounded-xl"
      style={{
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'Noto Kufi Arabic',
          }}
          className="text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 font-medium text-center text-white"
        >
          وسائل المساعدة
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          {helpingData.map((data) => (
            <AssistanceCard
              description={data.description}
              title={data.title}
              icon={data.icon}
              bgColor={data?.bgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Assistance;
