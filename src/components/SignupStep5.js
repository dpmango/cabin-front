import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_SIGNUP_STEP } from '../store/ActionTypes';

import SvgIcon from '../components/SvgIcon';

class SignupStep5 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
  };

  nextStep = () => {
    this.props.setSignupStep(1);
  }

  render(){
    return(
      <div className="container">
        <div className="signup__box">
          <div className="signup__intro">
            <div className="signup__wrapper">
              <div className="signup__left">
                <div className="signup__avatar signup__avatar--small">
                  <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
                </div>
                <h2>Tell us a little about yourself</h2>
              </div>
              <div className="signup__right">

              </div>
            </div>

            <div className="signup__cta">
              <a href="#" className="btn btn--huge btn--block" onClick={this.nextStep}>
                <span>Next</span>
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

});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep5);
