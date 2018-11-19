import * as types from '../store/ActionTypes';
// import moment from 'moment';

export const initialState = {
  onboardingRandomId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
  // instead of gtm this might e used for server communication to store session
  onboardingStep: 1,
  urlToken: '',
  authToken: '',
  companyId: '',
  managers: {
    secretary: {
      name: '',
      image_url: ''
    },
    executive: {
      name: '',
      image_url: ''
    }
  },
  fields: {
    company_uen: '',
    company_name: '',
    company_activity: '',
    company_addres: '',
    company_revenue: '',
    consumers_list: [
      // {"id": "SG", "text": "Singapore"}
    ],
    suppliers_list: [],
    payments_to_list: [],
    payments_from_list: [],
    paidup_capital: [],
    paidup_capital_inputs: [
      {
        name: 'Others',
        value: ''
      }
    ],
    company_relations: ["None"],
    company_relations_inputs: [
      // important! names should prefectly match checkboxes
      {
        name: "Subsidiary (or beneficiary) company of",
        value: ''
      },
      {
        name: "Parent (or benefactor) company of",
        value: ''
      },
      {
        name: 'Others',
        value: ''
      }
    ], // text fields for active checboxes
    paidup_capital_origins: [],
    haveShareholders: null,
    shareholders_individulas: [],
    shareholders_corporate: [],
    corporate_shareholders_backend: [],
    other_beneficiaries: false,
    other_controllers: false,
    other_beneficiaries_input: "",
    other_controllers_input: "",
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
    case types.SET_ONBOARDING_FIELDS:
      return {
        ...state,
        fields: action.payload
      }
    case types.SET_ONBOARDING_URLTOKEN:
      return {
        ...state,
        urlToken: action.payload
      }
    case types.SET_ONBOARDING_AUTHTOKEN:
      return {
        ...state,
        authToken: action.payload
      }
    case types.SET_ONBOARDING_COMPANY_ID:
      return {
        ...state,
        companyId: action.payload
      }
    case types.SET_ONBOARDING_MANAGERS:
      return {
        ...state,
        managers: action.payload
      }
    default:
      return state;
  }
}

export default onboarding;
