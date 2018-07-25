import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_SIGNUP_STEP, ADD_TO_DATALAYER, RESET_DATALAYER } from '../store/ActionTypes';
// import { pushToDataLayer } from '../reducers/gtm';
// import GoogleTagManager from '../components/GoogleTagManager';
import SvgIcon from '../components/SvgIcon';

class SignupStep1 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    signupRandomId: PropTypes.string,
    resetDataLayer: PropTypes.func,
    addToDataLayer: PropTypes.func
  };

  componentDidMount(){
    const gtmEvent = {
      event: 'gtm.getStartedInitiated',
      lead: {
        leadId: this.props.signupRandomId
      }
    }
    this.props.resetDataLayer();
    this.props.addToDataLayer(gtmEvent);
  }

  nextStep = () => {
    this.props.setSignupStep(2);
  }

  render(){
    return(
      <div className="container">
        {/* <GoogleTagManager
          gtmId='GTM-N6T8GZP'
          additionalEvents={gtmEvent}
        /> */}
        { /* to do - set delay to fade out before page transition? */ }
        <div className="signup__box" data-aos="fade">
          <div className="signup__intro">
            <div className="signup__wrapper">
              <div className="signup__left">
                <div className="signup__avatar signup__avatar--big">
                  <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
                </div>
              </div>
              <div className="signup__right signup__right--no-pad">
                <h2>Hello!</h2>
                <p className="t-paragraph">My name is Rifeng and I am here to help you get started. If you are stuck or have any questions along the way, feel free to give me a call at <a href="tel:+65 3158 5495">+65 3158 5495</a>.</p>
                <i className="icon icon-rifeng-sign" />
              </div>
            </div>

            <div className="signup__cta">
              <a className="btn btn--huge btn--iconed btn--block" onClick={this.nextStep}>
                <span>Let’s get started</span>
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
  signupRandomId: state.signup.signupRandomId
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  resetDataLayer: () => dispatch({ type: RESET_DATALAYER }),
  addToDataLayer: (data) => dispatch({ type: ADD_TO_DATALAYER, data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep1);
