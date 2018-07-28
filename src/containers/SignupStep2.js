import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import PhoneInput from 'react-phone-number-input'
// import { parseNumber, formatNumber, isValidNumber } from 'libphonenumber-js';
import api from '../services/Api';
import isProduction from '../services/isProduction';
import buildOptionsString from '../services/buildOptionsString';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS, SET_SIGNUP_ID, SET_SIGNUP_EMAIL } from '../store/ActionTypes';

// import SvgIcon from '../components/SvgIcon';
import FormInput from '../components/FormInput';

class SignupStep2 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func,
    // signupId: PropTypes.number,
    signupEmail: PropTypes.string,
    signupFields: PropTypes.object,
    setSignupId: PropTypes.func,
    setSignupEmail: PropTypes.func,
    pricingPlan: PropTypes.string,
    pricingOptions: PropTypes.array,
    pricingOptionsSub: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = {
      first_name: props.signupFields.first_name,
      last_name:  props.signupFields.last_name,
      company_name:  props.signupFields.company_name,
      email: props.signupEmail,
      phone: props.signupFields.phone,
      formIsValid: false,
      isTransitioningNext: false
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
    if ( this.state.formIsValid ){
      this.nextStep();
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

    let pricingOptionsStr = buildOptionsString(this.props.pricingOptions, this.props.pricingOptionsSub);
    const leadObj = {
      isproduction: isProduction(),
      first_name: first_name,
      last_name: last_name,
      company_name: company_name,
      email: email,
      phone: phone,
      pricing_plan: this.props.pricingPlan,
      pricing_options: pricingOptionsStr
    }

    // if signup ID is present - then update by PATCH
    // else - create new
    if ( this.props.signupId ){
      // patch lead
      api
        .patch('signup_leads/' + this.props.signupId, {
          signup_lead: leadObj
        })
        .then((res) => {
          this.updateSignup()
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // create new instance
      api
        .post(`signup_leads`, {
          signup_lead: leadObj
        })
        .then((res) => {
          this.props.setSignupId(res.data.id);
          this.props.setSignupEmail(res.data.email);
          this.updateSignup();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  updateSignup = () => {

    const { first_name, last_name, company_name, phone } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setSignupStep(3);

      this.props.setSignupFields({
        ...this.props.signupFields,
        first_name: first_name,
        last_name: last_name,
        company_name: company_name,
        // no email because it's outside signupFileds 1lvl top
        phone: phone,
      })

      this.setState({ isTransitioningNext: false })

    }, 400)

  }

  prevStep = () => {
    this.props.setSignupStep(1);
  }

  render(){
    const { first_name, last_name, company_name, email, phone, isTransitioningNext } = this.state;

    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
          </div>
          <h2>Tell us a little about yourself</h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form"
            onValidSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef}
          >
            <FormInput
              name="first_name"
              placeholder="First Name"
              value={first_name}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your first name',
                minLength: 'Name is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              name="last_name"
              placeholder="Last Name"
              value={last_name}
              validations="minLength:1"
              validationErrors={{
                isDefaultRequiredValue: 'Please fill your last name',
                minLength: 'Last name is too short'
              }}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              required
            />
            <FormInput
              name="company_name"
              placeholder="Company Name"
              value={company_name}
              onChangeHandler={this.handleChange}
              onKeyHandler={this.keyPressHandler}
              validationErrors={{
                isDefaultRequiredValue: 'Please fill company name'
              }}
              required
            />
            <FormInput
              name="email"
              placeholder="Email"
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
              <div className="ui-phone">
                <PhoneInput
              		placeholder="Phone Number"
              		value={ phone }
                  country={'SG'}
                  displayInitialValueAsLocalNumber={true}
              		onChange={ phone => this.setState({ phone }) }
                  onKeyPress={this.keyPressHandler}
                  // indicateInvalid
                  // error={ phone ? (isValidNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required' }
                />
              </div>
            </div>
            {/* <FormInput
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              mask={['+','6','5', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
              onChangeHandler={this.handleChange}
              validations={{
                matchRegexp: /\+65 \d{4} \d{4}/
              }}
              validationErrors={{
                matchRegexp: "Phone number is not valid",
                isDefaultRequiredValue: 'Please fill phone'
              }}
              required
            />*/}
          </Formsy>
        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  signupEmail: state.signup.signupEmail,
  signupId: state.signup.signupId,
  signupFields: state.signup.fields,
  pricingPlan: state.pricing.selectedPlan,
  pricingOptions: state.pricing.pricingOptions,
  pricingOptionsSub: state.pricing.pricingOptionsSub
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data }),
  setSignupEmail: (data) => dispatch({ type: SET_SIGNUP_EMAIL, payload: data }),
  setSignupId: (data) => dispatch({ type: SET_SIGNUP_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep2);
