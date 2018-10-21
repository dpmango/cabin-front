import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

import OnboardingStep1 from '../containers/OnboardingIndividual/Step1'
import OnboardingContainer from '../containers/OnboardingIndividual/Container'
import OnboardingStep2 from '../containers/OnboardingIndividual/Step2';
import OnboardingStep3 from '../containers/OnboardingIndividual/Step3';
import OnboardingStep4 from '../containers/OnboardingIndividual/Step4';

import OnboardingThanks from '../containers/OnboardingIndividual/Thanks'

class OnBoardingIndividual extends React.Component {
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
      newPath = "/onboarding-individual/thank-you";
    } else if ( onboardingStep === 1 ) {
      newPath = "/onboarding-individual/hello";
    } else {
      newPath = "/onboarding-individual/step-" + (onboardingStep - 1);
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
    onboardingStep: state.onboardingIndividual.onboardingStep
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingIndividual);
