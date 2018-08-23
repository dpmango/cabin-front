import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../services/Api';
import isProduction from '../services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_ID } from '../store/ActionTypes';
import Image from '../components/Image';
import FormInput from '../components/FormInput';
import SvgIcon from '../components/SvgIcon';
import ShareholderTable from '../components/ShareholderTable';

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
      shareholders_individulas: props.onboardingFields.shareholders_individulas,
      shareholders_corporate:  props.onboardingFields.shareholders_corporate,
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
    // this.formRef.current.submit();
    this.handleSubmit();
  }

  // called from the parent onBlur or checkbox onClick
  updateState = (name, componentState) => {
    this.setState({ ...this.state,
      [name]: componentState
    })
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

    console.log(result)
    return result
  }

  updateSignup = () => {

    const { shareholders_individulas, shareholders_corporate } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        isproduction: isProduction(),
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

  render(){
    const { shareholders_individulas, shareholders_corporate, isTransitioningNext } = this.state;

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
          name: "is_shareholder"
        },
        {
          type: "checkbox",
          name: "is_director"
        }
      ]
    }

    const corporatesTable = {
      thead: [
        {
          icon: "sh-name",
          name: "Company name"
        },
        {
          icon: "sh-id",
          name: "UEN"
        },
        {
          icon: "sh-person",
          name: "Name of corporate representative"
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
          placeholder: "Company name",
          name: "company_name"
        },
        {
          type: "input",
          placeholder: "UEN",
          name: "uen"
        },
        {
          type: "input",
          placeholder: "Corporate representative",
          name: "corporate_representative"
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

    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__single-col">
          <div className="signup__heading-row">
            <div className="signup__avatar signup__avatar--extra-small">
              <Image file="rifeng-avatar.png" />
            </div>
            <h2>We will need to know more about the shareholding structure of the company</h2>
          </div>
          <ShareholderTable
            title="List of key individuals (shareholders and directors)"
            schema={individualsTable}
            updateState={this.updateState.bind(this, "shareholders_individulas")}
            helperText="There will be an additional fee of S$25 per individual per year after that fifth key individual. This is to account for the additional administrative and recording keeping processes required."
          />

          <ShareholderTable
            title="List of relevant corporate entities (i.e. corporate shareholders or directors)"
            titleTooltip="Some tooltip content"
            schema={corporatesTable}
            updateState={this.updateState.bind(this, "shareholders_corporate")}
            helperText="There will be an additional fee of S$25 per individual per year after that fifth key individual. This is to account for the additional administrative and recording keeping processes required."
          />

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
