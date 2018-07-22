import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ADD_TO_DATALAYER, RESET_DATALAYER } from '../store/ActionTypes';
// import GoogleTagManager from '../components/GoogleTagManager';
import SvgIcon from '../components/SvgIcon';

class SignupStep5 extends Component {
  static propTypes = {
    signupId: PropTypes.number,
    signupEmail: PropTypes.string,
    signupFields: PropTypes.object,
    signupRandomId: PropTypes.string,
    pricingPlan: PropTypes.string,
    resetDataLayer: PropTypes.func,
    addToDataLayer: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      signupComplete: false
    };
  }

  componentDidMount(){
    const { signupId, signupEmail, signupRandomId, signupFields, pricingPlan } = this.props;

    const gtmEvent = {
      event: 'gtm.getStartedCompleted',
      lead: {
        leadId: signupRandomId,
        leadFields: {
          id: signupId,
          first_name: signupFields.first_name,
          last_name: signupFields.last_name,
          company_name: signupFields.company_name,
          phone: signupFields.phone,
          email: signupEmail,
          company_industry: signupFields.company_industry.value,
          company_old: signupFields.company_old.value,
          company_employees: signupFields.company_employees.value,
          selected_plan: pricingPlan,
          meeting_date: signupFields.meeting_date_local,
          meeting_time: signupFields.meeting_time_local,
          email_instead: signupFields.email_instead
        }
      }
    }

    this.props.addToDataLayer(gtmEvent);
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
        {/* <GoogleTagManager
          gtmId='GTM-N6T8GZP'
          dataLayerName="leadCaptured"
          additionalEvents={gtmEvent}
        /> */}
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
  resetDataLayer: () => dispatch({ type: RESET_DATALAYER }),
  addToDataLayer: (data) => dispatch({ type: ADD_TO_DATALAYER, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep5);
