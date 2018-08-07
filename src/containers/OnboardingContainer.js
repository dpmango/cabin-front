import React from 'react';
import { connect } from 'react-redux';
import SvgIcon from '../components/SvgIcon';

class OnboardingContainer extends React.Component {
  render(){
    // 2 steps offset (2 WELCOME SCREENS)
    const {onPrev, onNext, onboardingStep, noProgress} = this.props;
    const fillPercent = Math.round( (onboardingStep - 2) * 100 / 8 , 10)
    return(
      <div className="container">
        {/*  data-aos="fade" removed as potential flicker issue */}
        <div className="signup__box">
          { !noProgress &&
            <div className="signup__progress">
              <div className="signup__progress-line">
                <div className="signup__progress-fill" style={{"width" : fillPercent + "%"}}>
                  <div className={"signup__progress-name " + (onboardingStep === 9 ? "signup__progress-name--last" : "")}>Step {onboardingStep - 2} of 8</div>
                </div>
              </div>
            </div>
          }

          { this.props.children }

        </div>

        <div className="signup__nav">
          <a className="signup__nav-back" onClick={onPrev}>
            <SvgIcon name="back-arrow" />
            <span>Back</span>
          </a>
          <a className="btn btn--small" onClick={onNext}>
            <span>Next</span>
          </a>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => (
  {
    onboardingStep: state.onboarding.onboardingStep
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    // setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingContainer);
