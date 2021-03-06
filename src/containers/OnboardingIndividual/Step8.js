import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import {api} from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_ONBOARDING_I_STEP, SET_ONBOARDING_I_FIELDS, SET_ONBOARDING_I_ID } from 'store/ActionTypes';
import Image from 'components/Image';
import FormInput from 'components/FormInput';
// import HelloSign from 'components/HelloSign';

class OnboardingStep8 extends Component {
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
      designation: props.onboardingFields.designation,
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

  helloSignSucess = () => {
    // TODO
  }

  helloSignFail = () => {
    // TODO
  }

  // logic
  nextStep = () => {
    const { name, designation } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      name: name,
      designation: designation
    }

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

  }

  updateSignup = () => {

    const { name, designation } = this.state;
    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        name: name,
        designation: designation,
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
    const { name, designation, isTransitioningNext } = this.state;
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
            ref={this.formRef} >
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
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Designation',
                minLength: 'Designation is too short'
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep8);
