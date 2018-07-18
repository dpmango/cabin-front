import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SvgIcon from '../components/SvgIcon';

class SignupStep5 extends Component {
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

    // nulling props happens in switch.js
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


export default SignupStep5;
