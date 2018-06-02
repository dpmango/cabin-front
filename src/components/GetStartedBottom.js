import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignupEmail from '../components/SignupEmail';

class GetStartedBottom extends Component {
  static propTypes = {
    signupStep: PropTypes.number
  };

  render(){
    // if ( this.props.signupStep === 5 ){
    //   return null
    // }
    return(
      <div className="bottom-cta" data-aos="fade-up">
        <div className="container">
          <div className="bottom-cta__wrapper">
            <h1>Get Started Today</h1>
            <p className="t-paragraph">Focus on running your business. Let us handle the rest.</p>
            <SignupEmail extraClass="bottom-cta__form" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  signupStep: state.signup.signupStep,
});

const mapDispatchToProps = (dispatch) => ({  });

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedBottom);
