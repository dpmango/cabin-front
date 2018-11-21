import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import { onboardingApi } from 'services/Api';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS, SET_FOOTER_CLASS, SET_ONBOARDING_AUTHTOKEN, SET_ONBOARDING_URLTOKEN, SET_ONBOARDING_COMPANY_ID, SET_ONBOARDING_REPRESENTATIVE_ID } from 'store/ActionTypes';
// import debounce from 'lodash/debounce';
import OnboardingStep1 from 'containers/Onboarding/Step1'
import OnboardingContainer from 'containers/Onboarding/Container'
import OnboardingStep2 from 'containers/Onboarding/Step2'
import OnboardingStep3 from 'containers/Onboarding/Step3'
import OnboardingStep4 from 'containers/Onboarding/Step4'
import OnboardingStep5 from 'containers/Onboarding/Step5'
import OnboardingStep6 from 'containers/Onboarding/Step6'
import OnboardingStep7 from 'containers/Onboarding/Step7'
import OnboardingStep8 from 'containers/Onboarding/Step8'
import OnboardingStep9 from 'containers/Onboarding/Step9'
import OnboardingStep10 from 'containers/Onboarding/Step10'
import OnboardingThanks from 'containers/Onboarding/Thanks'

class OnBoarding extends React.Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
    onboardingStep: PropTypes.number
  };

  componentDidMount(){
    this.updateURL();
    this.props.aosInst.refreshHard();
    this.props.setHeaderClass('header--logo-only');
    this.props.setFooterClass('')
  }

  componentDidUpdate(){
    this.updateURL();
    this.props.aosInst.refreshHard();
  }

  updateURL = () => {
    const { onboardingStep, onboardingToken, location, history } = this.props

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

    // check for token presence
    if ( !onboardingToken ){
      this.getToken(newPath);
      // return
    }

    history.push(newPath)
  }

  getToken = (newPath) => {
    const urlPlace = this.props.location.pathname.split('/')[2]
    const token =  urlPlace ? urlPlace.trim() : null
    // InNlcmdleSI:1gOGTO:ICh0zcftjCF2VGXomdvRKDj7V60.1gOGTO.azYvDSvp5auGT5CMjvDkFG6AWdw
    // InNpbmd0ZWwi:1gOMkN:RAwR-hZMbSKiS4aPHHzhKzlzYJ8.1gOMkN.oXtHtOGmZVWCElrJRm2sb0Rc8Q8

    if ( !token || token.lenght < 10){
      this.tokenInvalid(token, {status: 400});
      return
    }

    onboardingApi
      .post('login-token',
        {"token": token}
      )
      .then(res => {
        console.log('responce to login-token POST', res)
        const authToken = res.data.token
        const companyId = res.data.company_id
        const representative = res.data.representative_id

        this.props.setOnboardingUrlToken(token);
        this.props.setOnboardingAuthToken(authToken);
        this.props.setOnboardingCompanyId(companyId);
        this.props.setOnboardingRepresentativeId(representative);
      })
      .catch(err => {
        this.tokenInvalid(token, err.response)
        console.log(err.response);
      })
  }

  tokenInvalid = (token, err) => {
    console.log(token, 'invalid token', err);

    let ntfTitle, ntfText
    if ( err.status === 400 ){
      ntfTitle = 'Whoops! URL is invalid'
      ntfText = 'Onboarding URL seems to be invalid. Please contact cabin'
    }
    if ( err.status === 401 ){
      ntfTitle = 'Whoops! URL is experied'
      ntfText = 'Onboarding URL seems to be experied. Please contact cabin'
    }

    this.props.notify({
      title: ntfTitle,
      message: ntfText,
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 3000,
    })

    // this.props.history.push('/onboarding/')
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
        // return <OnboardingThanks />
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
    onboardingStep: state.onboarding.onboardingStep,
    onboardingToken: state.onboarding.authToken
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data }),
    setFooterClass: (data) => dispatch({ type: SET_FOOTER_CLASS, payload: data }),
    setOnboardingUrlToken: (data) => dispatch({ type: SET_ONBOARDING_URLTOKEN, payload: data }),
    setOnboardingAuthToken: (data) => dispatch({ type: SET_ONBOARDING_AUTHTOKEN, payload: data }),
    setOnboardingCompanyId: (data) => dispatch({ type: SET_ONBOARDING_COMPANY_ID, payload: data }),
    setOnboardingRepresentativeId: (data) => dispatch({ type: SET_ONBOARDING_REPRESENTATIVE_ID, payload: data }),
    notify: (data) => dispatch(notify(data))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
