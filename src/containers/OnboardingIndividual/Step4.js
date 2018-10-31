import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import PhoneInput from 'react-phone-number-input'
import { isValidNumber } from 'libphonenumber-js';
import api from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_ONBOARDING_I_STEP, SET_ONBOARDING_I_FIELDS, SET_ONBOARDING_I_ID } from 'store/ActionTypes';
import Image from 'components/Image';
import FormInput from 'components/FormInput';

class OnboardingStep4 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    setOnboardingId: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: props.onboardingFields.name,
      passport: props.onboardingFields.passport,
      birthday:  props.onboardingFields.birthday,
      nationality: props.onboardingFields.nationality,
      email: props.onboardingFields.email,
      phone:  props.onboardingFields.phone,
      residentionalAdress: props.onboardingFields.residentionalAdress,
      formIsValid: false,
      isTransitioningNext: false,
      isFormSubmitted: false
    };

    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
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
    if ( this.state.formIsValid && isValidNumber(this.state.phone)){
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

  helloSignSucess = () => {
    // TODO
  }

  helloSignFail = () => {
    // TODO
  }

  // logic
  nextStep = () => {
    const { name, passport, birthday, nationality, email, phone, residentionalAdress } = this.state;

    const leadObj = {
      onboarding_id: 1, // TODO - get the id from url params (or from redux)
      stakeholder_id: this.props.onboardingRandomId, // TODO - what it's used for?
      isproduction: isProduction(),
      name: name,
      passport: passport,
      birthday: birthday, // TODO - convert calendar ?
      nationality: nationality,
      phone: phone,
      email: email,
      residentionalAdress: residentionalAdress
    }

    // if onboarding ID is present - then update by PATCH
    // else - create new
    if ( this.props.onboardingId ){
      // patch lead
      api
        .patch('stakeholders/' + this.props.onboardingId, {
          stakeholder: leadObj
        })
        .then((res) => {
          console.log('Backend responce to stakeholder PATCH' , res)
          this.updateSignup()
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // create new instance
      console.log('creating new instance')
      api
        .post(`stakeholders`, {
          stakeholder: leadObj
        })
        .then((res) => {
          console.log('Backend responce to stakeholders POST' , res)

          this.props.setOnboardingId(res.data.id);
          this.updateSignup();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  updateSignup = () => {

    const { name, passport, birthday, nationality, phone, email, residentionalAdress } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        name: name,
        passport: passport,
        birthday: birthday, // calendar ?
        nationality: nationality,
        phone: phone,
        email: email,
        residentionalAdress: residentionalAdress
      })

      this.setState({ isTransitioningNext: false })

    }, 400)

  }

  prevStep = () => {
    this.props.setOnboardingStep(
      this.props.onboardingStep - 1
    );
  }

  render(){
    const { name, passport, birthday, nationality, phone, email, residentionalAdress, isTransitioningNext, isFormSubmitted } = this.state;
    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>We will need your personal information</h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef} >
            <FormInput
              name="name"
              label="Full Name"
              value={name}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your name',
                minLength: 'Name is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              name="passport"
              label="ID or passport number"
              value={passport}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your ID or passport number',
                minLength: 'ID or passport number is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              name="birthday"
              label="Date of birth"
              value={birthday}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Date of birth',
                minLength: 'Date of birth is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              name="nationality"
              label="Nationality"
              value={nationality}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Nationality',
                minLength: 'Nationality is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
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
            <FormInput
              type="textarea"
              name="residentionalAdress"
              label="Residential address"
              value={residentionalAdress}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Residential address',
                minLength: 'Residential address is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
          </Formsy>
        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  onboardingFields: state.onboardingIndividual.fields,
  onboardingId: state.onboardingIndividual.onboardingId,
  onboardingRandomId: state.onboardingIndividual.onboardingRandomId,
  onboardingStep: state.onboardingIndividual.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_I_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_I_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_I_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep4);
