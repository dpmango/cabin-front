import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers/index';
import { loadState, saveState } from './localStorage';
import gtmMiddleware from './gtmMiddleware';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const initialState = loadState();

const logger = createLogger({
  collapsed: true
});

const createStoreWithMiddleware = compose(
  applyMiddleware(gtmMiddleware, thunk, logger)
)(createStore);

const store = createStoreWithMiddleware(reducers, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
