export const GET_TOKEN = 'GET_TOKEN';
export const LOGIN = 'LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCESS = 'REQUEST_TOKEN_SUCESS';
export const REQUEST_TOKEN_FAIL = 'REQUEST_TOKEN_FAIL';
export const COUNTER = 'COUNTER';
export const GET_BUTTON = 'GET_BUTTON';
export const SCORE = 'SCORE';
export const SET_COUNTER = 'SET_COUNTER';
export const ASSERTION = 'ASSERTION';

export const setAssertions = (assertions) => ({
  type: ASSERTION,
  assertions,
});

export const setCounter = (payload) => ({
  type: SET_COUNTER,
  payload,
});

export const getButton = (disableButton) => ({
  type: GET_BUTTON,
  disableButton,
});

export const getScore = (score) => ({
  type: SCORE,
  score,
});

export const getCounter = (counter) => ({
  type: COUNTER,
  counter,
});

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

const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

const getQuestionsFailed = (payload) => ({
  type: GET_QUESTIONS_FAILED,
  payload,
});

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const requestTokenFailed = (error) => ({
  type: REQUEST_TOKEN_FAIL,
  payload: error,
});

export const getQuestionsThunkApi = (token) => async (dispatch) => {
  try {
    dispatch(getQuestions());
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const results = await response.json();
    dispatch(getQuestionsSuccess(results));
  } catch (error) {
    dispatch(getQuestionsFailed(error));
  }
};

export const getTokenAPI = () => async (dispatch) => {
  try {
    dispatch(requestToken());
    const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await fetchApiToken.json();
    localStorage.setItem('token', result.token);
    dispatch(getQuestionsThunkApi(result.token));
    dispatch(getToken(result.token));
  } catch (error) {
    dispatch(requestTokenFailed(error));
  }
};
