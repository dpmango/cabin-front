import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import 'airbnb-js-shims';
import Select from 'react-select';
import api from '../services/Api';
import isProduction from '../services/isProduction';
import buildOptionsString from '../services/buildOptionsString';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS } from '../store/ActionTypes';

// import SvgIcon from '../components/SvgIcon';
// import FormInput from '../components/FormInput';

class SignupStep3 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func,
    signupId: PropTypes.number,
    signupFields: PropTypes.object
  };

  constructor(props) {
    super();
    this.state = {
      company_industry: props.signupFields.company_industry,
      company_old: props.signupFields.company_old,
      company_employees: props.signupFields.company_employees,
      canSubmit: false,
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

  handleSubmit = (e) => {
    // if ( this.state.formIsValid ){
    //   this.nextStep();
    // }
    // TODO - validation of selects

    this.nextStep();
  }

  submitForm = () => {
    // click handler for the button
    this.formRef.current.submit();
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal})
  }

  handleSelectChange = (name, e) => {
    this.setState({...this.state, [name]: e})
  }

  nextStep = () => {
    const {company_industry, company_old, company_employees} = this.state

    let pricingOptionsStr = buildOptionsString(this.props.pricingOptions, this.props.pricingOptionsSub);

    // patch lead
    // post value to API, but keep object for state
    api
      .patch('signup_leads/' + this.props.signupId, {
        signup_lead: {
          isproduction: isProduction(),
          company_industry: company_industry.value,
          company_old: company_old.value,
          company_employees: company_employees.value,
          pricing_plan: this.props.pricingPlan,
          pricing_options: pricingOptionsStr
        }
      })
      .then((res) => {

        this.setState({ isTransitioningNext: true })

        setTimeout(() => {
          this.props.setSignupStep(4);

          this.props.setSignupFields({
            ...this.props.signupFields,
            company_industry: company_industry,
            company_old: company_old,
            company_employees: company_employees,
          })

          this.setState({ isTransitioningNext: false });

        }, 400)


      })
      .catch(function (error) {
        console.log(error);
      });

  }

  prevStep = () => {
    this.props.setSignupStep(2);
  }

  mapArrToSelect = (arr) => {
    return arr.map( x => {
      return { value: x, label: x }
    })
  }

  render(){
    const { company_industry, company_old, company_employees, isTransitioningNext } = this.state;

    const selectValues = {
      company_industry: [
        "Food and beverages",
        "Retail",
        "Digital or creative agency",
        "Interior design",
        "Technology",
        "Professional services",
        "Logistics",
        "Others"
      ],
      company_old: [
        "Not yet incorporated",
        "Less than 6 months",
        "6 months to 1 year",
        "1 - 3 years",
        "More than 3 years"
      ],
      company_employees: [
        "< 5",
        "5 - 10",
        "11 - 25",
        "25 - 50",
        "50 - 100"
      ]
    }
    return(
      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
          </div>
          <h2>Help us understand a little bit more about your company</h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form"
            onValidSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef} >
            <div className="ui-group">
              <label htmlFor="company_industry" className="ui-group__label">Which industry are you in?</label>
              <Select
                name="company_industry"
                searchable={false}
                autosize={false}
                value={company_industry}
                onChange={this.handleSelectChange.bind(this, 'company_industry')}
                placeholder=""
                options={this.mapArrToSelect(selectValues.company_industry)} />
            </div>
            <div className="ui-group">
              <label htmlFor="company_old" className="ui-group__label">How old is your company?</label>
              <Select
                name="company_old"
                searchable={false}
                autosize={false}
                value={company_old}
                onChange={this.handleSelectChange.bind(this, 'company_old')}
                placeholder=""
                options={this.mapArrToSelect(selectValues.company_old)}
              />
            </div>
            <div className="ui-group">
              <label htmlFor="company_employees" className="ui-group__label">How many staff are there in your company?</label>
              <Select
                name="company_employees"
                searchable={false}
                autosize={false}
                value={company_employees}
                onChange={this.handleSelectChange.bind(this, 'company_employees')}
                placeholder=""
                options={this.mapArrToSelect(selectValues.company_employees)}
              />
            </div>
            {/* <FormInput
              name="company_industry"
              label="Which industry are you in?"
              value={company_industry}
              validationErrors={{
                isDefaultRequiredValue: 'This field is required',
              }}
              onChangeHandler={this.handleChange}
              required
            /> */}
            {/* <FormInput
              name="company_old"
              label="How old is your company?"
              value={company_old}
              validationErrors={{
                isDefaultRequiredValue: 'This field is required',
              }}
              onChangeHandler={this.handleChange}
              required
            />
            <FormInput
              name="company_employees"
              label="How many staff are there in your company?"
              value={company_employees}
              validationErrors={{
                isDefaultRequiredValue: 'This field is required',
              }}
              onChangeHandler={this.handleChange}
              required
            /> */}
          </Formsy>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  signupId: state.signup.signupId,
  signupFields: state.signup.fields,
  pricingPlan: state.pricing.selectedPlan,
  pricingOptions: state.pricing.pricingOptions,
  pricingOptionsSub: state.pricing.pricingOptionsSub
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep3);
