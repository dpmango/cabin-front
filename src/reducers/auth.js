import * as types from '../store/ActionTypes';

const auth = (state = false, action) => {
  switch (action.type) {
    case types.AUTHORIZATION_SUCCESS:
      return { username: action.payload };
    case types.SIGN_OUT:
    case types.AUTHORIZATION_FAIL:
      return { errorMessage: action.payload };
    default:
      return state;
  }
};

export default auth;
