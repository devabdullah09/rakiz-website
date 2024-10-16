import { Box, Card, CardMedia } from '@mui/material';
import React from 'react';

function GameCard({ src, title, price, discount }) {
  return (
    <Card
      style={{
        position: 'relative', // Allows positioning of the discount label
        width: '100%',
        maxWidth: '400px', // Sets a maximum width for larger screens
        margin: 'auto', // Centers the card on larger screens
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* Discount Label */}
      {discount > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '-50px',
            fontFamily: 'monospace',
            backgroundColor: 'red',
            width: '160px',
            color: 'white',
            textAlign: 'center',
            padding: '5px 20px',
            transform: 'rotate(-45deg)', // Rotates the label diagonally
            fontSize: '1rem',
            fontWeight: 'bold',
            zIndex: 10,
            pointerEvents: 'none', // Prevents interactions with the label
          }}
        >
          {discount} % OFF
        </div>
      )}
      <CardMedia
        component="img"
        image={src}
        alt={title}
        style={{
          width: '100%', // Ensures the image takes full width
          height: 'auto', // Maintains aspect ratio
        }}
      />
      <p
        style={{
          textAlign: 'center',
          fontFamily: 'Noto Kufi Arabic',
          fontSize: '1.2rem', // Base font size
          margin: '0.5rem 0',
        }}
      >
        {title}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
        }}
        className="flex justify-between p-1 sm:p-2 md:p-4 items-center"
      >
        <button
          style={{
            fontFamily: 'Noto Kufi Arabic',
          }}
          className="md:min-w-[100px] px-4 py-1 rounded-2xl font-bold text-base md:text-lg lg:text-xl mb-1 bg-[#faef47] text-black"
        >
          شراء
        </button>
        <div
          style={{
            fontFamily: 'Noto Kufi Arabic',
            margin: '0.5rem 0',
          }}
          className="flex items-end gap-1 md:gap-2"
        >
          <span className="text-base md:text-lg">د.ك</span>
          <span className="text-xl md:text-3xl">{price}</span>
        </div>
      </div>
    </Card>
  );
}

export default GameCard;
