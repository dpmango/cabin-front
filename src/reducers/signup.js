import * as types from '../store/ActionTypes';

const initialState = {
  signupStep: 1
}

const signup = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_SIGNUP_STEP:
      return {
        signupStep: action.payload
      }

    default:
      return state;
  }
}

export default signup;
