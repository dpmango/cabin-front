import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './css/app.css';
// import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}



// registerServiceWorker();
