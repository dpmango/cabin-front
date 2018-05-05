import * as types from '../store/ActionTypes';

const initialState = {
  menuOpened: false,
  hamburgerActive: false
}

const header = (state = initialState, action) => {
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

export default header;
