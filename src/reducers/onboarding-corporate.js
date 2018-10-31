import * as types from '../store/ActionTypes';
// import moment from 'moment';

export const initialState = {
  onboardingRandomId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
  // instead of gtm this might e used for server communication to store session
  onboardingStep: 1,
  onboardingId: '',
  fields: {
    company_name: '',
    compnay_number: '',
    company_address: '',
    representative_name: '',
    representative_id: '',
    representative_phone: '',
    representative_email: '',
    upload_registration: [],
    upload_certificate: [],
    agent: "No",
    grounds: "No",
    shareholderOnBehalf: "No",
    fraud: "No",
    liquidation: "No",
    pep: "No",
    name: "",
    designation: ""
  }
}

const onboardingCorporate = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_ONBOARDING_C_STEP:
      return {
        ...state,
        onboardingStep: action.payload,
      }
    case types.SET_ONBOARDING_C_ID:
      return {
        ...state,
        onboardingId: action.payload,
      }
    case types.SET_ONBOARDING_C_FIELDS:
      return {
        ...state,
        fields: action.payload
      }
    default:
      return state;
  }
}

export default onboardingCorporate;
