import React from 'react';
import { connect } from 'react-redux';
import SvgIcon from '../components/SvgIcon';

class SignupContainer extends React.Component {
  render(){

    const {onPrev, onNext, signupStep} = this.props;
    const fillPercent = Math.round( (signupStep - 1) * 100 / 3 , 10)
    return(
      <div className="container">
        { /* data-aos="fade" for the signup__box potentially cased flicker issue */}
        <div className="signup__box">
          <div className="signup__progress">
            <div className="signup__progress-line">
              <div className="signup__progress-fill" style={{"width" : fillPercent + "%"}}>
                <div className={"signup__progress-name " + (signupStep === 4 ? "signup__progress-name--last" : "")}>Step {signupStep - 1} of 3</div>
              </div>
            </div>
          </div>

          { this.props.children }

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
      </div>
    )
  }
}


const mapStateToProps = (state) => (
  {
    signupStep: state.signup.signupStep
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    // setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
