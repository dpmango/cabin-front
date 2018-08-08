import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import api from '../services/Api';
import isProduction from '../services/isProduction';
import { SET_ONBOARDING_STEP, SET_ONBOARDING_FIELDS, SET_ONBOARDING_ID } from '../store/ActionTypes';
import Image from '../components/Image';
import FormInput from '../components/FormInput';
import { WithContext as ReactTags } from 'react-tag-input';
import countriesListAutocompleate from '../store/CountriesListAutocompleate';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

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

  // tags management
  handleTagsDelete = (i) => {
    const { consumers_list } = this.state;
    this.setState({
      consumers_list: consumers_list.filter((tag, index) => index !== i),
    });
  }

  handleTagsAddition = (tag) => {
    this.setState(state => ({
      consumers_list: [...state.consumers_list, tag]
    }));
  }

  handleTagsDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.consumers_list];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ consumers_list: newTags });
  }

  // click handler for the button
  submitForm = () => {
    this.formRef.current.submit();
  }

  nextStep = () => {
    const { consumers_list, suppliers_list, payments_to_list, payments_from_list } = this.state;

    const leadObj = {
      isproduction: isProduction(),
      consumers_list: consumers_list,
      suppliers_list: suppliers_list,
      payments_to_list: payments_to_list,
      payments_from_list: payments_from_list
    }

    // if signup ID is present - then update by PATCH
    // else - create new
    // if ( this.props.signupId ){
    //   // patch lead
    //   api
    //     .patch('signup_leads/' + this.props.signupId, {
    //       signup_lead: leadObj
    //     })
    //     .then((res) => {
    //       this.updateSignup()
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // } else {
    //   // create new instance
    //   api
    //     .post(`signup_leads`, {
    //       signup_lead: leadObj
    //     })
    //     .then((res) => {
    //       this.props.setSignupId(res.data.id);
    //       this.props.setSignupEmail(res.data.email);
    //       this.updateSignup();
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }

    this.updateSignup();

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
                delimiters={delimiters} />
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
                delimiters={delimiters} />
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
                delimiters={delimiters} />
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
                delimiters={delimiters} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep5);
