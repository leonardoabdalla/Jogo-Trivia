import { GET_BUTTON } from '../actions/index';

const INITIAL_STATE = {
  disableButton: false,
};

function buttonReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_BUTTON:
    return action.disableButton;
  default:
    return state;
  }
}
export default buttonReducer;
