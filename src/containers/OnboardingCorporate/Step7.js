import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
// import {api} from 'services/Api';
// import isProduction from 'services/isProduction';
import { SET_ONBOARDING_C_STEP, SET_ONBOARDING_C_FIELDS, SET_ONBOARDING_C_ID } from 'store/ActionTypes';
import Image from 'components/Image';
import SvgIcon from 'components/SvgIcon';
import FormInput from 'components/FormInput';
import CheckBox from 'components/CheckBox';
import { Tooltip } from 'react-tippy';

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
      agent: props.onboardingFields.agent,
      grounds: props.onboardingFields.grounds,
      shareholderOnBehalf: props.onboardingFields.shareholderOnBehalf,
      fraud: props.onboardingFields.fraud,
      liquidation: props.onboardingFields.liquidation,
      pep: props.onboardingFields.pep,
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

  // checkbox
  toggleCheckbox = (name, val) => {
    this.setState({
      [name]: val
    }, () => this.validateCustom())
  }

  // input
  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({
      ...this.state, [fieldName]: fleldVal
    }, () => this.validateCustom());
  }

  nextStep = () => {
    // const { nomineeDirector, agent, grounds, shareholderOnBehalf, offence, bankrupt, pep } = this.state;

    // const leadObj = {
    //   isproduction: isProduction(),
    //   nomineeDirector: nomineeDirector === null ? "Yes" : nomineeDirector,
    //   agent: agent === null ? "Yes" : agent,
    //   grounds: grounds === null ? "Yes" : grounds,
    //   shareholderOnBehalf: shareholderOnBehalf === null ? "Yes" : shareholderOnBehalf,
    //   offence: offence === null ? "Yes" : offence,
    //   bankrupt: bankrupt === null ? "Yes" : bankrupt,
    //   pep: pep === null ? "Yes" : pep
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
    const { agent, grounds, shareholderOnBehalf, fraud, liquidation, pep } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        agent: agent,
        grounds: grounds,
        shareholderOnBehalf: shareholderOnBehalf,
        fraud: fraud,
        liquidation: liquidation,
        pep: pep
      })

      this.setState({ isTransitioningNext: false })

    }, 400)

  }

  prevStep = () => {
    this.props.setOnboardingStep(
      this.props.onboardingStep - 1
    );
  }

  validateCustom = (cb) => {
    const {
      agent, grounds, shareholderOnBehalf, fraud, liquidation
    } = this.state;

    let buildErrors = []
    if (agent !== "No" && !agent){ // check if not "No" and lenght > 0
      buildErrors.push("agent")
    }
    if (grounds !== "No" && !grounds){ // check if not "No" and lenght > 0
      buildErrors.push("grounds")
    }
    if (shareholderOnBehalf !== "No" && !shareholderOnBehalf){ // check if not "No" and lenght > 0
      buildErrors.push("shareholderOnBehalf")
    }
    if (fraud !== "No" && !fraud){ // check if not "No" and lenght > 0
      buildErrors.push("fraud")
    }
    if (liquidation !== "No" && !liquidation){ // check if not "No" and lenght > 0
      buildErrors.push("liquidation")
    }

    // TODO - what kind of validation for PEP ?
    // prevent submit if YES ?

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
    const { agent, grounds, shareholderOnBehalf, fraud, liquidation, pep, isTransitioningNext } = this.state;

    return(
      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>Other declarations on behalf of {"{{Corporate shareholder}}"}</h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form"
            onSubmit={this.handleSubmit}
            onValid={this.formValid}
            onInvalid={this.formInvalid}
            ref={this.formRef} >

            <div className="signup__section">
              <div className="signup__section-heading">Is {"{{Corporate shareholder}}"} an agent employed/engaged to act on behalf and take instructions from any other individual or corporation without any official ties to the above business entity?</div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="agent"
                  text="No"
                  clickHandler={this.toggleCheckbox.bind(this, "agent", "No")}
                  isActive={agent === "No" } />
                <CheckBox
                  name="agent"
                  text="Yes"
                  clickHandler={this.toggleCheckbox.bind(this, "agent", null)}
                  isActive={agent !== "No" } />
                { (agent !== "No") &&
                  <FormInput
                    name="agent"
                    value={agent}
                    onChangeHandler={this.handleChange} />
                }
                {this.showError("agent")}
              </div>
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">
                Does {"{{Corporate shareholder}}"} have reasonable grounds to believe that any other Registrable Controllers
                <Tooltip
                  title="A controller of the company is registrable when he/she (cumulatively) has significant interest and control in the company (e.g. by having more than 25% of the shares/total voting power in the company). This excludes directors, employees, consultants, or counterparties which may influence the company in a professional/business capacity."
                  position="top"
                  distance="10"
                  arrow="true">
                    <SvgIcon name="question-circle" />
                </Tooltip>
                or Beneficiaries
                <Tooltip
                  title="A beneficiary may be anyone who ultimately (i) receives a share of the profits, (ii) owns the assets or undertakings, (iii) has effective control/executive authority/voting rights of the company (e.g. more than 25% of the profits, assets, undertakings, voting rights etc.)."
                  position="top"
                  distance="10"
                  arrow="true">
                    <SvgIcon name="question-circle" />
                </Tooltip>
                (individual or corporate) exist other than those appearing on the {"{{Company name}}"}’s Register?
              </div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="grounds"
                  text="No"
                  clickHandler={this.toggleCheckbox.bind(this, "grounds", "No")}
                  isActive={grounds === "No" } />
                <CheckBox
                  name="grounds"
                  text="Yes"
                  clickHandler={this.toggleCheckbox.bind(this, "grounds", null)}
                  isActive={grounds !== "No" } />
                { (grounds !== "No") &&
                  <FormInput
                    name="grounds"
                    value={grounds}
                    onChangeHandler={this.handleChange} />
                }
                {this.showError("grounds")}
              </div>
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">
                Is {"{{Corporate shareholder}}"} holding shares on behalf of another individual or corporation?
              </div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="shareholderOnBehalf"
                  text="No"
                  clickHandler={this.toggleCheckbox.bind(this, "shareholderOnBehalf", "No")}
                  isActive={shareholderOnBehalf === "No" } />
                <CheckBox
                  name="shareholderOnBehalf"
                  text="Yes"
                  clickHandler={this.toggleCheckbox.bind(this, "shareholderOnBehalf", null)}
                  isActive={shareholderOnBehalf !== "No" } />
                { (shareholderOnBehalf !== "No") &&
                  <FormInput
                    name="shareholderOnBehalf"
                    value={shareholderOnBehalf}
                    onChangeHandler={this.handleChange} />
                }
                {this.showError("shareholderOnBehalf")}
              </div>
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">
                Has {"{{Corporate shareholder}}"} been involved in any legal proceedings involving fraud or dishonesty?
              </div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="fraud"
                  text="No"
                  clickHandler={this.toggleCheckbox.bind(this, "fraud", "No")}
                  isActive={fraud === "No" } />
                <CheckBox
                  name="fraud"
                  text="Yes"
                  clickHandler={this.toggleCheckbox.bind(this, "fraud", null)}
                  isActive={fraud !== "No" } />
                { (fraud !== "No") &&
                  <FormInput
                    name="fraud"
                    value={fraud}
                    onChangeHandler={this.handleChange} />
                }
                {this.showError("fraud")}
              </div>
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">
                Is {"{{Corporate shareholder}}"} undergoing any liquidation or winding-up proceedings?
              </div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="liquidation"
                  text="No"
                  clickHandler={this.toggleCheckbox.bind(this, "liquidation", "No")}
                  isActive={liquidation === "No" } />
                <CheckBox
                  name="liquidation"
                  text="Yes"
                  clickHandler={this.toggleCheckbox.bind(this, "liquidation", null)}
                  isActive={liquidation !== "No" } />
                { (liquidation !== "No") &&
                  <FormInput
                    name="liquidation"
                    value={liquidation}
                    onChangeHandler={this.handleChange} />
                }
                {this.showError("liquidation")}
              </div>
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">
                Is {"{{Corporate shareholder}}"} have relations to a Politically Exposed Person (PEP), previous PEP or related to PEP or previous PEP (immediate family member or close associate)?
                <br/>
                A PEP may be any person entrusted with a prominent public function in or outside Singapore, or in any international organisation (senior officer and above).
                <br/>
                If YES, We apologise that Cabin Pte. Ltd. is unable to be of service to any Politically Exposed Persons (PEPs), previous PEPs or their immediate family member or close associate.
              </div>
              <div className="signup__checkboxes">
                <CheckBox
                  name="pep"
                  text="No"
                  clickHandler={this.toggleCheckbox.bind(this, "pep", "No")}
                  isActive={pep === "No" } />
                <CheckBox
                  name="pep"
                  text="Yes"
                  clickHandler={this.toggleCheckbox.bind(this, "pep", null)}
                  isActive={pep !== "No" } />
              </div>
            </div>

          </Formsy>
        </div>
      </div>

    )
  }
}


const mapStateToProps = (state) => ({
  onboardingFields: state.onboardingCorporate.fields,
  onboardingId: state.onboardingCorporate.onboardingId,
  onboardingStep: state.onboardingCorporate.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_C_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_C_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_C_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep7);
