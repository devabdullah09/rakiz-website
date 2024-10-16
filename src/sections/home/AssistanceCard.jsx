import { Card, CardContent } from '@mui/material';
import React from 'react';

function AssistanceCard({ title, description, icon, bgColor }) {
  return (
    <Card
      sx={{
        backgroundColor: bgColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', // Add space between content
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
        width: {
          xs: '100%', // Full width on extra-small screens
          sm: '100%', // 90% width on small screens and above
          md: '100%', // 80% width on medium screens and above
        },
        height: {
          xs: 'auto', // Auto height for smaller screens
          sm: '100%', // Fixed height for larger screens to ensure equal height
        },
        maxWidth: 400, // Maximum width for larger screens
        boxSizing: 'border-box',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between', // Distribute space evenly
          height: '100%',
          fontFamily: 'Noto Kufi Arabic',
          textAlign: 'center',
          gap: 2, // Add gap between elements
        }}
      >
        <h5
          style={{
            fontFamily: 'Noto Kufi Arabic',
            margin: 0,
          }}
          className="text-2xl xl:text-3xl font-bold text-center text-black"
        >
          {title}
        </h5>
        <p style={{ margin: '10px 0' }} className="text-base text-center text-black">
          {description}
        </p>
        <img src={icon} alt={title} height="80px" width="80px" />
        <button
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          تستخدمها بعد ماتشوف السؤال
        </button>
      </CardContent>
    </Card>
  );
}

export default AssistanceCard;
