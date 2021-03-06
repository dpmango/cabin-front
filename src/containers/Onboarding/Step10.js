import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import PhoneInput from 'react-phone-number-input'
import { isValidNumber } from 'libphonenumber-js';
import { onboardingApi } from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_AUTHTOKEN } from 'store/ActionTypes';
import Image from 'components/Image';
import FormInput from 'components/FormInput';
// import HelloSign from 'components/HelloSign';

class OnboardingStep9 extends Component {
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
      designation:  props.onboardingFields.designation,
      phone:  props.onboardingFields.phone,
      email: props.onboardingFields.email,
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

  helloSignSucess = () => {
    // TODO
  }

  helloSignFail = () => {
    // TODO
  }

  // logic
  nextStep = (refreshedToken) => {
    const {
      state: { name, designation, phone, email },
      props: { representativeId }
    } = this;

    const leadObj = {
      isproduction: isProduction(),
      isCompleated: true,
      name: name,
      designation: designation,
      phone: phone,
      email: email,
      representing_company: this.props.companyId
    }

    onboardingApi.defaults.headers['Authorization'] = 'JWT ' + ( refreshedToken ? refreshedToken : this.props.onboardingToken )

    // onboardingApi
    //   .patch('company/' + this.props.companyId, leadObj)
    //   .then(res => {
    //     console.log('Backend response to onboarding PATCH' , res)
    //     this.updateSignup()
    //   })
    //   .catch(err => {
    //     console.log(err.response); // todo update token ?
    //     if (err.response.status === 401){
    //       this.refreshToken();
    //     }
    //   });
    onboardingApi
      .patch(`user/${representativeId}`, leadObj)
        .then(res => {
          console.log('Backend response to user PATCH' , res)
          this.updateSignup()
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.status === 401){
            this.refreshToken();
          } else if (err.response.status === 400){ // bad data
            this.showBackendError(err.response.data)
          }
        })
  }

  refreshToken = () => {
    const token = this.props.urlToken
    if ( !token ) return

    onboardingApi.defaults.headers['Authorization'] = '' // clear before obtaining new JWT token

    onboardingApi
      .post('login-token', {"token": token})
      .then(res => {
        const respToken = res.data.token
        this.props.setOnboardingAuthToken(respToken);
        this.nextStep(respToken) // loop - if error, get token again. till its returning ok
      })
      .catch(err => {
        this.tokenInvalid(token, err.response);
        console.log('error on getting token', err.response);
      })
  }

  tokenInvalid = (token, err) => {
    console.log(token, 'invalid token');

    this.props.notify({
      title: 'Whoops! Error updating token',
      message: 'Error happens updating your authorization token. Please contact cabin',
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 2000,
    })
  }

  showBackendError = (data) => {
    const message = Object.keys(data).map(x => `${x} : ${data[x]}`)

    this.props.notify({
      title: `Whoops! Please fix following:`,
      message: message,
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 4000,
    })
  }

  updateSignup = () => {

    const { name, designation, phone, email } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        name: name,
        designation: designation,
        phone: phone,
        email: email
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
    const { name, designation, phone, email, isTransitioningNext, isFormSubmitted } = this.state;
    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>Confirm your information</h2>
        </div>
        <div className="signup__right">
          <div className="signup__note">I hereby confirm that all information provided is true, complete, and correct to my best knowledge, and further undertake to notify Cabin Pte. Ltd. promptly in writing upon any changes to the information provided. I am aware that I may be subjected to prosecution and criminal sanctions if I am are found to have made any reckless statements, false statements, statements which I do not believe to be true, or if I have intentionally suppressed any material facts.</div>
          <Formsy
            className="signup__form"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef}
          >
            <FormInput
              name="name"
              label="Name"
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
              name="designation"
              label="Designation"
              value={designation}
              validations="maxLength:16"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your designation',
                maxLength: 'Designation should be no longer 16 symbols'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <div className="ui-group">
              <label htmlFor="phone" className="ui-group__label">Phone Number</label>
              <div className={"ui-phone " + (isFormSubmitted ? phone ? (isValidNumber(phone) ? '' : 'has-error') : 'has-error' : undefined )}>
                <PhoneInput
              		// label="Phone Number"
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
              { /* <HelloSign
                onSucess={this.helloSignSucess}
                onFail={this.helloSignFail} /> */ }
            </div>
          </Formsy>
        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  onboardingFields: state.onboarding.fields,
  urlToken: state.onboarding.urlToken,
  onboardingToken: state.onboarding.authToken,
  companyId: state.onboarding.companyId,
  representativeId: state.onboarding.representative_id,
  onboardingStep: state.onboarding.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_FIELDS, payload: data }),
  setOnboardingAuthToken: (data) => dispatch({ type: SET_ONBOARDING_AUTHTOKEN, payload: data }),
  notify: (data) => dispatch(notify(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep9);
