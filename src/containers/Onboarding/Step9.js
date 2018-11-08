import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { onboardingApi } from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_AUTHTOKEN } from 'store/ActionTypes';
import Image from 'components/Image';
import { Tooltip } from 'react-tippy';
import CheckBox from 'components/CheckBox';
import FormInput from 'components/FormInput';
import SvgIcon from 'components/SvgIcon';

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
      other_beneficiaries_input: props.onboardingFields.other_beneficiaries_input,
      other_controllers_input: props.onboardingFields.other_controllers_input,
      errors: [],
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
    this.setState({
      isFormSubmitted: true
    }, () => {
      this.validateCustom(() => { // callback when err state is up
        if ( this.state.errors.length === 0 ){
          this.nextStep();
          this.setState({isFormSubmitted: false}) // reset state here
        }
      });
    })
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  // checkboxes
  chooseOption = (name, value) => {
    // just as a toggler true/false
    this.setState({...this.state,
      [name]: value
    }, () => this.validateCustom())
  }

  // inputs
  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal}, () => this.validateCustom());
  }

  keyPressHandler = (e) => {
    if ( e.key === "Enter" ){
      this.submitForm();
    }
  }


  nextStep = () => {
    const {
      other_beneficiaries,
      other_controllers,
      other_beneficiaries_input,
      other_controllers_input
    } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      other_beneficiaries: other_beneficiaries,
      other_controllers: other_controllers,
      other_beneficiaries_input: other_beneficiaries_input,
      other_controllers_input: other_controllers_input,
    }

    onboardingApi.defaults.headers['Authorization'] = 'JWT ' + this.props.onboardingToken

    onboardingApi
      .patch('company/' + this.props.companyId, leadObj)
      .then(res => {
        console.log('Backend response to onboarding PATCH' , res)
        this.updateSignup()
      })
      .catch(err => {
        console.log(err.response); // todo update token ?
        if (err.response.status === 401){
          this.refreshToken();
        }
      });

  }

  refreshToken = () => {
    const token = this.props.urlToken
    if ( !token ) return

    onboardingApi.defaults.headers['Authorization'] = '' // clear before obtaining new JWT token
    
    onboardingApi
      .post('login-token', {"token": token})
      .then(res => {
        this.props.setOnboardingAuthToken(res.data.token);
        this.nextStep() // loop - if error, get token again
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

  updateSignup = () => {

    const {
      other_beneficiaries,
      other_controllers,
      other_beneficiaries_input,
      other_controllers_input
    } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        other_beneficiaries: other_beneficiaries,
        other_controllers: other_controllers,
        other_beneficiaries_input: other_beneficiaries_input,
        other_controllers_input: other_controllers_input
      })

      this.setState({ isTransitioningNext: false })

    }, 400)

  }

  prevStep = () => {
    this.props.setOnboardingStep(
      this.props.onboardingStep - 1
    );
  }

  // custom validator
  validateCustom = (cb) => {
    const {
      other_beneficiaries, other_controllers, other_beneficiaries_input, other_controllers_input
    } = this.state;

    let buildErrors = []

    if (other_beneficiaries === true
      && other_beneficiaries_input.length === 0){ // when check and value is empty
      buildErrors.push("other_beneficiaries")
    }

    if (other_controllers === true
      && other_controllers_input.length === 0){ // when check and value is empty
      buildErrors.push("other_controllers")
    }

    this.setState({
      ...this.state, errors: buildErrors
    }, cb)
  }

  showError = (name) => {
    if (
      this.state.isFormSubmitted &&
      this.state.errors.indexOf(name) !== -1){
      return <span className="ui-input-validation">Please fill this field</span>
    }
  }

  render(){
    const {
      other_beneficiaries,
      other_controllers,
      other_beneficiaries_input,
      other_controllers_input,
      isTransitioningNext } = this.state;
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
                <span>
                  Other than the entities declared above, are there any other beneficiaries (individual or corporate), parent companies, or subsidiaries?
                  <Tooltip
                    title="A beneficiary may be anyone who ultimately (i) receives a share of the profits, (ii) owns the assets or undertakings, (iii) has effective control/executive authority/voting rights of the company (e.g. more than 25% of the profits, assets, undertakings, voting rights etc.)."
                    position="top"
                    distance="10"
                    arrow="true">
                      <SvgIcon name="question-circle" />
                  </Tooltip>
                </span>

              </div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="other_beneficiaries"
                  text="No"
                  clickHandler={this.chooseOption.bind(this, "other_beneficiaries", false)}
                  isActive={!other_beneficiaries }
                />
                <CheckBox
                  name="other_beneficiaries"
                  text="Yes"
                  clickHandler={this.chooseOption.bind(this, "other_beneficiaries", true)}
                  isActive={other_beneficiaries }
                />
              </div>
              { other_beneficiaries &&
                <FormInput
                  name="other_beneficiaries_input"
                  extraClass="ui-group--m-top ui-group--regular-label"
                  label="Please name the other related entities"
                  placeholder="Please name the other related entities"
                  value={other_beneficiaries_input}
                  onChangeHandler={this.handleChange}
                  onKeyHandler={this.keyPressHandler} />
              }
              { this.showError("other_beneficiaries") }
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">
                <span>
                  Other than the stakeholders declared above, are there any other Registrable Controllers for the company?
                  <Tooltip
                    title="A controller of the company is registrable when he/she (cumulatively) has significant interest and control in the company (e.g. by having more than 25% of the shares/total voting power in the company). This excludes directors, employees, consultants, or counterparties which may influence the company in a professional/business capacity."
                    position="top"
                    distance="10"
                    arrow="true">
                      <SvgIcon name="question-circle" />
                  </Tooltip>
                </span>
              </div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="other_controllers"
                  text="No"
                  clickHandler={this.chooseOption.bind(this, "other_controllers", false)}
                  isActive={!other_controllers }
                />
                <CheckBox
                  name="other_controllers"
                  text="Yes"
                  clickHandler={this.chooseOption.bind(this, "other_controllers", true)}
                  isActive={other_controllers }
                />
              </div>
              { other_controllers &&
                <FormInput
                  name="other_controllers_input"
                  extraClass="ui-group--m-top ui-group--regular-label"
                  label="Please name the Registrable Controller"
                  placeholder="Please name the Registrable Controller"
                  value={other_controllers_input}
                  onChangeHandler={this.handleChange}
                  onKeyHandler={this.keyPressHandler} />
              }
              { this.showError("other_controllers") }
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
  onboardingStep: state.onboarding.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_FIELDS, payload: data }),
  setOnboardingAuthToken: (data) => dispatch({ type: SET_ONBOARDING_AUTHTOKEN, payload: data }),
  notify: (data) => dispatch(notify(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep8);
