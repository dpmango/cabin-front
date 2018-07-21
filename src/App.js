import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import RenderSwitch from './Switch';

import GoogleTagManager from './components/GoogleTagManager';
import Header from './components/Header';
import Footer from './components/Footer';

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
          <GoogleTagManager gtmId='GTM-N6T8GZP' />
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

export default App;
