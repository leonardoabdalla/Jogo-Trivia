import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import questionsReducer from './questionReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  user: loginReducer,
  token: tokenReducer,
  questions: questionsReducer,
});

export default rootReducer;
