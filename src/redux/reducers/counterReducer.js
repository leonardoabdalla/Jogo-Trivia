import { COUNTER } from '../actions/index';

const INITIAL_STATE = {
  counter: 0,
};

function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case COUNTER:
    return action.counter;
  default:
    return state;
  }
}
export default counterReducer;
