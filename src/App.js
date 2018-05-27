import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import Header from './components/header';
import Footer from './components/footer';
import Authorization from './hoc/authorization';

require('viewport-units-buggyfill').init({
  force: false,
  refreshDebounceWait: 250
});

const App = () => {
  const renderSwitch = () => (
    <Switch>
      {routes.map(route => {
        const component = route.isPrivate ? Authorization(route.component) : route.component;
        return (
          <Route
            key={route.path}
            exact={route.isExact}
            path={route.path}
            component={component}
          />
        );
      })}
    </Switch>
  );

  return (
    <BrowserRouter>
      <React.Fragment>
        <div className="page">
          <Header routes={routes.filter(route => route.forNavBar)}/>
          <div className="page__content">
            {renderSwitch()}
          </div>
          <Footer />
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
