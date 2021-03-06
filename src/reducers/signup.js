import * as types from '../store/ActionTypes';
// import moment from 'moment';

export const initialState = {
  signupRandomId: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
  isAlt: null,
  signupStep: 1,
  signupEmail: '',
  signupId: '',
  fields: {
    first_name: '',
    last_name: '',
    company_name: '',
    phone: '',
    company_industry: '',
    company_old: '',
    company_employees: '',
    // date: moment(),
    selected_plan: '',
    meeting_date: '',
    meeting_time: '',
    meeting_date_local: '',
    meeting_time_local: '',
    email_instead: false
  }
}

const signup = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_SIGNUP_STEP:
      return {
        ...state,
        signupStep: action.payload,
      }
    case types.SET_SIGNUP_ID:
      return {
        ...state,
        signupId: action.payload,
      }
    case types.SET_SIGNUP_EMAIL:
      return {
        ...state,
        signupEmail: action.payload,
      }
    case types.SET_SIGNUP_FIELDS:
      return {
        ...state,
        fields: action.payload
      }
    case types.LOCK_SIGNUP_ALT:
      return {
        ...state,
        isAlt: action.payload
      }
    default:
      return state;
  }
}

export default signup;
