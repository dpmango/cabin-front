import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../services/Api';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS } from '../store/ActionTypes';

import SvgIcon from '../components/SvgIcon';

import FormInput from '../components/FormInput';

class SignupStep2 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func,
    signupId: PropTypes.number,
    signupEmail: PropTypes.string,
    signupFields: PropTypes.object,
  };

  constructor(props) {
    super();

    this.state = {
      first_name: props.signupFields.first_name,
      last_name:  props.signupFields.last_name,
      company_name:  props.signupFields.company_name,
      email: props.signupEmail,
      phone: props.signupFields.phone
    };

  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal})
  }

  nextStep = () => {
    const { first_name, last_name, company_name, email, phone } = this.state;
    // patch lead
    api
      .patch('signup_leads/' + this.props.signupId, {
        signup_lead: {
          first_name: first_name,
          last_name: last_name,
          company_name: company_name,
          email: email, // update only when redux is blank
          phone: phone,
        }
      })
      .then((res) => {
        this.props.setSignupStep(3);

        this.props.setSignupFields({
          ...this.props.signupFields,
          first_name: first_name,
          last_name: last_name,
          company_name: company_name,
          phone: phone,
        })
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  prevStep = () => {
    this.props.setSignupStep(1);
  }

  render(){
    const { first_name, last_name, company_name, email, phone } = this.state;

    return(
      <div className="container">
        <div className="signup__box">

          <div className="signup__progress">
            <div className="signup__progress-line">
              <div className="signup__progress-fill" style={{"width" : "25%"}}>
                <div className="signup__progress-name">Step 2</div>
              </div>
            </div>
          </div>
          <div className="signup__wrapper">
            <div className="signup__left">
              <div className="signup__avatar signup__avatar--small">
                <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
              </div>
              <h2>Tell us a little about yourself</h2>
            </div>
            <div className="signup__right">
              <div className="signup__form">
                <FormInput
                  name="first_name"
                  placeholder="First Name"
                  value={first_name}
                  onChangeHandler={this.handleChange}
                />
                <FormInput
                  name="last_name"
                  placeholder="Last Name"
                  value={last_name}
                  onChangeHandler={this.handleChange}
                />
                <FormInput
                  name="company_name"
                  placeholder="Company Name"
                  value={company_name}
                  onChangeHandler={this.handleChange}
                />
                <FormInput
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChangeHandler={this.handleChange}
                />
                <FormInput
                  name="phone"
                  placeholder="Phone Number"
                  value={phone}
                  mask={['+','6','5', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                  onChangeHandler={this.handleChange}
                />
              </div>
            </div>
          </div>

        </div>

        <div className="signup__nav">
          <a href="#" className="signup__nav-back" onClick={this.prevStep}>
            <SvgIcon name="back-arrow" />
            <span>Go Back</span>
          </a>

          <a href="#" className="btn btn--small" onClick={this.nextStep}>
            <span>Next</span>
          </a>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  signupEmail: state.signup.signupEmail,
  signupId: state.signup.signupId,
  signupFields: state.signup.fields
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep2);
