// localhost:5000 is the backend server URL. Change it to your backend server URL.
// const baseUrl = "http://localhost:5000";
// production URL
const baseUrl = 'https://api-rakiz.up.railway.app';

export const API_URLS = {
  // Auth APIs
  REGISTER: `${baseUrl}/auth/register`,
  LOGIN: `${baseUrl}/auth/login`,
  FORGET_PASSWORD: `${baseUrl}/auth/forgot-password`,
  UPDATE_USER: `${baseUrl}/auth/update-user`,
  GET_USER_BY_ID: `${baseUrl}/auth/user/:id`,

  // get categories
  GET_CATEGORIES: `${baseUrl}/categories/get-all`,

  // get games
  GET_GAMES: `${baseUrl}/game/get-all`,

  // user cantegories
  CREATE_USER_CATEGORIES: `${baseUrl}/user-categories/create`,
  GET_USER_CATEGORIES: `${baseUrl}/user-categories/get-all/:id`,
  GET_WINNER: `${baseUrl}/user-categories/get-winner/:id`,
  GET_SCORE: `${baseUrl}/user-categories/get-score/:userId/:team1_name/:team2_name`,

  GET_USER_CATEGORY_RESULTS: `${baseUrl}/result/get-all/:userCategoryId`,
  CREATE_USER_CATEGORY_RESULTS: `${baseUrl}/result/create`,
};  