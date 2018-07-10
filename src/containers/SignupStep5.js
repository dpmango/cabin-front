import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS, SET_SIGNUP_ID, SET_SIGNUP_EMAIL } from '../store/ActionTypes';

import SvgIcon from '../components/SvgIcon';
import {initialState} from '../reducers/signup';

class SignupStep5 extends Component {
  static propTypes = {
    setSignupId: PropTypes.func,
    setSignupEmail: PropTypes.func,
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      signupComplete: false
    };
  }

  completeSignup = () => {

    this.setState({
      signupComplete: true
    })

    // null all signup props (including id and email)
    this.props.setSignupId(initialState.signupId)
    this.props.setSignupEmail(initialState.signupEmail)
    this.props.setSignupFields(initialState.fields)

    // allow multiple registrations
    this.props.setSignupStep(1);
  }

  render(){
    const { signupComplete } = this.state;

    if (signupComplete) {
      return <Redirect to='/' />;
    }

    return(
      <div className="container">
        <div className="t-center" data-aos="fade">
          <h2>Thank you!</h2>
          <p className="t-paragraph">We will get in touch with you shortly.</p>
          <div className="signup__sucess">
            <SvgIcon name="signup-sucess" />
          </div>
          <div className="signup__nav signup__nav--complete">
            <a className="signup__nav-back" onClick={this.completeSignup}>
              <SvgIcon name="back-arrow" />
              <span>Back to homepage</span>
            </a>
          </div>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data }),
  setSignupEmail: (data) => dispatch({ type: SET_SIGNUP_EMAIL, payload: data }),
  setSignupId: (data) => dispatch({ type: SET_SIGNUP_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep5);
