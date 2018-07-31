import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

import SignupStep1 from '../containers/SignupStep1'
import SignupContainer from '../containers/SignupContainer'
import SignupStep2 from '../containers/SignupStep2'
import SignupStep3 from '../containers/SignupStep3'
import SignupStep4 from '../containers/SignupStep4'
import SignupStep5 from '../containers/SignupStep5'

class GetStarted extends React.Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
    signupStep: PropTypes.number
  };

  componentDidMount(){
    this.updateURL();
    this.props.aosInst.refreshHard();
    this.props.setHeaderClass('header--logo-only');
  }

  componentDidUpdate(){
    this.updateURL();
    this.props.aosInst.refreshHard();
  }

  updateURL = () => {
    const { signupStep, location, history } = this.props

    let newPath
    if ( signupStep === 5 ){
      newPath = "/get-started/thank-you";
    } else if ( signupStep === 1 ) {
      newPath = "/get-started/hello";
    } else {
      newPath = "/get-started/step-" + (signupStep - 1);
    }

    if ( location.pathname === newPath ){
      return
    }
    history.push(newPath)
  }

  render() {
    const { signupStep, match } = this.props

    const PropsRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <Component signupStep={signupStep} {...props}/>
      )}/>
    )

    return (
      <div className="signup">
        <PropsRoute path={`${match.url}/:step`} component={GetStartedSwitch} />
        {/* <Route
          exact
          path={match.url}
          component={SignupStep1} // should it watch for redux state there?
        /> */}
      </div>
    );
  }
}

class GetStartedSwitch extends React.Component {
  nextStep = () => {
    this.child.submitForm();
  }

  prevStep = () => {
    this.child.prevStep();
  }

  renderStep = () => {
    const { match } = this.props;

    const stepParam = match.params.step;

    switch (stepParam) {
      case 'step-1':
        return (
          <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <SignupStep2 onRef={ref => (this.child = ref)} />
          </SignupContainer>
        )
      case 'step-2':
        return (
          <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <SignupStep3 onRef={ref => (this.child = ref)} />
          </SignupContainer>
        )
      case 'step-3':
        return (
          <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <SignupStep4 onRef={ref => (this.child = ref)} />
          </SignupContainer>
        )
      case 'thank-you':
        return <SignupStep5 />
      case 'hello':
        return <SignupStep1 />
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderStep()}
      </React.Fragment>
    );
  }

}

const mapStateToProps = (state) => (
  {
    signupStep: state.signup.signupStep
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted);
