import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { routes } from './routes';

import ScrollTo from './services/ScrollTo';
// import LoadingBar from 'react-redux-loading-bar'
// import AOS from 'aos';
// import 'aos/dist/aos.css';

class RenderSwitch extends React.Component {
  componentDidMount(){
    // console.log('component mount')
    // this.aos = AOS
    // this.aos.init()
  }
  componentDidUpdate(prevProps) {
    // console.log('componenet updated')
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ScrollTo(0, 300)
    }

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

export default withRouter(RenderSwitch);
