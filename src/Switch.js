import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { routes } from './routes';

import ScrollTo from './services/ScrollTo';
// import LoadingBar from 'react-redux-loading-bar'
import AOS from 'aos';

class RenderSwitch extends React.Component {
  constructor(){
    super()
    this.aos = AOS
  }
  componentDidMount(){
    this.aos.init({
      duration: 400,
      offset: 0,
      easing: 'ease-in-sine',
      once: true
    })
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // disallow transition when switching between the tabs
      const curPathSplit = this.props.location.pathname.split('/');
      const prevPathSplit = prevProps.location.pathname.split('/');
      // console.log( curPathSplit[2] !== "custom", prevPathSplit[2] );
      if (
        (curPathSplit[1] !== prevPathSplit[1] )
      ){
        ScrollTo(0, 300);
      }
    }

    this.aos.refresh()
  }

  render(){
    const PropsRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <Component aosInst={this.aos} {...props}/>
      )}/>
    )

    return(
      <Switch>
        {routes.map(route => (
          <PropsRoute
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
