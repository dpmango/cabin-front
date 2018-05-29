import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../services/Api';
import { SET_SIGNUP_STEP } from '../store/ActionTypes';

import SvgIcon from '../components/SvgIcon';

class SignupStep2 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    signupId: PropTypes.number,
    signupEmail: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      company_name: '',
      email: '',
      phone: ''
    };

  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal})
  }

  nextStep = () => {
    // patch lead
    api
      .patch('signup_leads/' + this.props.signupId, {
        signup_lead: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          company_name: this.state.company_name,
          // email: '', // why do we update ?
          phone: this.state.phone,
        }
      })
      .then((res) => {
        this.props.setSignupStep(3);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  prevStep = () => {
    this.props.setSignupStep(1);
  }

  render(){
    return(
      <div className="container">
        <div className="signup__box">

          <div className="signup__progress">
            <div className="signup__progress-line">
              <div className="signup__progress-fill" style={{"width" : "25%"}}>
                <div className="signup__progress-name">Step 2</div>
              </div>
            </div>
          </div>
          <div className="signup__wrapper">
            <div className="signup__left">
              <div className="signup__avatar signup__avatar--small">
                <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
              </div>
              <h2>Tell us a little about yourself</h2>
            </div>
            <div className="signup__right">
              <form action="" className="signup__form">
                <div className="ui-group">
                  <input type="text" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange}/>
                </div>
                <div className="ui-group">
                  <input type="text" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.handleChange}/>
                </div>
                <div className="ui-group">
                  <input type="text" name="company_name" placeholder="Company Name" value={this.state.company_name} onChange={this.handleChange}/>
                </div>
                <div className="ui-group">
                  <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                </div>
                <div className="ui-group">
                  <input type="text" name="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.handleChange}/>
                </div>
              </form>
            </div>
          </div>

        </div>

        <div className="signup__nav">
          <a href="#" className="signup__nav-back" onClick={this.prevStep}>
            <SvgIcon name="back-arrow" />
            <span>Go Back</span>
          </a>

          <a href="#" className="btn btn--small" onClick={this.nextStep}>
            <span>Next</span>
          </a>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  signupEmail: state.signup.signupEmail,
  signupId: state.signup.signupId
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep2);
