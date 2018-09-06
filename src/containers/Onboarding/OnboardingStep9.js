import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../../services/Api';
import isProduction from '../../services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_ID } from '../../store/ActionTypes';
import Image from '../../components/Image';
import { Tooltip } from 'react-tippy';
import CheckBox from '../../components/CheckBox';
import SvgIcon from '../../components/SvgIcon';

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
      other_beneficiaries: props.onboardingFields.other_beneficiaries,
      other_controllers:  props.onboardingFields.other_controllers,
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

  chooseOption = (name, value) => {
    // just as a toggler true/false
    this.setState({...this.state,
      [name]: value
    })
  }

  nextStep = () => {
    const { other_beneficiaries, other_controllers } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      other_beneficiaries: other_beneficiaries,
      other_controllers: other_controllers
    }

    api
      .patch('onboardings/' + this.props.onboardingId, {
        onboarding: leadObj
      })
      .then((res) => {
        console.log('Backend responce to onboarding PATCH' , res)
        this.updateSignup()
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  updateSignup = () => {

    const { other_beneficiaries, other_controllers } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        other_beneficiaries: other_beneficiaries,
        other_controllers: other_controllers
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
    const { other_beneficiaries, other_controllers, isTransitioningNext } = this.state;
    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>Other declarations</h2>

        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef}
          >
            <div className="signup__section">
              <div className="signup__section-heading">
                <span>Are there any other beneficiaries (individual or corporate), parent companies or subsidiaries other than those declared above?</span>
                <Tooltip
                  title="some tooltip content"
                  position="top"
                  distance="10"
                  arrow="true">
                    <SvgIcon name="question-circle" />
                </Tooltip>
              </div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="other_beneficiaries"
                  text="Yes"
                  clickHandler={this.chooseOption.bind(this, "other_beneficiaries", true)}
                  isActive={other_beneficiaries }
                />
                <CheckBox
                  name="other_beneficiaries"
                  text="No"
                  clickHandler={this.chooseOption.bind(this, "other_beneficiaries", false)}
                  isActive={!other_beneficiaries }
                />
              </div>
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">
                <span>Are there any other beneficiaries (individual or corporate), parent companies or subsidiaries other than those declared above?</span>
                <Tooltip
                  title="some tooltip content"
                  position="top"
                  distance="10"
                  arrow="true">
                    <SvgIcon name="question-circle" />
                </Tooltip>
              </div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="other_controllers"
                  text="Yes"
                  clickHandler={this.chooseOption.bind(this, "other_controllers", true)}
                  isActive={other_controllers }
                />
                <CheckBox
                  name="other_controllers"
                  text="No"
                  clickHandler={this.chooseOption.bind(this, "other_controllers", false)}
                  isActive={!other_controllers }
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
  onboardingFields: state.onboarding.fields,
  onboardingId: state.onboarding.onboardingId,
  onboardingStep: state.onboarding.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep8);
