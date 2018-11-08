import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from 'reapop';
import {Collapse} from 'react-collapse';
import Image from 'components/Image';
import CheckBox from 'components/CheckBox';
import ShareholderTable from 'components/ShareholderTable';
import { onboardingApi } from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_AUTHTOKEN } from 'store/ActionTypes';

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
      errors: [],
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
    // this.formRef.current.submit();
    this.handleSubmit();
  }

  // have shareholders checkbox
  toggleCheckbox = (val) => {
    this.setState({
      haveShareholders: val
    }, () => this.validateCustom())
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
      shareholders_corporate: this.convertStateToStr(shareholders_corporate),
      shareholders_individulas_array: JSON.stringify(shareholders_individulas),
      shareholders_corporate_array: JSON.stringify(shareholders_corporate)
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

  // custom validator
  validateCustom = (cb) => {
    const {
      haveShareholders
    } = this.state;

    let buildErrors = []

    if (haveShareholders === null){ // check if tag not empty
      buildErrors.push("haveShareholders")
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
      // props: {},
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
              { this.showError("haveShareholders") }
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep7);
