import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import { ADD_TO_DATALAYER, RESET_DATALAYER } from '../store/ActionTypes';
// import GoogleTagManager from '../components/GoogleTagManager';
import SvgIcon from '../components/SvgIcon';

class OnboardingThanks extends Component {
  static propTypes = {

  }

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
            <div className="signup__sucess">
              <SvgIcon name="signup-sucess" />
            </div>
            <h2>Thank you!</h2>
            <p className="t-paragraph">We will get in touch with you shortly.</p>
            <div className="signup__nav signup__nav--complete">
              <a className="btn btn--small" onClick={this.completeSignup}>
                <span>Back to homepage</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  signupId: state.signup.signupId,
  signupEmail: state.signup.signupEmail,
  signupFields: state.signup.fields,
  signupRandomId: state.signup.signupRandomId,
  pricingPlan: state.pricing.selectedPlan
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingThanks);
