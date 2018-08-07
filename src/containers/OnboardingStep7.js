import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../services/Api';
import isProduction from '../services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_ID } from '../store/ActionTypes';
import Image from '../components/Image';
import FormInput from '../components/FormInput';

class OnboardingStep7 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    setOnboardingId: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      company_activity: props.onboardingFields.company_activity,
      company_addres:  props.onboardingFields.company_addres,
      company_revenue:  props.onboardingFields.company_revenue,
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
    const { company_activity, company_addres, company_revenue } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      company_activity: company_activity,
      company_addres: company_addres,
      company_revenue: company_revenue
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

    const { company_activity, company_addres, company_revenue } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        company_activity: company_activity,
        company_addres: company_addres,
        company_revenue: company_revenue
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
    const { company_activity, company_addres, company_revenue, isTransitioningNext } = this.state;
    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>We will need to know a little more about the company</h2>
          <div className="signup__info">As part of MAS’s anti-money laundering and anti-terrorism financing measures, ACRA instituted an Enhanced Regulatory Framework that took effect on 15th May 2015. We are therefore required by law to conduct a set of Customer Due Diligence (CDD) procedures before we can provide any form of corporate service to our customers (also known as Know Your Customer or Customer Acceptance procedures).</div>
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
              name="company_activity"
              placeholder="Primary business activity"
              value={company_activity}
              validations="minLength:3"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Primary business activity',
                minLength: 'Primary business activity is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              type="textarea"
              rows="3"
              tooltipContent="This can be different from your business registered address which is the address that is registered with ACRA"
              name="company_addres"
              placeholder="Address of operating premise"
              value={company_addres}
              validations="minLength:3"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Address of operating premise',
                minLength: 'Address of operating premise is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              name="company_revenue"
              tooltipContent="some tooltip content"
              placeholder="Estimated annual revenue"
              value={company_revenue}
              validations="minLength:3"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Estimated annual revenue',
                minLength: 'Estimated annual revenue premise is too short'
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep7);
