import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import questionsReducer from './questionReducer';
import tokenReducer from './tokenReducer';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  user: loginReducer,
  token: tokenReducer,
  questions: questionsReducer,
  counter: counterReducer,
});

export default rootReducer;
