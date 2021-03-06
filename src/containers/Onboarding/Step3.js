import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_ONBOARDING_STEP } from 'store/ActionTypes';
// import SvgIcon from 'components/SvgIcon';
import Image from 'components/Image';

class OnboardingStep2 extends Component {
  static propTypes = {
    setOnboardingStep: PropTypes.func,
    onboardingRandomId: PropTypes.string,
    // resetDataLayer: PropTypes.func,
    // addToDataLayer: PropTypes.func
  };

  constructor(props){
    super(props);

    this.state = {
      isTransitioningNext: false,
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  prevStep = () => {
    this.props.setOnboardingStep(
      this.props.onboardingStep - 1
    );
  }

  submitForm = () => {
    this.setState({ isTransitioningNext: true })

    setTimeout(() => {

      this.props.setOnboardingStep(
        this.props.onboardingStep + 1
      );
      this.setState({ isTransitioningNext: false })

    }, 400)
  }

  render(){

    const { isTransitioningNext } = this.state

    return(

      <div className={"signup__intro"}>
        <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "") } data-aos="fade-left">
          <div className="signup__left">
            <div className="signup__avatar signup__avatar--big">
              <Image file="rifeng-avatar.png" />
            </div>
          </div>
          <div className="signup__right signup__right--longer">
            <h2>This won’t take long.</h2>
            <p className="t-paragraph">The entire process will take approximately 5 minutes to complete.</p>
            <p className="t-paragraph">Bear with us as some of the questions require a more detailed understanding of your business and its activities. This is mandated as part of <strong>MAS’s anti-money laundering and anti-terrorism financing measures</strong>, ACRA instituted an Enhanced Regulatory Framework that took effect on 15th May 2015. We are therefore required by law to conduct a set of Customer Due Diligence (CDD) procedures before we can provide any form of corporate service to our customers (also known as Know Your Customer or Customer Acceptance procedures).</p>
            <p className="t-paragraph">Let’s get started!</p>

          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  onboardingRandomId: state.onboarding.onboardingRandomId,
  onboardingStep: state.onboarding.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_STEP, payload: data }),
  // resetDataLayer: () => dispatch({ type: RESET_DATALAYER }),
  // addToDataLayer: (data) => dispatch({ type: ADD_TO_DATALAYER, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep2);
