import { combineReducers } from 'redux';

import header from './header';
import signup from './signup';
import pricing from './pricing';
import gtm from './gtm';

export default combineReducers({
  header,
  signup,
  pricing,
  gtm
})
