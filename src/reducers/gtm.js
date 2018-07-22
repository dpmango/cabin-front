import * as types from '../store/ActionTypes';

const initialState = {
  dataLayer: null
}

const gtm = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_DATALAYER:
      return {
        ...state,
        dataLayer: {
          ...state.dataLayer,
          ...action.data
        }
      };
    case types.RESET_DATALAYER:
      return {
        ...state,
        dataLayer: null
      };
    default:
      return state;
  }
}

// export const addToDataLayer = (data = {}) => {
//   return {
//     type: types.ADD_TO_DATALAYER,
//     data
//   };
// };
//
// export const pushToDataLayer = (data = {}) => (dispatch) => {
//   dispatch(addToDataLayer(data));
//   return dispatch({
//     type: types.PUSH_TO_DATALAYER
//   });
// };
//
// export const resetDataLayer = () => {
//   return {
//     type: types.RESET_DATALAYER
//   };
// };

export const getDataLayer = (state) => {
  return state.gtm.dataLayer;
};

export default gtm;
