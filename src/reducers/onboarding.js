import * as types from '../store/ActionTypes';
// import moment from 'moment';

export const initialState = {
  onboardingRandomId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
  // instead of gtm this might e used for server communication to store session
  onboardingStep: 1,
  onboardingId: '',
  fields: {
    company_uen: '',
    company_name: '',
    company_activity: '',
    company_addres: '',
    company_revenue: ''

  }
}

const onboarding = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_ONBOARDING_STEP:
      return {
        ...state,
        onboardingStep: action.payload,
      }
    case types.SET_ONBOARDING_ID:
      return {
        ...state,
        onboardingId: action.payload,
      }
    case types.SET_ONBOARDING_FIELDS:
      return {
        ...state,
        fields: action.payload
      }
    default:
      return state;
  }
}

export default onboarding;
