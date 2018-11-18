import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import PhoneInput from 'react-phone-number-input'
import { isValidNumber } from 'libphonenumber-js';
// import {api} from 'services/Api';
// import isProduction from 'services/isProduction';
import { SET_ONBOARDING_C_STEP, SET_ONBOARDING_C_FIELDS, SET_ONBOARDING_C_ID } from 'store/ActionTypes';
import Image from 'components/Image';
import FormInput from 'components/FormInput';

class OnboardingStep5 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    setOnboardingId: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      representative_name: props.onboardingFields.representative_name,
      representative_id: props.onboardingFields.representative_id,
      representative_phone: props.onboardingFields.representative_phone,
      representative_email: props.onboardingFields.representative_email,
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
    if ( this.state.formIsValid && isValidNumber(this.state.representative_phone) ){
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

  // logic
  nextStep = () => {
    this.updateSignup();

    // const { name, passport, birthday, nationality, email, phone, residentionalAdress } = this.state;
    //
    // const leadObj = {
    //   onboarding_id: 1, // TODO - get the id from url params (or from redux)
    //   stakeholder_id: this.props.onboardingRandomId, // TODO - what it's used for?
    //   isproduction: isProduction(),
    //   name: name,
    //   passport: passport,
    //   birthday: birthday, // TODO - convert calendar ?
    //   nationality: nationality,
    //   phone: phone,
    //   email: email,
    //   residentionalAdress: residentionalAdress
    // }
    //
    // // if onboarding ID is present - then update by PATCH
    // // else - create new
    // if ( this.props.onboardingId ){
    //   // patch lead
    //   api
    //     .patch('stakeholders/' + this.props.onboardingId, {
    //       stakeholder: leadObj
    //     })
    //     .then((res) => {
    //       console.log('Backend responce to stakeholder PATCH' , res)
    //       this.updateSignup()
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // } else {
    //   // create new instance
    //   console.log('creating new instance')
    //   api
    //     .post(`stakeholders`, {
    //       stakeholder: leadObj
    //     })
    //     .then((res) => {
    //       console.log('Backend responce to stakeholders POST' , res)
    //
    //       this.props.setOnboardingId(res.data.id);
    //       this.updateSignup();
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }

  }

  updateSignup = () => {

    const { representative_name, representative_id, representative_phone, representative_email } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        representative_name: representative_name,
        representative_id: representative_id,
        representative_phone: representative_phone,
        representative_email: representative_email
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
    const {
      representative_name,
      representative_id,
      representative_phone,
      representative_email,
      isTransitioningNext,
      isFormSubmitted
    } = this.state;

    return(
      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>We will need more information about the Corporate Representative for {"{{Company name}}"}</h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef} >
            <FormInput
              name="representative_name"
              label="Full name"
              value={representative_name}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Representative Full name',
                minLength: 'Representative Full name is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              name="representative_id"
              label="ID"
              value={representative_id}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Representative ID',
                minLength: 'Representative ID is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <div className="ui-group">
              <label htmlFor="phone" className="ui-group__label">Phone Number</label>
              <div className={"ui-phone " + (isFormSubmitted ? representative_phone ? (isValidNumber(representative_phone) ? '' : 'has-error') : 'has-error' : undefined )}>
                <PhoneInput
              		label="Phone Number"
              		value={ representative_phone }
                  country="SG"
                  displayInitialValueAsLocalNumber={true}
              		onChange={ representative_phone => this.setState({ representative_phone }) }
                  onKeyPress={this.keyPressHandler}
                  indicateInvalid
                  error={ isFormSubmitted ? representative_phone ? (isValidNumber(representative_phone) ? undefined : 'Invalid phone number') : 'Phone number required' : undefined }
                />
              </div>
            </div>
            <FormInput
              name="representative_email"
              label="Email"
              value={representative_email}
              validations="isEmail"
              validationErrors={{
                isEmail: "This is not a valid email",
                isDefaultRequiredValue: 'Please fill your Representative Email'
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
  onboardingFields: state.onboardingCorporate.fields,
  onboardingId: state.onboardingCorporate.onboardingId,
  onboardingRandomId: state.onboardingCorporate.onboardingRandomId,
  onboardingStep: state.onboardingCorporate.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_C_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_C_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_C_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep5);
