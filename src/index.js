import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Home from './pages/Home';
import Page from './pages/Page';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './css/app.css';

require('viewport-units-buggyfill').init({
  // force: true,
  refreshDebounceWait: 250
});

class Root extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:pagename" component={Page} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);


registerServiceWorker();
