import { combineReducers } from 'redux';

import header from './header';
import auth from './auth';
import signup from './signup';
import pricing from './pricing';

export default combineReducers({
  header,
  auth,
  signup,
  pricing
})
