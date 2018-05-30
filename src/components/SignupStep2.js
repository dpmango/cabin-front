import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../services/Api';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS, SET_SIGNUP_ID, SET_SIGNUP_EMAIL } from '../store/ActionTypes';

import SvgIcon from '../components/SvgIcon';
import FormInput from '../components/FormInput';

class SignupStep2 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func,
    signupId: PropTypes.number,
    signupEmail: PropTypes.string,
    signupFields: PropTypes.object,
    setSignupId: PropTypes.func,
    setSignupEmail: PropTypes.func
  };

  constructor(props) {
    super();

    this.state = {
      first_name: props.signupFields.first_name,
      last_name:  props.signupFields.last_name,
      company_name:  props.signupFields.company_name,
      email: props.signupEmail,
      phone: props.signupFields.phone,
      formIsValid: false
    };

    this.formRef = React.createRef();
  }

  formInvalid = () => {
    this.setState({ formIsValid: false });
  }

  formValid = () => {
    this.setState({ formIsValid: true });
  }

  // submit handler from the form
  handleSubmit = (e) => {
    if ( this.state.formIsValid ){
      this.nextStep();
    }
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal})
  }

  nextStep = () => {
    const { first_name, last_name, company_name, email, phone } = this.state;
    const leadObj = {
      first_name: first_name,
      last_name: last_name,
      company_name: company_name,
      email: email,
      phone: phone,
    }

    // if signup ID is present - then update by PATCH
    // else - create new
    if ( this.props.signupId ){
      // patch lead
      api
        .patch('signup_leads/' + this.props.signupId, {
          signup_lead: leadObj
        })
        .then((res) => {
          this.updateSignup()
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // create new instance
      api
        .post(`signup_leads`, {
          signup_lead: leadObj
        })
        .then((res) => {
          this.props.setSignupId(res.data.id);
          this.props.setSignupEmail(res.data.email);
          this.updateSignup();
        })
        .catch(function (error) {
          console.log(error);
        });
    }


  }

  updateSignup = () => {

    const { first_name, last_name, company_name, email, phone } = this.state;

    this.props.setSignupStep(3);

    this.props.setSignupFields({
      ...this.props.signupFields,
      first_name: first_name,
      last_name: last_name,
      company_name: company_name,
      // no email because it's outside signupFileds 1lvl top
      phone: phone,
    })
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
              <Formsy
                className="signup__form"
                onValidSubmit={this.submit}
                onValid={this.formValid}
                onInvalid={this.formInvalid}
                ref={this.formRef}
              >
                <FormInput
                  name="first_name"
                  placeholder="First Name"
                  value={first_name}
                  validations="minLength:3"
                  validationErrors={{
                    isDefaultRequiredValue: 'Please fill your first name',
                    minLength: 'Name is too short'
                  }}
                  onChangeHandler={this.handleChange}
                  required
                />
                <FormInput
                  name="last_name"
                  placeholder="Last Name"
                  value={last_name}
                  validations="minLength:3"
                  validationErrors={{
                    isDefaultRequiredValue: 'Please fill your last name',
                    minLength: 'Last name is too short'
                  }}
                  onChangeHandler={this.handleChange}
                  required
                />
                <FormInput
                  name="company_name"
                  placeholder="Company Name"
                  value={company_name}
                  onChangeHandler={this.handleChange}
                  validationErrors={{
                    isDefaultRequiredValue: 'Please fill company name'
                  }}
                  required
                />
                <FormInput
                  name="email"
                  placeholder="Email"
                  value={email}
                  validations="isEmail"
                  validationErrors={{
                    isEmail: "This is not a valid email",
                    isDefaultRequiredValue: 'Please fill email'
                  }}
                  onChangeHandler={this.handleChange}
                  required
                />
                <FormInput
                  name="phone"
                  placeholder="Phone Number"
                  value={phone}
                  mask={['+','6','5', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                  onChangeHandler={this.handleChange}
                  validations={{
                    matchRegexp: /\+65 \d{4} \d{4}/
                  }}
                  validationErrors={{
                    matchRegexp: "Phone number is not valid",
                    isDefaultRequiredValue: 'Please fill phone'
                  }}
                  required
                />
              </Formsy>
            </div>
          </div>

        </div>

        <div className="signup__nav">
          <a href="#" className="signup__nav-back" onClick={this.prevStep}>
            <SvgIcon name="back-arrow" />
            <span>Go Back</span>
          </a>

          <a href="#" className="btn btn--small" onClick={this.submitForm}>
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
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data }),
  setSignupEmail: (data) => dispatch({ type: SET_SIGNUP_EMAIL, payload: data }),
  setSignupId: (data) => dispatch({ type: SET_SIGNUP_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep2);
