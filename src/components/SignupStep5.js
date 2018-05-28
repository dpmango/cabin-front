import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_SIGNUP_STEP } from '../store/ActionTypes';

import SvgIcon from '../components/SvgIcon';

class SignupStep5 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
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
          <h2>Thank you!</h2>
          <p className="t-paragraph">We’ll get in touch with you soon.</p>
          <div className="signup__sucess">

          </div>
          <div className="signup__nav signup__nav--complete">
            <a href="#" className="signup__nav-back" onClick={this.completeSignup}>
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
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep5);
