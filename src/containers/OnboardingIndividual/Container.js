import React from 'react';
import { connect } from 'react-redux';

class OnboardingContainer extends React.Component {
  render(){
    // 2 steps offset (2 WELCOME SCREENS)
    const {onPrev, onNext, onboardingStep, noProgress} = this.props;
    const fillPercent = Math.round( (onboardingStep - 3) * 100 / 5 , 10)
    return(
      <div className="container">
        {/*  data-aos="fade" removed as potential flicker issue */}
        <div className="signup__box">
          { !noProgress &&
            <div className="signup__progress">
              <div className="signup__progress-line">
                <div className="signup__progress-fill" style={{"width" : fillPercent + "%"}}>
                  <div className={"signup__progress-name " + (onboardingStep === 8 ? "signup__progress-name--last" : "")}>Step {onboardingStep - 3} of 5</div>
                </div>
              </div>
            </div>
          }

          { this.props.children }

          <div className="signup__nav">
            <a className="btn btn-gray btn--huge" onClick={onPrev}>
              <span>Back</span>
            </a>
            <a className="btn btn--huge" onClick={onNext}>
              <span>Next</span>
            </a>
          </div>

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => (
  {
    onboardingStep: state.onboardingIndividual.onboardingStep
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    // setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingContainer);
