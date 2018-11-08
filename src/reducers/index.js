import { combineReducers } from 'redux';
import {reducer as notificationsReducer} from 'reapop';

import header from './header';
import footer from './footer';
import signup from './signup';
import onboarding from './onboarding';
import onboardingIndividual from './onboarding-individual';
import onboardingCorporate from './onboarding-corporate';
import pricing from './pricing';
import gtm from './gtm';

export default combineReducers({
  header,
  footer,
  signup,
  onboarding,
  onboardingIndividual,
  onboardingCorporate,
  pricing,
  notifications: notificationsReducer(),
  gtm
})
