import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

import SignupStep1 from '../containers/SignupStep1'
import SignupContainer from '../containers/SignupContainer'
import SignupStep2 from '../containers/SignupStep2'
import SignupStep3 from '../containers/SignupStep3'
import SignupStep4 from '../containers/SignupStep4'
// import SignupStep5 from '../containers/SignupStep5' // moved to separate page

class Profile extends React.Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
    signupStep: PropTypes.number
  };

  componentDidMount(){
    this.props.aosInst.refreshHard();
    this.props.setHeaderClass('header--logo-only');
  }

  componentDidUpdate(){
    this.props.aosInst.refreshHard();
  }

  nextStep = () => {
    this.child.submitForm();
  }

  prevStep = () => {
    this.child.prevStep();
  }

  renderStep = () => {
    const { signupStep } = this.props

    switch (signupStep) {
      case 1:
        return <SignupStep1 />
      case 2:
        return (
          <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <SignupStep2 onRef={ref => (this.child = ref)} />
          </SignupContainer>
        )
      case 3:
        return (
          <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <SignupStep3 onRef={ref => (this.child = ref)} />
          </SignupContainer>
        )
      case 4:
        return (
          <SignupContainer onPrev={this.prevStep} onNext={this.nextStep}>
            <SignupStep4 onRef={ref => (this.child = ref)} />
          </SignupContainer>
        )
      case 5:
        return <Redirect to='/get-started/thank-you' />
      default:
        return <SignupStep1 />
    }

  }
  render() {
    return (
      <div className="signup">
        <Helmet>
          <title>Cabin</title>
        </Helmet>

        {this.renderStep()}

      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
