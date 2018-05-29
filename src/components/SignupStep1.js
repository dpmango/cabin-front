import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_SIGNUP_STEP } from '../store/ActionTypes';

import SvgIcon from '../components/SvgIcon';

class SignupStep1 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
  };

  nextStep = () => {
    this.props.setSignupStep(2);
  }

  render(){
    return(
      <div className="container">
        <div className="signup__box">
          <div className="signup__intro">
            <div className="signup__wrapper">
              <div className="signup__left">
                <div className="signup__avatar signup__avatar--big">
                  <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
                </div>
              </div>
              <div className="signup__right">
                <h2>Hello!</h2>
                <p className="t-paragraph">My name is Rifeng and I am here to help you get started. If you are stuck or have any questions along the way, feel free to give me a call at +65 3158 5495.</p>
                <i className="icon icon-rifeng-sign" />
              </div>
            </div>

            <div className="signup__cta">
              <a href="#" className="btn btn--huge btn--iconed btn--block" onClick={this.nextStep}>
                <span>Let’s get Started</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep1);
