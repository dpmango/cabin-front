import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import Select from 'react-select';
import { notify } from 'reapop';
import { onboardingApi } from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_AUTHTOKEN } from 'store/ActionTypes';
import Image from 'components/Image';
import FormInput from 'components/FormInput';
import SvgIcon from 'components/SvgIcon';
import { Tooltip } from 'react-tippy';

class OnboardingStep4 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    // setOnboardingId: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      company_activity: props.onboardingFields.company_activity,
      company_addres:  props.onboardingFields.company_addres,
      company_revenue:  props.onboardingFields.company_revenue,
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

  // select handlers
  handleSelectChange = (name, e) => {
    this.setState({
      ...this.state, [name]: e
    }, () => this.validateCustom())
  }

  mapArrToSelect = (arr) => {
    return arr.map( x => {
      return { value: x, label: x }
    })
  }

  // custom validation
  validateCustom = (cb) => {
    const {
      company_revenue
    } = this.state;

    let buildErrors = []
    if (!company_revenue){
      buildErrors.push("company_revenue")
    }

    this.setState({
      ...this.state, errors: buildErrors
    }, cb)
  }

  showError = (name) => {
    if (
      this.state.isFormSubmitted &&
      this.state.errors.indexOf(name) !== -1){
      return <span className="ui-input-validation">Please select annual revenue</span>
    }
  }

  // logic and back-end
  nextStep = (refreshedToken) => {
    const { company_activity, company_addres, company_revenue } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      primary_activity: company_activity,
      address: company_addres,
      annual_revenue: company_revenue.value
    }

    console.log({leadObj})

    // update the api
    onboardingApi.defaults.headers['Authorization'] = 'JWT ' + ( refreshedToken ? refreshedToken : this.props.onboardingToken )

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

    const selectValues = {
      company_revenue: [
        "Not generating revenue",
        "S$1K - S$50K",
        "S$51K - S$100K",
        "S$100K - S$500K",
        "S$500K - S$1M",
        "S$1M - S$5M",
        ">S$5M"
      ]
    }

    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>We will need to know a little more about the company</h2>
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
              label="Primary business activity"
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
              label="Address of operating premise"
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
            {/* <FormInput
              name="company_revenue"
              tooltipContent=" If this is a new company, a rough estimation of your projected annual revenue will be sufficient"
              label="Estimated annual revenue"
              value={company_revenue}
              validations="isInt:3"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your Estimated annual revenue',
                isInt: 'Estimated annual revenue must be an integer',
                // minLength: 'Estimated annual revenue premise is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required /> */}
            <div className="ui-group">
              <label htmlFor="company_revenue" className="ui-group__label">Estimated annual revenue?</label>
              <Select
                name="company_revenue"
                searchable={false}
                autosize={false}
                value={company_revenue}
                onChange={this.handleSelectChange.bind(this, 'company_revenue')}
                placeholder=""
                options={this.mapArrToSelect(selectValues.company_revenue)} />
              <div className="ui-group__tooltip">
                <Tooltip
                  title=" If this is a new company, a rough estimation of your projected annual revenue will be sufficient"
                  position="bottom"
                  distance="10"
                  arrow="true">
                    <SvgIcon name="question-circle" />
                </Tooltip>
              </div>
              {this.showError("company_revenue")}
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep4);
