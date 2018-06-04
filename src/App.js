import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
// import LoadingBar from 'react-redux-loading-bar'
// import AOS from 'aos';
// import 'aos/dist/aos.css';


class App extends React.Component {

  componentDidMount(){
    require('viewport-units-buggyfill').init({
      force: false,
      refreshDebounceWait: 150
    });

    require('svg4everybody');

    // this.aos = AOS
    // this.aos.init()
  }

  componentDidUpdate() {
    console.log('componenet updated')
    // this.aos.refresh()
  }

  render(){
    const renderSwitch = () => (
      <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            exact={route.isExact}
            path={route.path}
            component={route.component}
          />
        ))}
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
  }
};

export default App;
