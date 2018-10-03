import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Collapse} from 'react-collapse';

import Image from '../../components/Image';
import CheckBox from '../../components/CheckBox';
import ShareholderTable from '../../components/ShareholderTable';

import api from '../../services/Api';
import isProduction from '../../services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_ID } from '../../store/ActionTypes';

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
      haveShareholders: props.onboardingFields.haveShareholders,
      shareholders_individulas: props.onboardingFields.shareholders_individulas,
      shareholders_corporate:  props.onboardingFields.shareholders_corporate,
      formIsValid: false,
      isTransitioningNext: false,
      isFormSubmitted: false
    };

    this.formRef = React.createRef();
    this.tableRef = [] // hold an array for tables scrollbars
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
    // this.formRef.current.submit();
    this.handleSubmit();
  }

  // have shareholders checkbox
  toggleCheckbox = (val) => {
    this.setState({
      haveShareholders: val
    })
  }

  // called from the parent onBlur or checkbox onClick
  updateState = (name, componentState) => {
    this.setState({ ...this.state,
      [name]: componentState
    });
  }

  componentDidUpdate(){
    // console.log(this.state)
  }

  nextStep = () => {
    const { shareholders_individulas, shareholders_corporate } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      shareholders_individulas: this.convertStateToStr(shareholders_individulas),
      shareholders_corporate: this.convertStateToStr(shareholders_corporate)
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

  convertStateToStr = (state) => {
    // state is a sibling comming from a shareholders table
    let result = ""

    state.forEach( (row, i) => {
      result += `row ${i} : `
      row.forEach( (col, index) => {
        result += `${col.name} = ${col.value} ; `
      })
    })

    return result
  }

  updateSignup = () => {

    const { haveShareholders, shareholders_individulas, shareholders_corporate } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        haveShareholders: haveShareholders,
        shareholders_individulas: shareholders_individulas,
        shareholders_corporate: shareholders_corporate
      })

      this.setState({ isTransitioningNext: false })

    }, 400)

  }

  prevStep = () => {
    this.props.setOnboardingStep(
      this.props.onboardingStep - 1
    );
  }

  // helper function to recalc the scrollbars
  onCollapsedToggle = () => {
    this.tableRef.forEach(table => {
      table.updateScrollbar()
    })
  }

  render(){
    const {
      props: {},
      state: {haveShareholders, isTransitioningNext}
    } = this

    const individualsTable = {
      thead: [
        {
          icon: "sh-name",
          name: "Full name"
        },
        {
          icon: "sh-id",
          name: "ID"
        },
        {
          icon: "sh-phone",
          name: "Phone number"
        },
        {
          icon: "sh-email",
          name: "Email"
        },
        {
          icon: "sh-person",
          name: "Singapore Citizen / PR"
        },
        {
          name: "Shareholder?"
        },
        {
          name: "Director?"
        }

      ],
      tbody: [
        {
          type: "input",
          placeholder: "Full name",
          name: "full_name"
        },
        {
          type: "input",
          placeholder: "Insert ID",
          name: "id_number"
        },
        {
          type: "input",
          placeholder: "Insert number",
          name: "phone_number"
        },
        {
          type: "input",
          placeholder: "Insert email",
          name: "email"
        },
        {
          type: "checkbox",
          name: "is_sg_citizen"
        },
        {
          type: "checkbox",
          name: "is_shareholder"
        },
        {
          type: "checkbox",
          name: "is_director"
        }
      ]
    }

    const corporatesTable = {
      topRow: [
        {}, {},
        {
          colspan: 4,
          icon: "sh-person",
          name: "Corporate representative"
        },
        {
          icon: "sh-person",
          name: "Administrative Assistant",
          tooltip: "Let us know if you prefer us to forward the onboarding paperwork for the Corporate Representative to be completed by an Administrative Assistant. The Corporate Representative will only need to verify and sign-off the completed onboarding documents."
        }
      ],
      thead: [
        {
          icon: "sh-name",
          name: "Company name"
        },
        {
          icon: "sh-id",
          name: "Company registration #"
        },
        {
          icon: "sh-person",
          name: "Full name"
        },
        {
          icon: "sh-id",
          name: "Id"
        },
        {
          icon: "sh-phone",
          name: "Phone number"
        },
        {
          icon: "sh-email",
          name: "Email"
        },
        {
          icon: "sh-email",
          name: "Email"
        },
      ],
      tbody: [
        {
          type: "input",
          placeholder: "Company name",
          name: "company_name"
        },
        {
          type: "input",
          placeholder: "Company registration #",
          name: "uen"
        },
        {
          type: "input",
          placeholder: "Insert full name",
          name: "full_name"
        },
        {
          type: "input",
          placeholder: "ID",
          name: "id"
        },
        {
          type: "input",
          placeholder: "Phone number",
          name: "phone"
        },
        {
          type: "input",
          placeholder: "E-mail",
          name: "email"
        },
        {
          type: "input",
          placeholder: "E-mail",
          name: "rep_email"
        }
      ]
    }

    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__single-col">
          <div className="signup__heading-row">
            <div className="signup__avatar signup__avatar--extra-small">
              <Image file="rifeng-avatar.png" />
            </div>
            <h2>We will need to know more about the shareholding structure of the company</h2>
          </div>

          <div className="ui-group ui-group--no-margin">
            <label htmlFor="">Does your company have any corporate shareholder(s)?</label>
            <div className="signup__checkboxes">
              <CheckBox
                name="haveShareholders"
                text="Yes"
                clickHandler={this.toggleCheckbox.bind(this, true)}
                isActive={haveShareholders === true}
              />
              <CheckBox
                name="haveShareholders"
                text="No"
                clickHandler={this.toggleCheckbox.bind(this, false)}
                isActive={haveShareholders === false}
              />
            </div>
          </div>

          <Collapse
            className="table-collapse"
            onRest={this.onCollapsedToggle}
            isOpened={haveShareholders}>
            <React.Fragment>
              <ShareholderTable
                onRef={(ref) => { this.tableRef[1] = ref; }}
                title="List of all non-corporate stakeholder(s) (shareholders and directors)"
                titleTooltip="There will be an additional fee of S$25 per stakeholder per year after that fifth key stakeholder. This is to account for the additional administrative and recording keeping processes required."
                addMoreText="Additional stakeholders"
                schema={corporatesTable}
                updateState={this.updateState.bind(this, "shareholders_corporate")}
              />

              <ShareholderTable
                onRef={(ref) => { this.tableRef[0] = ref; }}
                title="List of corporate shareholder(s)"
                titleTooltip="There will be an additional fee of S$100 per year if a corporate shareholder holds a 25% or more stake in the company. This is to account for the additional due diligence and compliance processes required by MAS’s anti-money laundering regulation."
                addMoreText="Additional corporate entity"
                schema={individualsTable}
                updateState={this.updateState.bind(this, "shareholders_individulas")}
              />
            </React.Fragment>
          </Collapse>

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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep7);
