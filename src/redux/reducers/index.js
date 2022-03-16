import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import questionsReducer from './questionReducer';
import tokenReducer from './tokenReducer';
import counterReducer from './counterReducer';
import buttonReducer from './buttonReducer';

const rootReducer = combineReducers({
  user: loginReducer,
  token: tokenReducer,
  questions: questionsReducer,
  counter: counterReducer,
  button: buttonReducer,
});

export default rootReducer;
