import { fetchToken } from '../services/Api';

export const GET_TOKEN = 'GET_TOKEN';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getTokenAPI = () => async (dispatch) => {
  const response = await fetchToken();
  // localStorage.setItem('token', response.token);
  return dispatch(getToken(response));
};
