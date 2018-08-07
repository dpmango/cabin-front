import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../services/Api';
import isProduction from '../services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_ID } from '../store/ActionTypes';
import Image from '../components/Image';
import FormInput from '../components/FormInput';

class OnboardingStep3 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    setOnboardingId: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      company_uen: props.onboardingFields.first_name,
      company_name:  props.onboardingFields.last_name,
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

  nextStep = () => {
    const { first_name, last_name, company_name, email, phone } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      first_name: first_name,
      last_name: last_name,
    }

    // if signup ID is present - then update by PATCH
    // else - create new
    // if ( this.props.signupId ){
    //   // patch lead
    //   api
    //     .patch('signup_leads/' + this.props.signupId, {
    //       signup_lead: leadObj
    //     })
    //     .then((res) => {
    //       this.updateSignup()
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // } else {
    //   // create new instance
    //   api
    //     .post(`signup_leads`, {
    //       signup_lead: leadObj
    //     })
    //     .then((res) => {
    //       this.props.setSignupId(res.data.id);
    //       this.props.setSignupEmail(res.data.email);
    //       this.updateSignup();
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }

    this.updateSignup();

  }

  updateSignup = () => {

    const { first_name, last_name } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        first_name: first_name,
        last_name: last_name,
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
    const { company_uen, company_name, isTransitioningNext } = this.state;
    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>Which company are you looking to appoint a company secretary for?</h2>
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
              name="company_uen"
              label="Company UEN"
              placeholder="Company UEN"
              value={company_uen}
              validations="minLength:9"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your company UEN',
                minLength: 'Company UEN is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              name="company_name"
              label="Company Name"
              placeholder="Company Name"
              value={company_name}
              validations="minLength:3"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your company name',
                minLength: 'Company name is too short'
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
  onboardingFields: state.onboarding.fields,
  onboardingStep: state.onboarding.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep3);
