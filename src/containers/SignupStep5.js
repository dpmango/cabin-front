import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import GoogleTagManager from '../components/GoogleTagManager';
import SvgIcon from '../components/SvgIcon';

class SignupStep5 extends Component {
  static propTypes = {
    signupId: PropTypes.number,
    signupEmail: PropTypes.string,
    signupFields: PropTypes.object,
    signupRandomId: PropTypes.string,
    pricingPlan: PropTypes.string
  }
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
    const { signupId, signupEmail, signupRandomId, signupFields, pricingPlan } = this.props;
    const { signupComplete } = this.state;

    if (signupComplete) {
      return <Redirect to='/' />;
    }

    const gtmEvent = {
      leadId: signupRandomId,
      lead: {
        id: signupId,
        first_name: signupFields.first_name,
        last_name: signupFields.last_name,
        company_name: signupFields.company_name,
        phone: signupFields.phone,
        email: signupEmail,
        company_industry: signupFields.company_industry,
        company_old: signupFields.company_old,
        company_employees: signupFields.company_employees,
        selected_plan: pricingPlan,
        meeting_date: signupFields.meeting_date,
        meeting_time: signupFields.meeting_time,
        email_instead: signupFields.email_instead
      }
    }

    return(
      <div className="container">
        <GoogleTagManager
          gtmId='GTM-N6T8GZP'
          dataLayerName="leadCaptured"
          additionalEvents={gtmEvent}
        />
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
  signupId: state.signup.signupId,
  signupEmail: state.signup.signupEmail,
  signupFields: state.signup.fields,
  signupRandomId: state.signup.signupRandomId,
  pricingPlan: state.pricing.selectedPlan
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep5);
