import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS } from '../store/ActionTypes';

import SvgIcon from '../components/SvgIcon';
import {initialState} from '../reducers/signup';

class SignupStep5 extends Component {
  static propTypes = {
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

    this.props.setSignupFields(initialState.fields)

    // this.props.setSignupStep(1);
  }

  render(){
    const { signupComplete } = this.state;

    if (signupComplete) {
      return <Redirect to='/' />;
    }

    return(
      <div className="container">
        <div className="t-center">
          <h2 data-aos="fade-up">Thank you!</h2>
          <p className="t-paragraph" data-aos="fade-up" data-aos-delay="150">We’ll get in touch with you soon.</p>
          <div className="signup__sucess" data-aos="fade-up" data-aos-delay="300">

          </div>
          <div className="signup__nav signup__nav--complete" data-aos="fade-up" data-aos-delay="450">
            <a className="signup__nav-back" onClick={this.completeSignup}>
              <SvgIcon name="back-arrow" />
              <span>Go Back to the Homepage</span>
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
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep5);
