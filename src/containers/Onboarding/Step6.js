import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import { notify } from 'reapop';
import { onboardingApi } from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_AUTHTOKEN } from 'store/ActionTypes';
import Image from 'components/Image';
// import FormInput from 'components/FormInput';
import ReactTags from 'components/ReactTags/ReactTags';
// import { WithContext as ReactTags } from 'react-tag-input'; // changed to /compoinenets call

import { countriesListAutocompleate, delimiters} from 'store/CountriesListAutocompleate';

class OnboardingStep5 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    setOnboardingFields: PropTypes.func,
    setOnboardingId: PropTypes.func,
    onboardingFields: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      consumers_list: props.onboardingFields.consumers_list,
      suppliers_list:  props.onboardingFields.suppliers_list,
      payments_to_list:  props.onboardingFields.payments_to_list,
      payments_from_list: props.onboardingFields.payments_from_list,
      errors: [],
      isTransitioningNext: false,
      isFormSubmitted: false,
      countries_list: []
      // countriesListAutocompleate
    };

    this.formRef = React.createRef();
  }

  componentDidUpdate(){
    // console.log(this.state)
  }

  componentDidMount() {
    this.getCountriesList();
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
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

  // fetch countries from api
  getCountriesList = () => {
    onboardingApi
      .get('countries')
      .then(res => {
        console.log('Backend response to countries GET' , res)
        // transform array
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

    this.setState({
      ...this.state, [name]: newTags
    });
  }

  validateCustom = (cb) => {
    const {
      consumers_list, suppliers_list, payments_to_list, payments_from_list
    } = this.state;

    let buildErrors = []
    if (consumers_list.length === 0){
      buildErrors.push("consumers_list")
    }
    if (suppliers_list.length === 0){
      buildErrors.push("suppliers_list")
    }
    if (payments_to_list.length === 0){
      buildErrors.push("payments_to_list")
    }
    if (payments_from_list.length === 0){
      buildErrors.push("payments_from_list")
    }

    this.setState({
      ...this.state, errors: buildErrors
    }, cb)
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  nextStep = (refreshedToken) => {
    const { consumers_list, suppliers_list, payments_to_list, payments_from_list } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      customer_countries: consumers_list.map(x => x.countryCode),
      // suppliers_list: suppliers_list.map(x => x.countryCode), // TODO - suppliers are missing
      payment_to_countries: payments_to_list.map(x => x.countryCode),
      payment_from_countries: payments_from_list.map(x => x.countryCode)
      // consumers_list: consumers_list.map(x => `(${x.id}) ${x.text}`).join(', '),
      // suppliers_list: suppliers_list.map(x => `(${x.id}) ${x.text}`).join(', '),
      // payments_to_list: payments_to_list.map(x => `(${x.id}) ${x.text}`).join(', '),
      // payments_from_list: payments_from_list.map(x => `(${x.id}) ${x.text}`).join(', ')
    }

    // update the api
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

    const { consumers_list, suppliers_list, payments_to_list, payments_from_list } = this.state;

    this.setState({ ...this.state, isTransitioningNext: true })

    setTimeout(() => {
      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );

      this.props.setOnboardingFields({
        ...this.props.onboardingFields,
        consumers_list: consumers_list,
        suppliers_list: suppliers_list,
        payments_to_list: payments_to_list,
        payments_from_list: payments_from_list
      })

      this.setState({ ...this.state, isTransitioningNext: false })

    }, 400)

  }

  prevStep = () => {
    this.props.setOnboardingStep(
      this.props.onboardingStep - 1
    );
  }

  showError = (name) => {
    if (
      this.state.isFormSubmitted &&
      this.state.errors.indexOf(name) !== -1){
      return <span className="ui-input-validation">Please fill this field</span>
    }
  }

  render(){
    const { countries_list, isTransitioningNext } = this.state;

    const defaultTagProps = (name) => ({
      tags: this.state[name],
      name: name,
      suggestions: countries_list,
      handleDelete: this.handleTagsDelete,
      handleAddition: this.handleTagsAddition,
      handleDrag: this.handleTagsDrag,
      delimiters: delimiters,
      autofocus: false,
      placeholder: "" // leave all input placeholders blank
    })

    return(
      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>We will need to know a little more about the company's customers and suppliers</h2>
        </div>
        <div className="signup__right">
          <Formsy
            className="signup__form"
            onSubmit={this.handleSubmit}
            ref={this.formRef}>
            { /* https://github.com/prakhar1989/react-tags */ }
            <div className="ui-group ui-group--labeled">
              <label htmlFor="">List of countries where the company’s <span class="t-uppercase">customers</span> are located</label>
              <ReactTags
                {...defaultTagProps("consumers_list")} />
              { this.showError("consumers_list") }
            </div>
            <div className="ui-group ui-group--labeled">
              <label htmlFor="">List of countries where the company’s <span class="t-uppercase">suppliers</span> are located</label>
              <ReactTags
                {...defaultTagProps("suppliers_list")} />
              { this.showError("suppliers_list") }
            </div>
            <div className="ui-group ui-group--labeled">
              <label htmlFor="">List of countries that the company is <span class="t-uppercase">making payment</span> to</label>
              <ReactTags
                {...defaultTagProps("payments_to_list")} />
              { this.showError("payments_to_list") }
            </div>
            <div className="ui-group ui-group--labeled">
              <label htmlFor="">List of countries that the company is <span class="t-uppercase">receiving payment</span> from</label>
              <ReactTags
                {...defaultTagProps("payments_from_list")} />
              { this.showError("payments_from_list") }
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep5);
