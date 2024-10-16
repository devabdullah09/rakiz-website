import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Get } from 'src/actions';
import { API_URLS } from 'src/constants/API_URLS';

const Item = ({ userCateogory, game_name, allCategories }) => {
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
    <div className="item-container">
      <div>
        {team1Questions?.map((question) => {
          const isDisabled = results.includes(question?.id);
          return (
            <span
              key={question.score}
              style={{
                backgroundColor: isDisabled ? '#E0E0E0' : '#CCF1FF',
                color: '#000000',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                pointerEvents: isDisabled ? 'none' : 'auto',
                transition: 'width 0.3s, height 0.3s',
              }}
              className="font-medium text-base"
              onClick={!isDisabled ? () => setSelectedQuestion(question) : null}
            >
              {question.score}
            </span>
          );
        })}
      </div>
      <div className="h-full m-0 p-0 overflow-hidden">
        <img
          src={userCateogory?.category?.avatar}
          alt={userCateogory?.category?.name}
          className="h-full w-full object-fill"
        />
      </div>
      <div>
        {team2Questions?.map((question) => {
          const isDisabled = results.includes(question?.id);
          return (
            <span
              key={question.id}
              style={{
                backgroundColor: isDisabled ? '#E0E0E0' : '#CCF1FF',
                color: '#000000',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                pointerEvents: isDisabled ? 'none' : 'auto',
                transition: 'width 0.3s, height 0.3s',
              }}
              onClick={!isDisabled ? () => setSelectedQuestion(question) : null}
            >
              {question.score}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Item;
