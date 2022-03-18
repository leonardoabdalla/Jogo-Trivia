import { COUNTER } from '../actions/index';

const INITIAL_STATE = 30;

function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case COUNTER:
    return state - 1;
  default:
    return state;
  }
}
export default counterReducer;
