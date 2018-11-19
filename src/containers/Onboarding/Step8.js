import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notify } from 'reapop';
import {Collapse} from 'react-collapse';
import Image from 'components/Image';
import CheckBox from 'components/CheckBox';
import ShareholderTable from 'components/ShareholderTable';
import { individualsShema, corporatesSchema } from 'store/ShareholdersSchema';
import { onboardingApi } from 'services/Api';
// import isProduction from 'services/isProduction';
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

    console.log(props.onboardingFields.shareholders_corporate)
    this.state = {
      haveShareholders: props.onboardingFields.haveShareholders,
      // load table data from
      shareholders_individulas: props.onboardingFields.shareholders_individulas,
      shareholders_corporate: props.onboardingFields.shareholders_corporate,
      // shareholders_individulas:
      //   props.onboardingFields.shareholders_individulas.lenght > 0 ?
      //   props.onboardingFields.shareholders_individulas : this.parseSchema(individualsShema),
      // shareholders_corporate:
      //   props.onboardingFields.shareholders_corporate.lenght > 0 ?
      //   props.onboardingFields.shareholders_corporate : this.parseSchema(corporatesSchema),
      errors: [],
      formIsValid: false,
      isTransitioningNext: false,
      isFormSubmitted: false
    };

    this.formRef = React.createRef();
    this.tableRef = [] // hold an array for tables scrollbars
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log(prevState)
    // premount logic
    if ( prevState.shareholders_individulas.length < 0 ){
      return { shareholders_individulas: this.parseSchema(individualsShema) } // to state
    }
    if ( prevState.shareholders_corporate.length < 0 ){
      return { shareholders_corporate: this.parseSchema(corporatesSchema) } // to state
    } else {
      return null;
    }
  }

  // used in constructor
  parseSchema = (data) => {
    const row1 = data.tbody.map( x => this.buildRowFromSchema(x))
    const row2 = data.tbody.map( x => this.buildRowFromSchema(x))
    return [row1, row2]
  }

  buildRowFromSchema = (x) => {
    return {type: x.type, placeholder: x.placeholder, name: x.name, value: x.value ? x.value : "", error: false }
  }

  componentDidMount() {
    console.log(this.state)
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


  // TABLE FUNCTIONS
  // input functions
  handleInputTableChange = (stateName) => (e, rowIndex, type, placeholder) => {
    // console.log({stateName}, e, rowIndex, type, placeholder)
    let fieldName = e.target.name;
    let fieldVal = e.target.value;

    let cellIndex = this.findCellIndexByName(fieldName, rowIndex, stateName)

    const newObj = {
      type: type,
      placeholder: placeholder,
      name: fieldName,
      value: fieldVal,
      error: false // always clearable on change
    }

    const stateClone = this.state[stateName]; // cloneDeep ?
    stateClone[rowIndex][cellIndex] = newObj

    this.setState({...this.state,
      [stateName]: stateClone
    });

  }

  // checkbox options
  chooseTableOption = (stateName) => (name, rowIndex, type, placeholder, stateName) => {

    let cellIndex = this.findCellIndexByName(name, rowIndex, stateName)

    const stateValue = this.state[stateName][rowIndex][cellIndex].value

    const newObj = {
      type: type,
      placeholder: placeholder,
      name: name,
      value: stateValue === "" ? true : !stateValue, // first click
      error: false // always clearable on change
    }

    const stateClone = this.state[stateName]
    stateClone[rowIndex][cellIndex] = newObj

    this.setState({...this.state,
      [stateName]: stateClone
    })
  }

  findCellIndexByName = (name, rowIndex, stateName) => {
    let cellIndex = -1
    this.state[stateName][rowIndex].forEach( (x,i) => {
      if ( x.name === name ){
        cellIndex = i
      }
    })

    return cellIndex
  }

  // new line
  addNewLine = (name) => {
    const stateClone = this.state[name];

    let schemaObj
    if ( name === "shareholders_individulas" ){
      schemaObj = individualsShema
    } else if ( name === "shareholders_corporate" ){
      schemaObj = corporatesSchema
    }

    stateClone.push(schemaObj.tbody.map( x => this.buildRowFromSchema(x)))

    this.setState({
      ...this.state,
      [name]: stateClone
    })
  }

  componentDidUpdate(){
    console.log('step 8 parent component updated', this.state)
  }

  nextStep = (refreshedToken) => {
    const { shareholders_corporate } = this.state;

    // const leadObj = {
    //   isproduction: isProduction(),
    //   // shareholders_individulas: this.convertStateToStr(shareholders_individulas),
    //   // shareholders_corporate: this.convertStateToStr(shareholders_corporate),
    //   shareholders_individulas_array: JSON.stringify(shareholders_individulas),
    //   shareholders_corporate_array: JSON.stringify(shareholders_corporate)
    // }

    // state transformations and API's

    const leadCoShareholders = shareholders_corporate.map(x => {
      return {
        // companyId: this.props.companyId,
        comp_name: x[0].value, // required
        reg_no: x[1].value,
        // phone: x[4].value,
        is_shareholder_of: this.props.companyId // required
      }
    })

    // clear blank
    leadCoShareholders.filter(x => x.comp_name !== "" && x.reg_no.value !== "")

    if ( leadCoShareholders.length === 0 ){
      // this.showNotificationError({
      //   'corporate_shareholders': 'Corporate shareholders may not be blank'
      // })
      // return
    }

    console.log({leadCoShareholders}, {shareholders_corporate});

    onboardingApi.defaults.headers['Authorization'] = 'JWT ' + ( refreshedToken ? refreshedToken : this.props.onboardingToken )

    onboardingApi
      .post('corporate-shareholder/new', leadCoShareholders)
      .then(res => {
        console.log('Backend response to corporate-shareholder POST' , res)
        this.postUsers(res.data)
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 401){
          this.refreshToken();
        } else if (err.response.status === 400){ // bad data
          this.showNotificationError(err.response.data)
        }
      })
  }

  postUsers = (corporate_shareholders, refreshedToken) => {
    const { shareholders_individulas, shareholders_corporate } = this.state;

    let leadCorporate = shareholders_corporate.map(x => {
      console.log('finding representing_corporate_shareholder', {corporate_shareholders}, corporate_shareholders.filter(y => y.comp_name === x[0].value))
      return {
        name	                : x[2].value, // The user's name
        id_no                 : parseInt(x[3].value, 10),	// The user's identification number
        phone	                : x[4].value, // The user's phone number
        email	                : x[5].value, // The user's email address
        assistant_email	      : x[6].value, // The assistant's email address. Useful if they prefer we forward the link to their administrative assistant.
        representing_company  : this.props.companyId, // The company id that the user is representing
        representing_corporate_shareholder	: corporate_shareholders.filter(y => y.comp_name === x[0].value)[0].id, // The corporate shareholder id that the user is representing
      }
    })

    let leadIndividual = shareholders_individulas.map(x => {
      return {
        name	                : x[0].value, // The user's name
        id_no                 : parseInt(x[1].value, 10),	// The user's identification number
        phone	                : x[2].value, // The user's phone number
        email	                : x[3].value, // The user's email address
        is_singaporean        : x[4].value, // Whether the user is a singaporean citizen
        representing_company  : this.props.companyId, // The company id that the user is representing
        is_shareholder_of	    : x[5].value ? this.props.companyId : false, // The company that the user holds shares in
        is_director_of	      : x[6].value ? this.props.companyId : false, // The company id that the user is a director of
      }
    })

    const leadUsers = [...leadCorporate, ...leadIndividual]

    console.log({leadUsers})

    onboardingApi.defaults.headers['Authorization'] = 'JWT ' + ( refreshedToken ? refreshedToken : this.props.onboardingToken )

    // create users
    onboardingApi
      .post('user/new', leadUsers)
        .then(res => {
          console.log('Backend response to user POST' , res)
          this.updateSignup()
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.status === 401){
            this.refreshToken();
          } else if (err.response.status === 400){ // bad data
            this.showNotificationError(err.response.data)
          }
        })
  }

  keysToWord = (x) => {
    switch (x) {
      case "comp_name":
        return "Company name"
      case "email":
        return "Email"
      case "id":
        return "ID"
      case "phone":
        return "Phone number"
      default:
        return x
    }
  }

  showNotificationError = (data) => {
    const message = Object.keys(data).map(x => `${this.keysToWord(x)} : ${data[x]}`)

    this.props.notify({
      title: `Whoops! Please fix following:`,
      message: message,
      status: 'default', // default, info, success, warning, error
      dismissible: true,
      dismissAfter: 4000,
    })
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

    // shareholders table to be processed in separate component

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
      state: {haveShareholders, shareholders_corporate, shareholders_individulas, isTransitioningNext}
    } = this

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
            <Fragment>
              <ShareholderTable
                onRef={(ref) => { this.tableRef[1] = ref; }}
                title="List of corporate shareholder(s)"
                titleTooltip="There will be an additional fee of S$100 per year if a corporate shareholder holds a 25% or more stake in the company. This is to account for the additional due diligence and compliance processes required by MAS’s anti-money laundering regulation."
                addMoreText="Additional corporate entity"
                schema={corporatesSchema}
                data={shareholders_corporate}
                onAddNewLine={this.addNewLine.bind(this, "shareholders_corporate")}
                onCheckboxChangeHandler={this.chooseTableOption("shareholders_corporate")}
                onInputChangeHandler={this.handleInputTableChange("shareholders_corporate")}
              />

              <ShareholderTable
                onRef={(ref) => { this.tableRef[0] = ref; }}
                title="List of all non-corporate stakeholder(s) (shareholders and directors)"
                titleTooltip="There will be an additional fee of S$25 per stakeholder per year after that fifth key stakeholder. This is to account for the additional administrative and recording keeping processes required."
                addMoreText="Additional stakeholders"
                schema={individualsShema}
                data={shareholders_individulas}
                onAddNewLine={this.addNewLine.bind(this, "shareholders_individulas")}
                onCheckboxChangeHandler={this.chooseTableOption("shareholders_individulas")}
                onInputChangeHandler={this.handleInputTableChange("shareholders_individulas")}
              />
            </Fragment>
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
