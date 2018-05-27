import * as types from '../store/ActionTypes';

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

export function setClass(payload) {
  return {
    type: types.SET_HEADER_CLASS,
    payload: payload
  };
}
