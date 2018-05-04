import * as types from '../constants/ActionTypes';

export function openMenu() {
  return {
    type: types.OPEN_MENU
  };
}

export function closeMenu() {
  return {
    type: types.CLOSE_MENU
  };
}
