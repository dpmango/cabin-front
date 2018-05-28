import { combineReducers } from 'redux';

import header from './header';
import auth from './auth';
import signup from './signup';

export default combineReducers({
  header,
  auth,
  signup
})
