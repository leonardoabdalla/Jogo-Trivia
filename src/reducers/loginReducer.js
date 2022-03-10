import { GET_TOKEN } from '../actions/index';

const INITIAL_STATE = {
  email: '',
  userName: '',
  token: '',
  isRedirect: false,
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return { ...state, payload: action.payload.token };
  default:
    return state;
  }
}
export default loginReducer;
