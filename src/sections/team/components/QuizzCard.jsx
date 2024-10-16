import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Get } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';

export const QuizzCard = ({ userCateogory, allCategories, game_name }) => {
  const navigate = useNavigate();
  const [team1Questions, setTeam1Questions] = useState([]);
  const [team2Questions, setTeam2Questions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [results, setResults] = useState([]);

  const getUserCategoryResults = useCallback(() => {
    try {
      Get(
        {},
        API_URLS.GET_USER_CATEGORY_RESULTS.replace(':userCategoryId', userCateogory.id),
        (resp) => {
          const temp = [];
          resp?.data?.map((res) => temp.push(res.gameId));
          setResults(temp);
        },
        (error) => {
          console.log('error', error);
        }
      );
    } catch (error) {}
  }, [userCateogory]);

  useEffect(() => {
    const category = userCateogory?.category;
    const sortedGames = category?.games?.sort((a, b) => a.score - b.score);
    const team1 = sortedGames.filter((_, index) => index % 2 !== 0).slice(0, 3);
    const team2 = sortedGames.filter((_, index) => index % 2 === 0).slice(0, 3);
    setTeam1Questions(team1);
    setTeam2Questions(team2);

    getUserCategoryResults();
  }, [userCateogory, getUserCategoryResults]);

  useEffect(() => {
    if (selectedQuestion) {
      navigate(`/question`, {
        state: {
          question: selectedQuestion,
          userCateogory: userCateogory,
          allCategories: allCategories,
          game_name: game_name,
        },
      });
    }

    return () => {
      setSelectedQuestion(null);
    };
  }, [selectedQuestion, navigate, userCateogory, allCategories, game_name]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'row' },
        alignItems: 'start',
        justifyContent: 'center',
        borderRadius: '10px',
        backgroundColor: '#fff',
        height: '100%',
        p: 0,
        m: 0,
      }}
    >
      {/* Team 1 Questions */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          gap: { xs: '1.5rem', md: '3rem' },
          flex: 1,
        }}
      >
        {team1Questions.map((question) => {
          const isDisabled = results.includes(question?.id);
          return (
            <Box
              key={question?.score}
              sx={{
                backgroundColor: isDisabled ? '#E0E0E0' : '#CCF1FF',
                width: { xs: '100%', md: '100%' },
                margin: '0px', // Remove margin to avoid gaps
                fontSize: { xs: '2rem', md: '2rem', lg: '3rem' },
                textAlign: 'center',
                color: '#000000',
                borderRadius: { xs: '30px 0 0 30px', md: '30px 0 0 30px', lg: '50px 0 0 50px' },
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                pointerEvents: isDisabled ? 'none' : 'auto',
                flex: 1,
                transition: 'width 0.3s, height 0.3s', // Smooth transition for width and height
              }}
              onClick={!isDisabled ? () => setSelectedQuestion(question) : null}
            >
              {question?.score}
            </Box>
          );
        })}
      </Box>

      {/* Image Box */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '30%', md: '30%' },
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
        >
          <img
            src={userCateogory?.category?.avatar}
            alt={userCateogory?.category.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <p
            style={{
              fontFamily: 'Noto Kufi Arabic',
              fontSize: '0.7rem',
              padding: '10px',
              backgroundColor: 'yellow',
              borderRadius: '10px',
              width: '80%',
              textAlign: 'center',
              margin: '0px', // Remove margin to avoid gaps
            }}
          >
            {userCateogory?.category?.name}
          </p>
        </div>
      </Box>

      {/* Team 2 Questions */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          gap: { xs: '1.5rem', md: '3rem' },
          flex: 1,
        }}
      >
        {team2Questions.map((question) => {
          const isDisabled = results.includes(question.id);
          return (
            <Box
              key={question.score}
              sx={{
                backgroundColor: isDisabled ? '#E0E0E0' : '#CCF1FF',
                width: '100%',
                margin: '0px', // Remove margin to avoid gaps
                // height: '70px', // Adjust height to make the score smaller
                fontSize: { xs: '2rem', md: '2rem', lg: '3rem' },
                textAlign: 'center',
                color: '#000000',
                borderRadius: { xs: '0 30px 30px 0', md: '0 30px 30px 0', lg: '0 50px 50px 0' },
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                pointerEvents: isDisabled ? 'none' : 'auto',
                flex: { xs: 1, md: 1 },
                transition: 'width 0.3s, height 0.3s', // Smooth transition for width and height
              }}
              onClick={!isDisabled ? () => setSelectedQuestion(question) : null}
            >
              {question.score}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
