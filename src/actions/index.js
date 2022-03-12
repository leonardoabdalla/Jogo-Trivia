import { fetchToken, fetchQuestions } from '../services/Api';

export const GET_TOKEN = 'GET_TOKEN';
export const LOGIN = 'LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getLogin = (email, name) => ({
  type: LOGIN,
  payload: {
    email,
    name,
  },
});

export const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  payload: questions,
});

export const getTokenAPI = () => async (dispatch) => {
  const token = await fetchToken();
  const keyToken = token.token;
  localStorage.setItem('token', keyToken);
  return dispatch(getToken(token));
};

export const getQuestionsApi = () => async (dispatch) => {
  const questions = await fetchQuestions();
  return dispatch(getQuestions(questions));
};
