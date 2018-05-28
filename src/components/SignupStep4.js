import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_SIGNUP_STEP } from '../store/ActionTypes';
//https://github.com/JedWatson/react-select
import Select from 'react-select';
// https://github.com/airbnb/react-dates

import SvgIcon from '../components/SvgIcon';

class SignupStep4 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      meeting_date: '',
      selectValue: null,
      meeting_time: ''
    };
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal})
  }

  handleSelectChange = (e) => {
    this.setState({
      selectValue: e,
      meeting_time: e ? e.label : null
    });
  }

  nextStep = () => {
    this.props.setSignupStep(5);
  }

  prevStep = () => {
    this.props.setSignupStep(3);
  }

  render(){
    return(
      <div className="container">
        <div className="signup__box">
          <div className="signup__progress">
            <div className="signup__progress-line">
              <div className="signup__progress-fill" style={{"width" : "75%"}}>
                <div className="signup__progress-name">Step 4</div>
              </div>
            </div>
          </div>

          <div className="signup__wrapper">
            <div className="signup__left">
              <div className="signup__avatar signup__avatar--small">
                <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
              </div>
              <h2>Let me know when is a good time to reach out</h2>
            </div>
            <div className="signup__right">
              <div className="ui-group">
                <label htmlFor="">When is a good time for us give you a 15 minutes call to answer any questions you have?</label>
              </div>
              <div className="signup__datetime">
                <div className="signup__datetime-col">

                </div>
                <div className="signup__datetime-col">
                  <Select
                    name="meeting_time"
                    value={this.state.selectValue}
                    onChange={this.handleSelectChange}
                    options={[
                      { value: '08', label: '08:00' },
                      { value: '09', label: '09:00' },
                      { value: '10', label: '10:00' },
                      { value: '11', label: '11:00' },
                      { value: '12', label: '12:00' },
                      { value: '13', label: '13:00' },
                      { value: '14', label: '14:00' },
                      { value: '15', label: '15:00' },
                      { value: '16', label: '16:00' },
                      { value: '17', label: '17:00' },
                      { value: '18', label: '18:00' },
                      { value: '19', label: '19:00' },
                      { value: '20', label: '20:00' },
                      { value: '21', label: '21:00' },
                    ]}
                  />
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="signup__nav">
          <a href="#" className="signup__nav-back" onClick={this.prevStep}>
            <SvgIcon name="back-arrow" />
            <span>Go Back</span>
          </a>

          <a href="#" className="btn btn--huge" onClick={this.nextStep}>
            <span>Submit</span>
          </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep4);
