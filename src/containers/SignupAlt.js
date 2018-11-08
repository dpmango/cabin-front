import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import PhoneInput from 'react-phone-number-input'
import { isValidNumber } from 'libphonenumber-js';
import {api} from 'services/Api';
import isProduction from 'services/isProduction';
import buildOptionsString from 'services/buildOptionsString';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS, SET_SIGNUP_ID, SET_SIGNUP_EMAIL } from 'store/ActionTypes';

// import SvgIcon from 'components/SvgIcon';
import FormInput from 'components/FormInput';

class SignupAlt extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func,
    // signupId: PropTypes.number,
    signupEmail: PropTypes.string,
    signupFields: PropTypes.object,
    setSignupId: PropTypes.func,
    setSignupEmail: PropTypes.func,
    pricingPlan: PropTypes.string,
    pricingOptions: PropTypes.array,
    pricingOptionsSub: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = {
      first_name: props.signupFields.first_name,
      last_name:  props.signupFields.last_name,
      company_name:  props.signupFields.company_name,
      email: props.signupEmail,
      phone: props.signupFields.phone,
      formIsValid: false,
      isFormSubmitted: false
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
    this.setState({isFormSubmitted: true})
    if ( this.state.formIsValid && isValidNumber(this.state.phone) ){
      this.nextStep();
      this.setState({isFormSubmitted: false}) // reset state here
    }
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      this.submitForm();
    }
  }

  nextStep = () => {
    const { first_name, last_name, company_name, email, phone } = this.state;

    let pricingOptionsStr = buildOptionsString(this.props.pricingOptions, this.props.pricingOptionsSub);
    const leadObj = {
      isproduction: isProduction(),
      first_name: "* (alt signup) - " + first_name, // TODO alt tag is stored in name for now
      last_name: last_name,
      company_name: company_name,
      email: email,
      phone: phone,
      pricing_plan: this.props.pricingPlan,
      pricing_options: pricingOptionsStr,
      ispending: false,
      isfollowup: false,
    }

    console.log(leadObj)

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

    const { first_name, last_name, company_name, phone } = this.state;

    this.props.setSignupStep(5); // how to redirect to thanks page

    this.props.setSignupFields({
      ...this.props.signupFields,
      first_name: first_name,
      last_name: last_name,
      company_name: company_name,
      // no email because it's outside signupFileds 1lvl top
      phone: phone,
    })

  }

  render(){
    const { first_name, last_name, company_name, email, phone, isFormSubmitted } = this.state;
    return(
      <div className="container">
        <div className="signup__box signup__box--alt" data-aos="fade">
          <div className="signup__wrapper">
            <div className="signup__left">
              <div className="signup__avatar signup__avatar--small">
                <img src={require('images/rifeng-avatar.png')} srcSet={require('images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
              </div>
              <h2>Hello!</h2>
              <p className="t-paragraph">My name is Rifeng and I am here to help you get started. Let us know how to reach you and we will be in touch shortly!</p>
              <i className="icon icon-rifeng-sign" />
            </div>
            <div className="signup__right">
              <Formsy
                className="signup__form"
                onSubmit={this.handleSubmit}
                onValid={this.formValid}
                onInvalid={this.formInvalid}
                ref={this.formRef}
              >
                <FormInput
                  name="first_name"
                  label="First Name"
                  value={first_name}
                  validations="minLength:1"
                  validationErrors={{
                    isDefaultRequiredValue: 'Please fill your first name',
                    minLength: 'Name is too short'
                  }}
                  onChangeHandler={this.handleChange}
                  onKeyHandler={this.keyPressHandler}
                  required
                />
                <FormInput
                  name="last_name"
                  label="Last Name"
                  value={last_name}
                  validations="minLength:1"
                  validationErrors={{
                    isDefaultRequiredValue: 'Please fill your last name',
                    minLength: 'Last name is too short'
                  }}
                  onChangeHandler={this.handleChange}
                  onKeyHandler={this.keyPressHandler}
                  required
                />
                <FormInput
                  name="company_name"
                  label="Company Name"
                  value={company_name}
                  onChangeHandler={this.handleChange}
                  onKeyHandler={this.keyPressHandler}
                  validationErrors={{
                    isDefaultRequiredValue: 'Please fill company name'
                  }}
                  required
                />
                <FormInput
                  name="email"
                  label="Email"
                  value={email}
                  validations="isEmail"
                  validationErrors={{
                    isEmail: "This is not a valid email",
                    isDefaultRequiredValue: 'Please fill email'
                  }}
                  onChangeHandler={this.handleChange}
                  onKeyHandler={this.keyPressHandler}
                  required
                />
                <div className="ui-group">
                  <label htmlFor="phone" className="ui-group__label">Phone Number</label>
                  <div className={"ui-phone " + (isFormSubmitted ? phone ? (isValidNumber(phone) ? '' : 'has-error') : 'has-error' : undefined )}>
                    <PhoneInput
                  		label="Phone Number"
                  		value={ phone }
                      country="SG"
                      displayInitialValueAsLocalNumber={true}
                  		onChange={ phone => this.setState({ phone }) }
                      onKeyPress={this.keyPressHandler}
                      indicateInvalid
                      error={ isFormSubmitted ? phone ? (isValidNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required' : undefined }
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn--huge btn--block">
                  <span>Submit</span>
                </button>

              </Formsy>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  signupEmail: state.signup.signupEmail,
  signupId: state.signup.signupId,
  signupFields: state.signup.fields,
  pricingPlan: state.pricing.selectedPlan,
  pricingOptions: state.pricing.pricingOptions,
  pricingOptionsSub: state.pricing.pricingOptionsSub
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data }),
  setSignupEmail: (data) => dispatch({ type: SET_SIGNUP_EMAIL, payload: data }),
  setSignupId: (data) => dispatch({ type: SET_SIGNUP_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupAlt);
