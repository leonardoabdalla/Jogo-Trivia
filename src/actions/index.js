import { fetchToken } from '../services/Api';

export const GET_TOKEN = 'GET_TOKEN';
export const LOGIN = 'LOGIN';

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

export const getTokenAPI = () => async (dispatch) => {
  const token = await fetchToken();
  return dispatch(getToken(token));
};
