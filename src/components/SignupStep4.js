import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_SIGNUP_STEP } from '../store/ActionTypes';
//https://github.com/JedWatson/react-select
import Select from 'react-select';
// https://github.com/airbnb/react-dates
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import SvgIcon from '../components/SvgIcon';

class SignupStep4 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    signupId: PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      // date: {}, // moment obj
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

  handleDateChange = (date) => {
    this.setState({
      date: date,
      meeting_date: date ? date._d : null
    });
  }

  nextStep = () => {
    api
      .patch('signup_leads/' + this.props.signupId, {
        signup_lead: {
          meeting_date: this.state.meeting_date,
          meeting_time: this.state.meeting_time
        }
      })
      .then((res) => {
        this.props.setSignupStep(5);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  prevStep = () => {
    this.props.setSignupStep(3);
  }

  render(){
    const datePickerIcon = (
      <SvgIcon name="select-arrow" />
    )
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
                  <div className={ this.state.focused ? 'signup__datepicker is-focused' : 'signup__datepicker' }>
                    <SingleDatePicker
                      date={this.state.date} // momentPropTypes.momentObj or null
                      onDateChange={this.handleDateChange} // PropTypes.func.isRequired
                      focused={this.state.focused} // PropTypes.bool
                      placeholder="Select date"
                      noBorder={true}
                      block={true}
                      hideKeyboardShortcutsPanel={true}
                      // showDefaultInputIcon={true}
                      customInputIcon={datePickerIcon}
                      inputIconPosition="after"
                      displayFormat="DD-MM-YYYY"
                      anchorDirection="left"
                      numberOfMonths={1}
                      horizontalMargin={0}
                      onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                      id="datepicker" // PropTypes.string.isRequired,
                    />
                  </div>
                </div>
                <div className="signup__datetime-col">
                  <Select
                    name="meeting_time"
                    value={this.state.selectValue}
                    onChange={this.handleSelectChange}
                    placeholder="Select time"
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
  signupId: state.signup.signupId
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep4);
