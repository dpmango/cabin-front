import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../services/Api';
import isProduction from '../services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_ID } from '../store/ActionTypes';
import Image from '../components/Image';
import FormInput from '../components/FormInput';
import CheckBox from '../components/CheckBox';

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
      paidup_capital: props.onboardingFields.paidup_capital,
      company_relations:  props.onboardingFields.company_relations,
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

  chooseOption = (id, name) => {
    const options = this.state[name]
    let index

    console.log(name, options)

    if (options.indexOf(id) === -1) {
     options.push(id)
    } else {
     index = options.indexOf(id)
     options.splice(index, 1)
    }

    this.setState({
      ...this.state,
      [name]: options
    })
  }

  nextStep = () => {
    const { company_activity, company_addres, company_revenue } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      company_activity: company_activity,
      company_addres: company_addres,
      company_revenue: company_revenue
    }

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
    const { paidup_capital, company_relations, isTransitioningNext } = this.state;

    const paidupCapitalOptions = {
      name: 'paidup_capital',
      options: [
        'Investment from local individual shareholder(s)',
        'Investment from foreign individual shareholder(s)',
        'Investment from local corporate shareholder(s)',
        'Investment from foreign corporate shareholder(s)',
        'Loans',
        'Others'
      ]
    }

    const CompanyRelationsOptions = {
      name: 'company_relations',
      haveInputs: true,
      options: [
        'None',
        'Subsidiary company of',
        'Parent company of',
        'Beneficiary company of',
        'Others'
      ]
    }

    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>We will need to know a little more about the company’s source of fundings and relations to other companies</h2>
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
            <div className="signup__section">
              <div className="signup__section-heading">Source of the company’s paid-up capital</div>
              <div className="signup__checkboxes">
                <label htmlFor="">Select all that is applicable: </label>
                { paidupCapitalOptions.options.map((cb, i) => {
                  console.log(paidup_capital, paidup_capital.indexOf(cb))
                    return(
                      <CheckBox
                        key={i}
                        name={paidupCapitalOptions.name}
                        text={cb}
                        clickHandler={this.chooseOption.bind(this, cb, paidupCapitalOptions.name)}
                        isActive={paidup_capital.indexOf(cb) !== -1 }
                      />
                    )
                  })
                }
              </div>
            </div>
            { /* <FormInput
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
            /> */ }

            <div className="signup__section">
              <div className="signup__section-heading">Identity in relation to other companies</div>
              <div className="signup__checkboxes">
                <label htmlFor="">Select all that is applicable: </label>
                { CompanyRelationsOptions.options.map((cb, i) => {
                    return(
                      <CheckBox
                        key={i}
                        name={CompanyRelationsOptions.name}
                        text={cb}
                        clickHandler={this.chooseOption.bind(this, cb, CompanyRelationsOptions.name)}
                        isActive={company_relations.indexOf(cb) !== -1 }
                      />
                    )
                  })
                }
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
  onboardingStep: state.onboarding.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep6);
