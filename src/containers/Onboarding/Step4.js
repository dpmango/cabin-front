import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { notify } from 'reapop';
import { onboardingApi } from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_AUTHTOKEN } from 'store/ActionTypes';
import Image from 'components/Image';
import FormInput from 'components/FormInput';

class OnboardingStep3 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      company_uen: props.onboardingFields.company_uen,
      company_name:  props.onboardingFields.company_name,
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

  nextStep = (refreshedToken) => {
    const { company_uen, company_name } = this.state;

    const leadObj = {
      // onboarding_id: this.props.onboardingRandomId,
      // headers + data somehow not working with axios created instance
      // headers: {
      //   'Authorization': 'JWT ' + this.props.onboardingToken
      // },
      // data: {
      //   isproduction: isProduction(),
      //   uen: company_uen,
      //   name: company_name,
      // }
      isproduction: isProduction(),
      uen: company_uen,
      name: company_name,
    }

    // changed - we know the id because of JWT auth goes first
    // set JWT token first
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

    // if onboarding ID is present - then update by PATCH
    // else - create new
    // if ( this.props.onboardingId ){
    //   // patch lead
    //   api
    //     .patch('onboardings/' + this.props.onboardingId, {
    //       onboarding: leadObj
    //     })
    //     .then(res => {
    //       console.log('Backend response to onboarding PATCH' , res)
    //       this.updateSignup()
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // } else {
    //   // create new instance
    //   api
    //     .post(`onboardings`, {
    //       onboarding: leadObj
    //     })
    //     .then(res => {
    //       console.log('Backend response to onboarding POST' , res)
    //
    //       this.props.setOnboardingId(res.data.id);
    //       this.updateSignup();
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }
  }

  refreshToken = () => {
    const token = this.props.urlToken
    if ( !token ) return

    // clear JWT before refreshing tokens
    onboardingApi.defaults.headers['Authorization'] = ''

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

    const { company_uen, company_name } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        company_uen: company_uen,
        company_name: company_name,
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
  // onboardingRandomId: state.onboarding.onboardingRandomId,
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep3);
