import * as types from '../store/ActionTypes';

const initialState = {
  selectedPlan: 'General',
  slider: null,
  pricingOptions: [],
  pricingOptionsSub: []
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

    case types.ADD_PRICING_OPTION_SUB:
      return {
        ...state,
        pricingOptionsSub: [
          ...state.pricingOptionsSub,
          action.payload
        ]
      }
    case types.REMOVE_PRICING_OPTION_SUB:
      return {
        ...state,
        pricingOptionsSub: [
          ...state.pricingOptionsSub.slice(0, action.payload),
          ...state.pricingOptionsSub.slice(action.payload + 1)
        ]
      }
    case types.REMOVE_ALL_PRICING_OPTIONS_SUB:
      return {
        ...state,
        pricingOptionsSub: []
      }
    case types.SET_PRICING_SLIDER:
      return {
        ...state,
        slider: action.payload
      }

    default:
      return state;
  }
}

export default pricing;
