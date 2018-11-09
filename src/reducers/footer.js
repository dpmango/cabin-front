import * as types from '../store/ActionTypes';

const initialState = {
  stateClass: ''
}

const footer = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_FOOTER_CLASS:
      return {
        ...state,
        stateClass: action.payload
      }

    default:
      return state;
  }
}

export default footer;
