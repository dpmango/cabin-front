import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { ADD_TO_DATALAYER, RESET_DATALAYER } from 'store/ActionTypes';
// import GoogleTagManager from 'components/GoogleTagManager';
import SvgIcon from 'components/SvgIcon';

class OnboardingThanks extends Component {

  constructor() {
    super();
    this.state = {
      signupComplete: false
    };
  }

  componentDidMount(){

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
        <div className="signup__box" data-aos="fade">
          <div className="signup__sucess-container">
            <div className="signup-sucess__grid">
              <div className="signup-sucess__left">
                <div className="signup__sucess">
                  <SvgIcon name="signup-sucess" />
                </div>
              </div>
              <div className="signup-sucess__right">
                <h2>Thank you!</h2>
                <p className="t-paragraph">We will be verifying the information and will reach out if we require any additional information.</p>
                <p className="t-paragraph">Have a nice day!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="signup__nav signup__nav--centered">
          <a className="btn btn--small" onClick={this.completeSignup}>
            <span>Back to homepage</span>
          </a>
        </div>

      </div>
    )
  }
}

export default OnboardingThanks;
