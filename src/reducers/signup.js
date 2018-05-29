import * as types from '../store/ActionTypes';

const initialState = {
  signupStep: 1,
  signupEmail: '',
  signupId: ''
}

const signup = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_SIGNUP_STEP:
      return {
        ...state,
        signupStep: action.payload
      }
    case types.SET_SIGNUP_ID:
      return {
        ...state,
        signupId: action.payload
      }
    case types.SET_SIGNUP_EMAIL:
      return {
        ...state,
        signupEmail: action.payload
      }
    default:
      return state;
  }
}

export default signup;
