import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import Home from './pages/Home';
import Page from './pages/Page';

import reducers from './reducers/index';
import registerServiceWorker from './registerServiceWorker';

import './css/app.css';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

require('viewport-units-buggyfill').init({
  // force: true,
  refreshDebounceWait: 250
});


class Root extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:pagename" component={Page} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);


registerServiceWorker();
