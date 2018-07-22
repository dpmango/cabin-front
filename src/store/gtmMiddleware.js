import * as types from './ActionTypes';
import { getDataLayer } from '../reducers/gtm'; //assuming this is the path to the reducer we just created

// the name of the container for GTM, usually 'dataLayer'
const DATA_LAYER_CONTAINER = 'dataLayer';

const _dataLayer = window[DATA_LAYER_CONTAINER] || [];

const _gtm = window.google_tag_manager ? window.google_tag_manager['GTM-N6T8GZP'] : null //replace with your container Id

export default ({ getState }) => {
  return (next) => (action) => {
    const returnValue = next(action);
    if (action.type === types.ADD_TO_DATALAYER) {
      _dataLayer.push(getDataLayer(getState()));
    } else if (action.type === types.RESET_DATALAYER) {
      if ( _gtm ){
        _gtm[DATA_LAYER_CONTAINER].reset();
      }
    }

    return returnValue;
  };
};
