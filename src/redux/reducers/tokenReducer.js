import { GET_TOKEN } from '../actions/index';

const INITIAL_STATE = {
  token: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return action.payload;
  default:
    return state;
  }
}
export default tokenReducer;
