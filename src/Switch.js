import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { routes } from './routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS, SET_SIGNUP_ID, SET_SIGNUP_EMAIL, RESET_DATALAYER } from './store/ActionTypes';
import {initialState} from './reducers/signup';

import ScrollTo from './services/ScrollTo';
// import LoadingBar from 'react-redux-loading-bar'
import AOS from 'aos';

class RenderSwitch extends React.Component {
  static propTypes = {
    setSignupId: PropTypes.func,
    setSignupEmail: PropTypes.func,
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func,
    resetDataLayer: PropTypes.func
  };

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
    const curPathSplit = this.props.location.pathname.split('/');
    const prevPathSplit = prevProps.location.pathname.split('/');

    // disallow transition when switching between the tabs
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (
        (curPathSplit[1] !== prevPathSplit[1] ) ||
        (curPathSplit[2] === "custom" || prevPathSplit[2] === "custom" ) ||
        (curPathSplit[2] === "monthly" || prevPathSplit[2] === "monthly" )
      ){
        ScrollTo(0, 300);
      }
    }

    // refresh AOS
    this.aos.refresh();

    // reset signup if thank you page reached
    if ( prevPathSplit[2] === "thank-you" ){
      this.resetSingup();
    }
  }

  resetSingup = () => {
    // null all signup props (including id and email)
    this.props.setSignupId(initialState.signupId)
    this.props.setSignupEmail(initialState.signupEmail)
    this.props.setSignupFields(initialState.fields)

    // allow multiple registrations
    this.props.setSignupStep(1);

    // reset gtm
    this.props.resetDataLayer();
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
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data }),
  setSignupEmail: (data) => dispatch({ type: SET_SIGNUP_EMAIL, payload: data }),
  setSignupId: (data) => dispatch({ type: SET_SIGNUP_ID, payload: data }),
  resetDataLayer: () => dispatch({ type: RESET_DATALAYER })
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RenderSwitch)
);
