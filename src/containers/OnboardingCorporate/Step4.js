import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
// import {api} from 'services/Api';
// import isProduction from 'services/isProduction';
import { SET_ONBOARDING_C_STEP, SET_ONBOARDING_C_FIELDS, SET_ONBOARDING_C_ID } from 'store/ActionTypes';
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
      company_name: props.onboardingFields.company_name,
      compnay_number: props.onboardingFields.compnay_number,
      company_address:  props.onboardingFields.company_address,
      formIsValid: false,
      isTransitioningNext: false,
      // isFormSubmitted: false
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
    if ( this.state.formIsValid ){
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

    const { company_name, compnay_number, company_address } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        company_name: company_name,
        compnay_number: compnay_number,
        company_address: company_address
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
    const { company_name, compnay_number, company_address, isTransitioningNext } = this.state;
    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>We will need more information about your company</h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef} >
            <FormInput
              name="company_name"
              label="Company name"
              value={company_name}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Company name',
                minLength: 'Company name is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              name="compnay_number"
              label="Company registration number"
              value={compnay_number}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Company registration number',
                minLength: 'Company registration number is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              type="textarea"
              name="company_address"
              label="Company registered address"
              value={company_address}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Company registered address',
                minLength: 'Company registered address is too short'
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep4);
