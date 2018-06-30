import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../services/Api';
import buildOptionsString from '../services/buildOptionsString';
// import Formsy from 'formsy-react';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS } from '../store/ActionTypes';
import 'airbnb-js-shims';
import Select from 'react-select';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import {formatDate, formatTime} from '../services/FormatDate';
import SvgIcon from '../components/SvgIcon';
import CheckBox from '../components/CheckBox';

class SignupStep4 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func,
    signupId: PropTypes.number,
    signupFields: PropTypes.object
  };

  constructor(props) {
    super();
    this.state = {
      // date: props.signupFields.date,
      meeting_date: props.signupFields.meeting_date,
      meeting_time: props.signupFields.meeting_time,
      email_instead: props.signupFields.email_instead,
      meeting_time_options: []
    };

    // define selectable times in manager local time
    this.selectableTimes = [
      "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30",
      "14:00", "14:30", "15:00", "15:30",
      "16:00", "16:30", "17:00"
    ]

    this.clientTimeZoneOffset = new Date().getTimezoneOffset();
    // this.clientTimeZoneOffset = 240 // NY (UTC-4) test
    this.managerTimeZoneOffeset = -480 // UTC +8 (Singapure);
    this.timeZoneDiff = this.managerTimeZoneOffeset
    if ( Math.sign(this.clientTimeZoneOffset) === 1 ){
      // if offset is possitive (UTC - timzeone)
      this.timeZoneDiff = Math.abs(this.timeZoneDiff) + this.clientTimeZoneOffset
    } else {
      this.timeZoneDiff = this.timeZoneDiff - this.clientTimeZoneOffset
    }

    // array of available times in client local timezone
    this.selectableTimesLocal = this.selectableTimes.map( x =>
      this.convertToTimeStr(this.convertTimeStr(x) + this.timeZoneDiff));

    // filter out times less 0:00 and more 24:00
    this.selectableTimesInRange = this.selectableTimesLocal.filter( x => {
        return this.convertTimeStr("0:00") <= this.convertTimeStr(x) &&
               this.convertTimeStr("24:00") >= this.convertTimeStr(x)
      }
    );

    // console.log(this.selectableTimesInRange)

    this.clientTimeZoneOffsetVerbose = "GMT" + ((this.clientTimeZoneOffset < 0 ? '+' : '-' ) +
            parseInt(Math.abs(this.clientTimeZoneOffset/60)))
  }

  handleSelectChange = (e) => {
    this.setState({
      meeting_time: e,
    });
  }

  // transform the hour:minute to comparable number
  convertTimeStr = (v, utcToLocal, toUTC) => {
    const times = v.split(':');
    let result = Number(times[0]) * 60 + Number(times[1]);
    if (utcToLocal === true){
      // result = result + this.timeZoneDiff
      if ( Math.sign(this.clientTimeZoneOffset) === 1 ){
        // if offset is possitive (UTC - timzeone)
        // console.log(result, result - this.clientTimeZoneOffset)
        result = result - this.clientTimeZoneOffset
      } else {
        // console.log(result, result - this.clientTimeZoneOffset)
        result = result - this.clientTimeZoneOffset // minus when UTC +
      }

    }
    if (toUTC === true){
      result = result + this.clientTimeZoneOffset
    }
    return result
  }

  // convert number to hour:minute string
  convertToTimeStr = (v) => {
    let hours = Math.floor(v / 60);
    let minutes = '' + Math.abs(v % 60); // to str
    if (minutes.length === 1) minutes = '0' + minutes;
    return [hours, minutes].join(':');
  }

  mapArrToSelect = (arr) => {
    return arr.map( x => {
      let endTime = this.convertToTimeStr( this.convertTimeStr(x) + 15 ) // add 15 mins
      let val = x + ' - ' + endTime
      return { value: val, label: val }
    })
  }

  handleDateChange = (date) => {
    this.setState({
      date: date,
      meeting_date: date ? date._d : null
    });

    if ( date ){
      // var utcDate = new Date(date._d).toISOString();
      // console.log(utcDate)
      var formatedDate = formatDate(date._d);
      var newDate = new Date();
      var todayFormated = formatDate(newDate);
      var todayTime = formatTime(newDate);

      // pass yyyy-mm-dd as a param
      api
      .get('calendar/' + formatedDate)
      .then((res) => {

        // res.data.end and res.data.start comes in UTC
        // [{name: "event", start: "16:30", end: "17:30"}]

        // filter the values
        // The Array.some is used to see if the selectable time is
        // inside of a booked period
        // let TestData = [{start: "00:00", end: "01:00"}];
        let availableDates = this.selectableTimesInRange.filter( x =>
          !res.data.some(y => {
            return this.convertTimeStr(y.start, true) <= this.convertTimeStr(x) &&
                   this.convertTimeStr(y.end, true) >= this.convertTimeStr(x)
          })
        );

        // if selected the today day - filter out past times
        if ( formatedDate === todayFormated ){
          // emulate as some event was created starting at 0:00 and ending at current time
          // x is in local time already, 0:00 is also local
          let todayData = [{start: "00:00", end: todayTime}];
          availableDates = availableDates.filter( x =>
            !todayData.some(y => {
              return this.convertTimeStr(y.start) <= this.convertTimeStr(x) &&
                     this.convertTimeStr(y.end) >= this.convertTimeStr(x)
            })
          );
        }

        // this is just for testing
        let removedDates = this.selectableTimesInRange.filter( x =>
          res.data.some(y => {
            return this.convertTimeStr(y.start, true) <= this.convertTimeStr(x) &&
                   this.convertTimeStr(y.end, true) >= this.convertTimeStr(x)
          })
        );

        console.log('availableDates', availableDates);
        console.log('removedDates', removedDates)

        this.setState({
          meeting_time_options: availableDates
        });
      });
    }
  }

  checkboxClick = () => {
    this.setState({
      email_instead: !this.state.email_instead
    })
  }

  nextStep = () => {

    const { meeting_date, meeting_time, date, email_instead } = this.state;

    let pricingOptionsStr = buildOptionsString(this.props.pricingOptions, this.props.pricingOptionsSub);

    api
      .patch('signup_leads/' + this.props.signupId, {
        signup_lead: {
          meeting_date: meeting_date,
          meeting_time: meeting_time ? meeting_time.label : null,
          email_instead: email_instead,
          ispending: false,
          isfollowup: false,
          pricing_plan: this.props.pricingPlan,
          pricing_options: pricingOptionsStr
        }
      })
      .then((res) => {
        this.props.setSignupStep(5);

        this.props.setSignupFields({
          ...this.props.signupFields,
          date: date,
          meeting_date: meeting_date,
          meeting_time: meeting_time,
          email_instead: email_instead
        })

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

    const { date, meeting_time, focused, email_instead, meeting_time_options } = this.state;

    return(
      <div className="container">
        <div className="signup__box" data-aos="fade-up">
          <div className="signup__progress">
            <div className="signup__progress-line">
              <div className="signup__progress-fill" style={{"width" : "100%"}}>
                <div className="signup__progress-name signup__progress-name--last">Step 3 of 3</div>
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
              <div className={ "signup__datetime " + (email_instead ? "is-disabled" : "") }>
                <div className="signup__datetime-col">
                  <div className={ focused ? 'signup__datepicker is-focused' : 'signup__datepicker' }>
                    <SingleDatePicker
                      date={date} // momentPropTypes.momentObj or null
                      onDateChange={this.handleDateChange} // PropTypes.func.isRequired
                      focused={focused} // PropTypes.bool
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
                      isOutsideRange={(date) => {
                        let day = date._d.getDay()
                        return (day === 6) || (day === 0) ? true : false
                      }}
                    />
                  </div>
                </div>
                <div className="signup__datetime-col">
                  <Select
                    name="meeting_time"
                    searchable={false}
                    autosize={false}
                    value={meeting_time}
                    onChange={this.handleSelectChange}
                    placeholder="Select time"
                    noResultsText="Please select date"
                    options={this.mapArrToSelect(meeting_time_options)}
                  />
                </div>

              </div>
              <div className="signup__datetime-hint">
                Select time in your local timezone {this.clientTimeZoneOffsetVerbose}
              </div>


              <div className="signup__email-instead">
                <div className="ui-group">
                  <CheckBox
                    name="email_instead"
                    isAcitve={email_instead}
                    text="Email me instead"
                    clickHandler={this.checkboxClick}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="signup__nav">
          <a className="signup__nav-back" onClick={this.prevStep}>
            <SvgIcon name="back-arrow" />
            <span>Go Back</span>
          </a>

          <a className="btn btn--huge" onClick={this.nextStep}>
            <span>Submit</span>
          </a>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  signupId: state.signup.signupId,
  signupFields: state.signup.fields,
  pricingPlan: state.pricing.selectedPlan,
  pricingOptions: state.pricing.pricingOptions,
  pricingOptionsSub: state.pricing.pricingOptionsSub
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep4);
