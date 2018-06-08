import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './routes';

import Header from './components/Header';
import Footer from './components/Footer';

// import LoadingBar from 'react-redux-loading-bar'
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import svg4everybody from 'svg4everybody';


class App extends React.Component {

  componentDidMount(){
    require('viewport-units-buggyfill').init({
      force: false,
      refreshDebounceWait: 150
    });

    svg4everybody();
  }

  render(){
    return (
      <BrowserRouter>
        <div className="page">
          <Header routes={routes.filter(route => route.forNavBar)}/>
          <div className="page__content">
            <RenderSwitch />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
};

class RenderSwitch extends React.Component {
  componentDidMount(){
    // console.log('component mount')
    // this.aos = AOS
    // this.aos.init()
  }
  componentDidUpdate() {
    // console.log('componenet updated')

    // this.aos.refresh();
  }

  render(){
    return(
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
    )
  }
}

export default App;
