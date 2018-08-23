import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../services/Api';
import isProduction from '../services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_ID } from '../store/ActionTypes';
import Image from '../components/Image';
// import FormInput from '../components/FormInput';
import ReactTags from '../components/ReactTags/ReactTags';
// import { WithContext as ReactTags } from 'react-tag-input'; // changed to /compoinenets call

import { countriesListAutocompleate, delimiters} from '../store/CountriesListAutocompleate';

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
      formIsValid: false,
      isTransitioningNext: false,
      isFormSubmitted: false,
      countries_list: countriesListAutocompleate
    };

    this.formRef = React.createRef();
  }

  componentDidUpdate(){
    // console.log(this.state)
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
    // TODO - some kind of validation here?
    // if ( this.state.formIsValid ){
      this.nextStep();
      this.setState({isFormSubmitted: false}) // reset state here
    // }
  }

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

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  nextStep = () => {
    const { consumers_list, suppliers_list, payments_to_list, payments_from_list } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      consumers_list: consumers_list.map(x => `(${x.id}) ${x.text}`).join(', '),
      suppliers_list: suppliers_list.map(x => `(${x.id}) ${x.text}`).join(', '),
      payments_to_list: payments_to_list.map(x => `(${x.id}) ${x.text}`).join(', '),
      payments_from_list: payments_from_list.map(x => `(${x.id}) ${x.text}`).join(', ')
    }

    // update the api
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

    const { consumers_list, suppliers_list, payments_to_list, payments_from_list } = this.state;

    this.setState({ isTransitioningNext: true })

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

      this.setState({ isTransitioningNext: false })

    }, 400)

  }

  prevStep = () => {
    this.props.setOnboardingStep(
      this.props.onboardingStep - 1
    );
  }

  render(){
    const { consumers_list, suppliers_list, payments_to_list, payments_from_list, countries_list, isTransitioningNext } = this.state;
    return(

      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <Image file="rifeng-avatar.png" />
          </div>
          <h2>We will need to know a little more about the company's customers and suppliers</h2>
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
            { /* https://github.com/prakhar1989/react-tags */ }
            <div className="ui-group">
              <ReactTags
                tags={consumers_list}
                name="consumers_list"
                suggestions={countries_list}
                placeholder="List of countries where your customers are located"
                handleDelete={this.handleTagsDelete}
                handleAddition={this.handleTagsAddition}
                handleDrag={this.handleTagsDrag}
                delimiters={delimiters}
                autofocus={false} />
            </div>
            <div className="ui-group">
              <ReactTags
                tags={suppliers_list}
                name="suppliers_list"
                suggestions={countries_list}
                placeholder="List of countries where your suppliers are located"
                handleDelete={this.handleTagsDelete}
                handleAddition={this.handleTagsAddition}
                handleDrag={this.handleTagsDrag}
                delimiters={delimiters}
                autofocus={false} />
            </div>
            <div className="ui-group">
              <ReactTags
                tags={payments_to_list}
                name="payments_to_list"
                suggestions={countries_list}
                placeholder="List of countries that you are making payment to"
                handleDelete={this.handleTagsDelete}
                handleAddition={this.handleTagsAddition}
                handleDrag={this.handleTagsDrag}
                delimiters={delimiters}
                autofocus={false} />
            </div>
            <div className="ui-group">
              <ReactTags
                tags={payments_from_list}
                name="payments_from_list"
                suggestions={countries_list}
                placeholder="List of countries that you are receiving payment from"
                handleDelete={this.handleTagsDelete}
                handleAddition={this.handleTagsAddition}
                handleDrag={this.handleTagsDrag}
                delimiters={delimiters}
                autofocus={false} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep5);
