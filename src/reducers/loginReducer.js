import { LOGIN } from '../actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
  assertions: 0,
  score: 0,
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  default:
    return state;
  }
}
export default loginReducer;
