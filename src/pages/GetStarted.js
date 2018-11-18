import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS, SET_FOOTER_CLASS, LOCK_SIGNUP_ALT } from 'store/ActionTypes';

// import SignupStep1 from 'containers/SignupStep1'
// import SignupContainer from 'containers/SignupContainer'
// import SignupStep2 from 'containers/SignupStep2'
// import SignupStep3 from 'containers/SignupStep3'
// import SignupStep4 from 'containers/SignupStep4'
import SignupStep5 from 'containers/SignupStep5'
import SignupAlt from 'containers/SignupAlt'

class GetStarted extends React.Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
    signupStep: PropTypes.number
  };

  componentDidMount(){
    this.updateURL();
    this.props.aosInst.refreshHard();
    this.props.setHeaderClass('header--logo-only');
    this.props.setFooterClass('footer--hide')
  }

  componentDidUpdate(){
    this.updateURL();
    this.props.aosInst.refreshHard();
  }

  // shouldRenderAlt = () => {
  //   // this.props.lockSignupAlt(false)
  //
  //   // A/B testing
  //   if ( Math.random() > .5 ){
  //     this.props.lockSignupAlt(true)
  //     return true
  //   } else {
  //     this.props.lockSignupAlt(false)
  //     return false
  //   }
  // }

  updateURL = () => {
    const { signupStep, location, history } = this.props

    // let isAlternative
    // if ( this.props.isAltSaved === null ){
    //   isAlternative = this.shouldRenderAlt(); // ask for random 50/50
    // } else {
    //   isAlternative = this.props.isAltSaved // or just compare the store
    // }
    //
    // let newPath
    // if ( isAlternative ){
    //   newPath = "/get-started/simple";
    // } else {
    //   if ( signupStep === 1 ) {
    //     newPath = "/get-started/hello";
    //   } else {
    //     newPath = "/get-started/step-" + (signupStep - 1);
    //   }
    // }
    //
    // // nevermind about the alt for thank you page
    // if ( signupStep === 5 ){
    //   newPath = "/get-started/thank-you";
    // }

    // simple only !
    let newPath
    newPath = "/get-started";

    if ( signupStep === 5 ){
      newPath = "/get-started/thank-you";
    }

    if ( location.pathname === newPath ){ return }
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
        <PropsRoute path={`${match.url}`} component={GetStartedSwitch} />
        {/* <PropsRoute path={`${match.url}/:step`} component={GetStartedSwitch} /> */}
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
    const { match, signupStep } = this.props;

    // const stepParam = match.params.step;

    // switch (stepParam) {
    //   case 'step-1':
    //     return (
    //       <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
    //         <SignupStep2 onRef={ref => (this.child = ref)} />
    //       </SignupContainer>
    //     )
    //   case 'step-2':
    //     return (
    //       <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
    //         <SignupStep3 onRef={ref => (this.child = ref)} />
    //       </SignupContainer>
    //     )
    //   case 'step-3':
    //     return (
    //       <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
    //         <SignupStep4 onRef={ref => (this.child = ref)} />
    //       </SignupContainer>
    //     )
    //   case 'thank-you':
    //     return <SignupStep5 />
    //   case 'simple':
    //     return <SignupAlt />
    //   case 'hello':
    //     return <SignupStep1 />
    //   default:
    //     return <SignupStep1 />
    // }

    // // A/B testing disabled
    switch (signupStep) {
      case 5:
        return <SignupStep5 />
      default:
        return <SignupAlt />
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
    signupStep: state.signup.signupStep,
    isAltSaved: state.signup.isAlt
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data }),
    setFooterClass: (data) => dispatch({ type: SET_FOOTER_CLASS, payload: data }),
    lockSignupAlt: (data) => dispatch({ type: LOCK_SIGNUP_ALT, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted);
