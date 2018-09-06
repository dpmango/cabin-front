import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

import OnboardingStep1 from '../containers/Onboarding/OnboardingStep1'
import OnboardingContainer from '../containers/Onboarding/OnboardingContainer'
import OnboardingStep2 from '../containers/Onboarding/OnboardingStep2'
import OnboardingStep3 from '../containers/Onboarding/OnboardingStep3'
import OnboardingStep4 from '../containers/Onboarding/OnboardingStep4'
import OnboardingStep5 from '../containers/Onboarding/OnboardingStep5'
import OnboardingStep6 from '../containers/Onboarding/OnboardingStep6'
import OnboardingStep7 from '../containers/Onboarding/OnboardingStep7'
import OnboardingStep8 from '../containers/Onboarding/OnboardingStep8'
import OnboardingStep9 from '../containers/Onboarding/OnboardingStep9'
import OnboardingStep10 from '../containers/Onboarding/OnboardingStep10'
import OnboardingThanks from '../containers/Onboarding/OnboardingThanks'

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
    if ( onboardingStep === 11 ){
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
          <OnboardingContainer onPrev={this.prevStep} onNext={this.nextStep} noProgress={true}>
            <OnboardingStep2 onRef={ref => (this.child = ref)} />
          </OnboardingContainer>
        )
      case 'step-2':
        return (
          <OnboardingContainer onPrev={this.prevStep} onNext={this.nextStep} noProgress={true}>
            <OnboardingStep3 onRef={ref => (this.child = ref)} />
          </OnboardingContainer>
        )
      case 'step-3':
        return (
          <OnboardingContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <OnboardingStep4 onRef={ref => (this.child = ref)} />
          </OnboardingContainer>
        )
      case 'step-4':
        return (
          <OnboardingContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <OnboardingStep5 onRef={ref => (this.child = ref)} />
          </OnboardingContainer>
        )
      case 'step-5':
        return (
          <OnboardingContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <OnboardingStep6 onRef={ref => (this.child = ref)} />
          </OnboardingContainer>
        )
      case 'step-6':
        return (
          <OnboardingContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <OnboardingStep7 onRef={ref => (this.child = ref)} />
          </OnboardingContainer>
        )
      case 'step-7':
        return (
          <OnboardingContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <OnboardingStep8 onRef={ref => (this.child = ref)} />
          </OnboardingContainer>
        )
      case 'step-8':
        return (
          <OnboardingContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <OnboardingStep9 onRef={ref => (this.child = ref)} />
          </OnboardingContainer>
        )
      case 'step-9':
        return (
          <OnboardingContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <OnboardingStep10 onRef={ref => (this.child = ref)} />
          </OnboardingContainer>
        )
      case 'thank-you':
        return <OnboardingThanks />
      case 'hello':
        return <OnboardingStep1 />
      default:
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
