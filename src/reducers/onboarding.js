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
    company_revenue: '',
    consumers_list: [
      {"id": "SG", "text": "Singapore"}
    ],
    suppliers_list: [],
    payments_to_list: [],
    payments_from_list: [],
    paidup_capital: [],
    company_relations: ["None"],
    company_relations_inputs: [
      // important! names should prefectly match checkboxes
      {
        name: "Subsidiary company of",
        value: ''
      },
      {
        name: "Parent company of",
        value: ''
      },
      {
        name: "Beneficiary company of",
        value: ''
      }
    ], // text fields for active checboxes
    paidup_capital_origins: [],
    shareholders_individulas: [],
    shareholders_corporate: [],
    other_beneficiaries: false,
    other_controllers: false,
    name: '',
    designation: '',
    phone: '',
    email: ''
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
