import * as types from '../constants/ActionTypes';

const initialState = {
  menuOpened: false,
  hamburgerActive: false
}

export default function header(state = initialState, action) {
  switch (action.type) {

    case types.OPEN_MENU:
      return {
        menuOpened: true,
        hamburgerActive: true
      }

    case types.CLOSE_MENU:
      return {
        menuOpened: false,
        hamburgerActive: false
      }

    default:
      return state;
  }
}
