import { Card, CardMedia, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import React from 'react';

function CategoryCard({ avatar, title, icon, info, button_text, selected }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Media query for screens smaller than 600px

  return (
    <div
      className="relative cursor-pointer height-[310px] md:h-[350px] flex flex-col rounded-xl shadow-xl"
      style={{
        border: selected ? '2px solid blue' : 'none',
      }}
      // sx={{
      //   position: 'relative', // Position relative for the info icon
      //   border: selected ? '2px solid blue' : 'none',
      //   cursor: 'pointer',
      //   height: { xs: '200', sm: '300px', md: '400px' }, // Card height adjusted for screen size
      //   // width: { xs: '100', sm: '150px', md: '200px' }, // Card width adjusted for screen size

      //   display: 'flex',
      //   flexDirection: 'column',
      //   justifyContent: 'flex-start', // Adjusted to remove extra space
      //   boxSizing: 'border-box',
      //   borderRadius: '10px',
      // }}
    >
      <Tooltip
        title={info}
        arrow
        placement="top"
        sx={{
          fontFamily: 'Noto Kufi Arabic',
          fontSize: isSmallScreen ? '0.4rem' : '0.7rem',
          // background: '#6DCEF2',
          color: 'blue',
        }}
      >
        <IconButton
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            color: 'white', // You can adjust the color based on your theme
            // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight background to make it more visible
            borderRadius: '50%',
            zIndex: 1, // Ensure it's above the image
          }}
          onClick={() => {
            // Handle the info icon click event
          }}
        >
          <img
            src={icon}
            alt="info"
            style={{
              width: { xs: '18px', md: '24px' }, // Adjusted width for different screen sizes
              height: { xs: '18px', md: '24px' }, // Adjusted height for different screen sizes
            }}
          />
        </IconButton>
      </Tooltip>
      <div className="h-[240px] md:h-[280px]">
        <CardMedia
          component="img"
          className="h-full object-cover rounded-t-xl"
          // height={isSmallScreen ? '200px' : '400px'} // Image height adjusted for screen size
          image={avatar}
          alt="category"
          style={{
            objectFit: 'cover',
            marginBottom: '0', // Remove extra space below the image
          }}
        />
      </div>
      <div
        className="m-auto w-full px-1 h-[70px]"
        style={{
          display: 'flex',
          flexDirection: 'column',
          // padding: isSmallScreen ? '5px' : '8px', // Reduced padding
          // gap: '4px', // Reduced gap between elements
        }}
      >
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '4px', // Tightens the spacing between icon and title
          }}
        >
          <Tooltip
            title={info}
            arrow
            placement="top"
            style={{
              fontFamily: 'Noto Kufi Arabic',
              fontSize: isSmallScreen ? '0.4rem' : '0.7rem',
              background: '#6DCEF2',
              color: 'black',
            }}
          >
            <img
              src={icon}
              alt="icon"
              style={{
                objectFit: 'contain',
                width: isSmallScreen ? '18px' : '24px',
                height: isSmallScreen ? '18px' : '24px',
                borderRadius: '50%',
              }}
            />
          </Tooltip>
          <p
            style={{
              fontFamily: 'Noto Kufi Arabic',
              fontSize: isSmallScreen ? '0.4rem' : '0.7rem',
              margin: 0,
            }}
          >
            {title}
          </p>
        </div> */}
        <button
          style={{
            width: '100%',
            // maxWidth: '300px',
            margin: 'auto',
            backgroundColor: 'yellow',
            color: 'black',
            height: isSmallScreen ? '30px' : '40px', //
            // padding: isSmallScreen ? '6px' : '8px', // Reduced padding for a tighter look
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '0.9rem',
          }}
        >
          {button_text}
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
