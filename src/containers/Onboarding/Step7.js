import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../../services/Api';
import isProduction from '../../services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_ID } from '../../store/ActionTypes';
import Image from '../../components/Image';
import FormInput from '../../components/FormInput';
import ReactTags from '../../components/ReactTags/ReactTags';
import { countriesListAutocompleate, delimiters} from '../../store/CountriesListAutocompleate';
import CheckBox from '../../components/CheckBox';

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
      company_relations_inputs: props.onboardingFields.company_relations_inputs,
      paidup_capital_origins: props.onboardingFields.paidup_capital_origins,
      countries_list: countriesListAutocompleate,
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
    // TODO add some kind of validations?
    // if ( this.state.formIsValid ){
      this.nextStep();
      this.setState({isFormSubmitted: false}) // reset state here
    // }
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  handleChangeNested = (e) => {
    let fieldName = e.target.name;
    let fieldId = e.target.id;
    let fleldVal = e.target.value;
    let index = -1
    this.state[fieldName].forEach( (x,i) => {
      if ( x.name === fieldId ){
        index = i
      }
    })

    const newObj = {  name: fieldId, value: fleldVal  }

    const stateClone = this.state[fieldName]
    stateClone[index] = newObj

    this.setState({...this.state,
      [fieldName]: stateClone
    });

  }


  // keyPressHandler = (e) => {
  //   if ( e.key === "Enter" ){
  //     this.submitForm();
  //   }
  // }

  // tags management
  handleTagsDelete = (i, e, name) => {
    this.setState({
      ...this.state,
      [name]: this.state[name].filter((tag, index) => index !== i),
    });
  }

  handleTagsAddition = (tag, name) => {
    this.setState(state => ({
      ...this.state,
      [name]: [
        ...state[name], tag
      ]
    }));
  }

  handleTagsDrag = (tag, currPos, newPos, name) => {
    const tags = [...this.state[name]];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({
      ...this.state,
      [name]: newTags
    });
  }

  chooseOption = (id, name) => {
    const options = this.state[name]
    let index

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
    const { paidup_capital, company_relations, company_relations_inputs, paidup_capital_origins } = this.state;

    console.log(
      'company_relations_inputs', company_relations_inputs,
      'company_relations', company_relations
    )

    let companyRelationsJoined = ""

    // join checkbox and input values
    company_relations.forEach( (checkbox, i) => {
      let index = -1
      company_relations_inputs.forEach((input, ind) => {
        if ( checkbox === input.name ){ index = ind }
      })

      if ( index !== -1 ){
        // if matched - add string with the input value
        companyRelationsJoined += `${checkbox} (${company_relations_inputs[index].value}), `
      } else {
        // if empty - only the checkbox value
        companyRelationsJoined += `${checkbox}, `
      }
    })

    const leadObj = {
      isproduction: isProduction(),
      paidup_capital: paidup_capital.join(', '),
      company_relations: companyRelationsJoined,
      paidup_capital_origins: paidup_capital_origins.map(x => `(${x.id}) ${x.text}`).join(', ')
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

  updateSignup = () => {

    const { paidup_capital, company_relations, company_relations_inputs, paidup_capital_origins } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        paidup_capital: paidup_capital,
        company_relations: company_relations,
        company_relations_inputs: company_relations_inputs, // local only
        paidup_capital_origins: paidup_capital_origins
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
    const { paidup_capital, company_relations, paidup_capital_origins, countries_list, company_relations_inputs, isTransitioningNext } = this.state;

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
      options: [
        'None',
        {
          name: 'Subsidiary (or beneficiary) company of',
          input: 'Insert Subsidiary company'
        },
        {
          name: 'Parent (or benefactor) company of',
          input: 'Insert Parent company'
        },
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

            <div className="signup__section">
              <div className="signup__section-heading">Country or countries of origin for paid-up capital</div>
              <div className="ui-group">
                <ReactTags
                  tags={paidup_capital_origins}
                  name="paidup_capital_origins"
                  suggestions={countries_list}
                  placeholder="Country or countries of origin for paid-up capital"
                  handleDelete={this.handleTagsDelete}
                  handleAddition={this.handleTagsAddition}
                  handleDrag={this.handleTagsDrag}
                  delimiters={delimiters}
                  autofocus={false} />
              </div>
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">Does this company have any related entities?</div>
              <div className="signup__checkboxes">
                <label htmlFor="">Select all that is applicable: </label>
                { CompanyRelationsOptions.options.map((cb, i) => {
                    const cbValue = typeof(cb) === "string" ? cb : cb.name
                    return(
                      <React.Fragment>
                        <CheckBox
                          key={i}
                          name={CompanyRelationsOptions.name}
                          text={cbValue}
                          clickHandler={this.chooseOption.bind(this, cbValue, CompanyRelationsOptions.name)}
                          isActive={company_relations.indexOf(cbValue) !== -1 }
                        />
                        { typeof(cb) !== "string" &&
                          <FormInput
                            name="company_relations_inputs"
                            id={cb.name}
                            placeholder={cb.input}
                            value={company_relations_inputs[cb.name]}
                            onChangeHandler={this.handleChangeNested}
                          />
                        }
                      </React.Fragment>
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
  onboardingId: state.onboarding.onboardingId,
  onboardingStep: state.onboarding.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_STEP, payload: data }),
  setOnboardingFields: (data) => dispatch({ type:SET_ONBOARDING_FIELDS, payload: data }),
  setOnboardingId: (data) => dispatch({ type: SET_ONBOARDING_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep6);
