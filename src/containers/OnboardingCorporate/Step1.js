import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_ONBOARDING_C_STEP } from 'store/ActionTypes';
import SvgIcon from 'components/SvgIcon';
import Image from 'components/Image';

class OnboardingStep1 extends Component {
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

  componentDidMount(){
    // const gtmEvent = {
    //   event: 'gtm.getStartedInitiated',
    //   lead: {
    //     leadId: this.props.signupRandomId
    //   }
    // }
    // if ( this.props.signupStep === 1 && window.location.pathname.split('/')[2] === "hello" ){
    //   this.props.resetDataLayer();
    //   this.props.addToDataLayer(gtmEvent);
    // }
  }

  nextStep = () => {
    this.setState({ isTransitioningNext: true })

    setTimeout(() => {

      this.props.setOnboardingStep(2);
      this.setState({ isTransitioningNext: false })

    }, 400)

  }

  render(){

    const { isTransitioningNext } = this.state;

    return(
      <div className="container">
        { /* to do - set delay to fade out before page transition? */ }
        <div className={"signup__box"} data-aos="fade">
          <div className={"signup__intro"}>
            <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "") }>
              <div className="signup__left">
                <div className="signup__avatar signup__avatar--onboarding">
                  <Image file="onboarding.png" />
                </div>
              </div>
              <div className="signup__right">
                <h2>Hello!</h2>
                <p className="t-paragraph"><strong>{"{{Company name}}"}</strong>, has chosen Cabin as its company secretary. </p>
                <p className="t-paragraph">As a corporate shareholder of {"{{Company name}}"}, we will need your help with some basic questions, declarations, and verification. It will be helpful if you have ready a soft copy of the following items:</p>
                <div className="signup-sucess__links">
                  <a href=""><span>A copy of your company’s Certificate of Registration</span> (BizFile or the equivalent in your country)</a>
                  <a href=""><span>A copy of your Certificate of Appointment of Corporate Representative</span> (this can be obtained from your company’s secretary)</a>
                </div>
                <p className="t-paragraph">First up, let’s meet your Cabin team </p>
              </div>
            </div>

            <div className="signup__cta">
              <a className="btn btn--huge btn--iconed btn--block" onClick={this.nextStep}>
                <span>Meet your Cabin team</span>
                <SvgIcon name="next-arrow" />
              </a>
            </div>
          </div>

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  onboardingRandomId: state.onboardingCorporate.onboardingRandomId,
  onboardingStep: state.onboardingCorporate.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_C_STEP, payload: data }),
  // resetDataLayer: () => dispatch({ type: RESET_DATALAYER }),
  // addToDataLayer: (data) => dispatch({ type: ADD_TO_DATALAYER, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep1);
