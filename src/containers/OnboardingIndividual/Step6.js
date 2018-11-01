import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
// import api from 'services/Api';
// import isProduction from 'services/isProduction';
import { SET_ONBOARDING_I_STEP, SET_ONBOARDING_I_FIELDS, SET_ONBOARDING_I_ID } from 'store/ActionTypes';
import Image from 'components/Image';
import CheckBox from 'components/CheckBox';

class OnboardingStep6 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    setOnboardingId: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isDirector: props.onboardingFields.isDirector,
      isShareholder: props.onboardingFields.isShareholder,
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
    // if ( this.state.formIsValid ){
      this.nextStep();
      this.setState({isFormSubmitted: false}) // reset state here
    // }
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  // checkbox
  toggleCheckbox = (name) => {
    this.setState({
      [name]: !this.state[name]
    })
  }

  nextStep = () => {
    // const { isDirector, isShareholder } = this.state;

    // const leadObj = {
    //   isproduction: isProduction(),
    //   isDirector: isDirector,
    //   isShareholder: isShareholder
    // }

    // update the api
    // api
    //   .patch('stakeholders/' + this.props.onboardingId, {
    //     stakeholder: leadObj
    //   })
    //   .then((res) => {
    //     console.log('Backend responce to onboarding PATCH' , res)
    //     this.updateSignup()
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    this.updateSignup()

  }

  updateSignup = () => {

    const { isDirector, isShareholder } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        isDirector: isDirector,
        isShareholder: isShareholder
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
    const { isDirector, isShareholder, isTransitioningNext } = this.state;

    return(
      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>Let us know in what capacity are you related to {"{{Company name}}"}</h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef} >
            <div className="signup__section-heading">Relationship with {"{{Company name}}"}</div>
            <div className="ui-group ui-group--no-margin">
              <div className="signup__checkboxes">
                <label htmlFor="">Select all that is applicable</label>
                <CheckBox
                  name="isDirector"
                  text="Director"
                  clickHandler={this.toggleCheckbox.bind(this, "isDirector")}
                  isActive={isDirector}
                />
                <CheckBox
                  name="isShareholder"
                  text="Shareholder"
                  clickHandler={this.toggleCheckbox.bind(this, "isShareholder")}
                  isActive={isShareholder}
                />
              </div>
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
  onboardingStep: state.onboardingIndividual.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_I_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_I_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_I_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep6);
