import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { notify } from 'reapop';
import { onboardingApi } from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_AUTHTOKEN } from 'store/ActionTypes';
import Image from 'components/Image';
import FormInput from 'components/FormInput';
import ReactTags from 'components/ReactTags/ReactTags';
import { countriesListAutocompleate, delimiters} from 'store/CountriesListAutocompleate';
import CheckBox from 'components/CheckBox';

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
      paidup_capital_inputs: props.onboardingFields.paidup_capital_inputs,
      company_relations: props.onboardingFields.company_relations,
      company_relations_inputs: props.onboardingFields.company_relations_inputs,
      paidup_capital_origins: props.onboardingFields.paidup_capital_origins,
      errors: [],
      countries_list: [],
      //countriesListAutocompleate,
      formIsValid: false,
      isTransitioningNext: false,
      isFormSubmitted: false
    };

    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.getCountriesList();
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
    }, () => this.validateCustom());

  }


  getCountriesList = () => {
    onboardingApi
      .get('countries')
      .then(res => {
        const data = res.data.map(x => ({
          id: x.code, countryCode: x.id, text: x.name
        }))
        this.setState({ countries_list: data })
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  // tags management
  handleTagsDelete = (i, e, name) => {
    this.setState({
      ...this.state,
      [name]: this.state[name].filter((tag, index) => index !== i),
    }, () => this.validateCustom());
  }

  handleTagsAddition = (tag, name) => {
    let tagFilter = this.state.countries_list.filter(x => x.text === tag.text)[0]
    if (!tagFilter) return false

    this.setState(state => ({...this.state,
      [name]: [...state[name], tagFilter]
    }), () => this.validateCustom());
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

  // checkbox toggler with hidden inputs
  chooseOption = (id, name) => {
    let options = this.state[name]
    let index

    if (options.indexOf(id) === -1) {
     options.push(id)
    } else {
     index = options.indexOf(id)
     options.splice(index, 1)
    }

    // filter out the none tag
    if ( name === "company_relations" ){ // exists only for company relations
      if ( this.state[name].indexOf("None") !== -1 &&
           id !== "None" ){ // None is in state and select is "not None"
        options = options.filter(x => x !== "None")
      }

      if ( id === "None" || options.length === 0){ // when none is selected - set only this and clear prev
        options = ["None"]
      }
    }

    this.setState({
      ...this.state,
      [name]: options
    }, () => this.validateCustom())
  }

  nextStep = (refreshedToken) => {
    const { paidup_capital, paidup_capital_inputs, company_relations, company_relations_inputs, paidup_capital_origins } = this.state;

    // console.log(
    //   'company_relations_inputs', company_relations_inputs,
    //   'company_relations', company_relations
    // )

    let companyRelationsJoined = []

    // join checkbox and input values
    company_relations.forEach( (checkbox, i) => {
      let index = -1
      company_relations_inputs.forEach((input, ind) => {
        if ( checkbox === input.name ){ index = ind }
      })

      if ( index !== -1 ){
        // if matched - add string with the input value
        // companyRelationsJoined += `${checkbox} (${company_relations_inputs[index].value}), `
        // companyRelationsJoined.push({
        //   name: checkbox,
        //   input: company_relations_inputs[index].value
        // })
        companyRelationsJoined.push(`${checkbox} (${company_relations_inputs[index].value})`)
      } else {
        // if empty - only the checkbox value
        // companyRelationsJoined += `${checkbox}, `
        // companyRelationsJoined.push({
        //   name: checkbox,
        //   input: ''
        // })
        companyRelationsJoined.push(`${checkbox}`)
      }
    })


    const leadObj = {
      isproduction: isProduction(),
      // paidup_capital: paidup_capital.join(', '),
      // paidup_capital_inputs: paidup_capital_inputs, // TODO refactor
      // related_entities: companyRelationsJoined,
      // company_relations: companyRelationsJoined,
      capital_origin_countries: paidup_capital_origins.map(x => x.countryCode),
      // paidup_capital_origins: paidup_capital_origins.map(x => `(${x.id}) ${x.text}`).join(', ')  // TODO refactor or send clear values
    }

    console.log({leadObj})
    console.log({refreshedToken})
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

    const { paidup_capital, paidup_capital_inputs, company_relations, company_relations_inputs, paidup_capital_origins } = this.state;

    this.setState({ isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        paidup_capital: paidup_capital,
        paidup_capital_inputs: paidup_capital_inputs,
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

  // custom validator
  validateCustom = (cb) => {
    const {
      paidup_capital, paidup_capital_inputs, company_relations, company_relations_inputs, paidup_capital_origins
    } = this.state;

    let buildErrors = []

    if (paidup_capital.length === 0){ // simple checkbox length validation
      buildErrors.push("paidup_capital")
    } else {
      // check that inputs are not empty
      paidup_capital.forEach( (checkbox, i) => {
        paidup_capital_inputs.forEach((input, ind) => {
          if ( checkbox === input.name ){ // find correspondint input
            if ( input.value.length === 0 ){
              buildErrors.push("paidup_capital")
            }
          }
        })
      })
    }

    if (company_relations.length === 0){ // simple checkbox length validation
      buildErrors.push("company_relations")
    } else {
      // check that inputs are not empty
      company_relations.forEach( (checkbox, i) => {
        company_relations_inputs.forEach((input, ind) => {
          if ( checkbox === input.name ){ // find correspondint input
            if ( input.value.length === 0 ){
              buildErrors.push("company_relations")
            }
          }
        })
      })
    }

    if (paidup_capital_origins.length === 0){ // simple tags validation
      buildErrors.push("paidup_capital_origins")
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
      paidup_capital, paidup_capital_inputs,
      company_relations, company_relations_inputs,
      paidup_capital_origins, countries_list,
      isTransitioningNext
    } = this.state;

    const paidupCapitalOptions = {
      name: 'paidup_capital',
      options: [
        'Investment from local individual shareholder(s)',
        'Investment from foreign individual shareholder(s)',
        'Investment from local corporate shareholder(s)',
        'Investment from foreign corporate shareholder(s)',
        'Loans',
        {
          name: 'Others',
          input: ''
        }
      ]
    }

    const CompanyRelationsOptions = {
      name: 'company_relations',
      options: [
        'None',
        {
          name: 'Subsidiary (or beneficiary) company of',
          input: ''
        },
        {
          name: 'Parent (or benefactor) company of',
          input: ''
        },
        {
          name: 'Others',
          input: ''
        }
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
            ref={this.formRef} >
            <div className="signup__section">
              <div className="signup__section-heading">Source of the company’s paid-up capital</div>
              <div className="signup__checkboxes">
                <label htmlFor="">Select all that is applicable: </label>
                { paidupCapitalOptions.options.map((cb, i) => {
                    const cbValue = typeof(cb) === "string" ? cb : cb.name
                    return(
                      <Fragment>
                        <CheckBox
                          key={i}
                          name={paidupCapitalOptions.name}
                          text={cbValue}
                          clickHandler={this.chooseOption.bind(this, cbValue, paidupCapitalOptions.name)}
                          isActive={paidup_capital.indexOf(cbValue) !== -1 } />
                        { typeof(cb) === "object" &&
                          <FormInput
                            name="paidup_capital_inputs"
                            id={cb.name}
                            placeholder={cb.input}
                            value={paidup_capital_inputs[cb.name]}
                            onChangeHandler={this.handleChangeNested} />
                        }
                      </Fragment>
                    )
                  })
                }
                { this.showError("paidup_capital") }
              </div>
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">Country or countries of origin for paid-up capital</div>
              <div className="ui-group">
                <ReactTags
                  tags={paidup_capital_origins}
                  name="paidup_capital_origins"
                  suggestions={countries_list}
                  placeholder=""
                  handleDelete={this.handleTagsDelete}
                  handleAddition={this.handleTagsAddition}
                  handleDrag={this.handleTagsDrag}
                  delimiters={delimiters}
                  autofocus={false} />
                { this.showError("paidup_capital_origins") }
              </div>
            </div>

            <div className="signup__section">
              <div className="signup__section-heading">Does this company have any related entities?</div>
              <div className="signup__checkboxes">
                <label htmlFor="">Select all that is applicable: </label>
                { CompanyRelationsOptions.options.map((cb, i) => {
                    const cbValue = typeof(cb) === "string" ? cb : cb.name
                    return(
                      <Fragment>
                        <CheckBox
                          key={i}
                          name={CompanyRelationsOptions.name}
                          text={cbValue}
                          clickHandler={this.chooseOption.bind(this, cbValue, CompanyRelationsOptions.name)}
                          isActive={company_relations.indexOf(cbValue) !== -1 } />
                        { typeof(cb) === "object" &&
                          <FormInput
                            name="company_relations_inputs"
                            id={cb.name}
                            placeholder={cb.input}
                            value={company_relations_inputs[cb.name]}
                            onChangeHandler={this.handleChangeNested} />
                        }
                      </Fragment>
                    )
                  })
                }
                { this.showError("company_relations") }
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep6);
