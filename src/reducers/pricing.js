import * as types from '../store/ActionTypes';

const initialState = {
  selectedPlan: '',
  pricingOptions: []
}

const pricing = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_PRICING_PLAN:
      return {
        ...state,
        selectedPlan: action.payload,
      }

    case types.ADD_PRICING_OPTION:
      return {
        ...state,
        pricingOptions: [
          ...state.pricingOptions,
          action.payload
        ]
      }
    case types.REMOVE_PRICING_OPTION:
      return {
        ...state,
        pricingOptions: [
          ...state.pricingOptions.slice(0, action.payload),
          ...state.pricingOptions.slice(action.payload + 1)
        ]
        // pricingOptions: state.pricingOptions.filter(item => item !== action.payload),
      }

    default:
      return state;
  }
}

export default pricing;
