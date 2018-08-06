import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

import OnboardingStep1 from '../containers/OnboardingStep1'
import SignupContainer from '../containers/SignupContainer'
import SignupStep2 from '../containers/SignupStep2'
// import SignupStep3 from '../containers/SignupStep3'
// import SignupStep4 from '../containers/SignupStep4'
import SignupStep5 from '../containers/SignupStep5'

class OnBoarding extends React.Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
    onboardingStep: PropTypes.number
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
    const { onboardingStep, location, history } = this.props

    let newPath
    if ( onboardingStep === 5 ){
      newPath = "/onboarding/thank-you";
    } else if ( onboardingStep === 1 ) {
      newPath = "/onboarding/hello";
    } else {
      newPath = "/onboarding/step-" + (onboardingStep - 1);
    }

    if ( location.pathname === newPath ){
      return
    }
    history.push(newPath)
  }

  render() {
    const { onboardingStep, match } = this.props

    const PropsRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        <Component onboardingStep={onboardingStep} {...props}/>
      )}/>
    )

    return (
      <div className="signup">
        <PropsRoute path={`${match.url}/:step`} component={OnBoardingSwitch} />
      </div>
    );
  }
}

class OnBoardingSwitch extends React.Component {
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
      // case 'step-2':
      //   return (
      //     <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
      //       <SignupStep3 onRef={ref => (this.child = ref)} />
      //     </SignupContainer>
      //   )
      // case 'step-3':
      //   return (
      //     <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
      //       <SignupStep4 onRef={ref => (this.child = ref)} />
      //     </SignupContainer>
      //   )
      case 'thank-you':
        return <SignupStep5 />
      case 'hello':
        return <OnboardingStep1 />
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
    onboardingStep: state.onboarding.onboardingStep
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
