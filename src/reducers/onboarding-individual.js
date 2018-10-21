import * as types from '../store/ActionTypes';
// import moment from 'moment';

export const initialState = {
  onboardingRandomId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
  // instead of gtm this might e used for server communication to store session
  onboardingStep: 1,
  onboardingId: '',
  fields: {
    name: "",
    passport: "",
    birthday: "",
    nationality: "",
    email: "",
    phone: "",
    residentionalAdress: "",
    upload_id: [],
    upload_passport: [],
    upload_address: [],
    isDirector: false,
    isShareholder: false,
    nomineeDirector: "No",
    agent: "No",
    grounds: "No",
    shareholderOnBehalf: "No",
    offence: "No",
    bankrupt: "No",
    pep: "No",
    designation: ""
  }
}

const onboardingIndividual = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_ONBOARDING_I_STEP:
      return {
        ...state,
        onboardingStep: action.payload,
      }
    case types.SET_ONBOARDING_I_ID:
      return {
        ...state,
        onboardingId: action.payload,
      }
    case types.SET_ONBOARDING_I_FIELDS:
      return {
        ...state,
        fields: action.payload
      }
    default:
      return state;
  }
}

export default onboardingIndividual;
