import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_ONBOARDING_I_STEP } from '../../store/ActionTypes';
// import SvgIcon from '../../components/SvgIcon';
import Image from '../../components/Image';

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
            <div className="signup__managers">
              <SignupManager
                name="Secretary"
                image="rifeng-avatar.png"
                title="Named Company Secretary" />
              <SignupManager
                name="Executive"
                image="rifeng-avatar.png"
                title="Corporate Secretarial Executive" />
            </div>
          </div>
          <div className="signup__right signup__right--400">
            <h2>Meet your Cabin team,</h2>
            <p className="t-paragraph"><strong>{"{{Secretary}}"}</strong> and <strong>{"{{Executive}}"}</strong></p>
            <p className="t-paragraph"><strong>{"{{Secretary}}"}</strong> will be the named person listed as your company’s secretary. He will oversee that the administration of all secretarial matters and ensure they comply with the Singapore Companies Act.</p>
            <p className="t-paragraph"><strong>{"{{Executive}}"}</strong> will handle the administration of all secretarial matters and be the main point of contact for any requests you have.</p>
            <p className="t-paragraph">We look forward to working with you.</p>
            <div className="signup__signs-row">
              <i className="icon icon-rifeng-sign" />
              <i className="icon icon-rifeng-sign" />
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const SignupManager = (props) => {
  const { name, image, title } = props
  return (
    <div className="signup__manager">
      <div className="signup__avatar signup__avatar--row">
        <div className="signup__hover-tooltip">
          <div className="signup__hover-wrapper">
            Hi, I’m <span><strong>{"{{name}}"}</strong></span>
          </div>
        </div>
        <Image file={image} />
      </div>
      <div className="signup__manager-name">{title}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  onboardingRandomId: state.onboardingIndividual.onboardingRandomId,
  onboardingStep: state.onboardingIndividual.onboardingStep
});

const mapDispatchToProps = (dispatch) => ({
  setOnboardingStep: (data) => dispatch({ type: SET_ONBOARDING_I_STEP, payload: data }),
  // resetDataLayer: () => dispatch({ type: RESET_DATALAYER }),
  // addToDataLayer: (data) => dispatch({ type: ADD_TO_DATALAYER, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep2);
