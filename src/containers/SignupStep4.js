import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../services/Api';
import isProduction from '../services/isProduction';
import buildOptionsString from '../services/buildOptionsString';
// import Formsy from 'formsy-react';
import { SET_SIGNUP_STEP, SET_SIGNUP_FIELDS, SET_PRICING_PLAN } from '../store/ActionTypes';
import 'airbnb-js-shims';
import Select from 'react-select';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'moment-timezone';
import {formatDate, formatTime} from '../services/FormatDate';
import SvgIcon from '../components/SvgIcon';
import CheckBox from '../components/CheckBox';

class SignupStep4 extends Component {
  static propTypes = {
    setSignupStep: PropTypes.func,
    setSignupFields: PropTypes.func,
    signupId: PropTypes.number,
    signupFields: PropTypes.object,
    setPricingPlan: PropTypes.func
  };

  constructor(props) {
    super();
    this.state = {
      selected_plan: this.converSelectedPlanToSelect(props.pricingPlan),
      // date: props.signupFields.date,
      meeting_date: props.signupFields.meeting_date,
      meeting_time: props.signupFields.meeting_time,
      meeting_time_blank: "Please select date",
      email_instead: props.signupFields.email_instead,
      meeting_time_options: [],
      isTransitioningNext: false,
      validationMessage: ""
    };

    // define selectable times in manager local time
    this.selectableTimes = [
      "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30",
      "14:00", "14:30", "15:00", "15:30",
      "16:00", "16:30", "17:00"
    ];

    this.useTomorrow = false;
    this.curDate = new Date();
    this.todayFormated = formatDate(this.curDate);
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
    this.selectableTimesInRange = this.selectableTimes.reduce((acc, value) => {
      const dayInMinutes = 1440;
      const timeInMinutes = this.convertTimeStr(value);
      let shiftedTime = timeInMinutes + this.timeZoneDiff;
      if (shiftedTime >= dayInMinutes) {
        shiftedTime -= dayInMinutes;
        this.useTomorrow = true;
      }

      return [...acc, this.convertToTimeStr(shiftedTime)];
    }, []);

    this.clientTimeZoneOffsetVerbose = "GMT" + ((this.clientTimeZoneOffset < 0 ? '+' : '-' ) +
      parseInt(Math.abs(this.clientTimeZoneOffset/60),10))
  }

  componentDidMount() {
    isProduction()
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  converSelectedPlanToSelect = (val) => {
    if ( val === "General" ){
      return "I don't know"
    } else {
      return val
    }
  }

  handleSelectChange = (name, e) => {
    this.setState({...this.state, [name]: e});

    if ( name === "meeting_time" ){
      this.setState({
        validationMessage: ""
      })
    }
    if ( name === "selected_plan" ){
      if ( e.label === "I don't know" ){
        this.props.setPricingPlan("General");
      } else {
        this.props.setPricingPlan(e.label);
      }

    }
  }

  // transform the hour:minute to comparable number
  convertTimeStr = (v, utcToLocal, toUTC) => {
    const times = v.split(':');
    let result = Number(times[0]) * 60 + Number(times[1]);
    if (utcToLocal === true){
      result = result - this.clientTimeZoneOffset
    }
    if (toUTC === true){
      result = result + this.clientTimeZoneOffset
    }
    return result
  }

  splitForTwoDays = times => {
    let dayOne = [];
    let dayNext = [];
    let tick = false
    times.forEach(time => {
      if (!tick && time !== '0:00') {
        dayOne.push(time)
      } else {
        dayNext.push(time);
        tick = true;
      }
    });

    return {
      dayOne,
      dayNext
    }
  };

  // convert number to hour:minute string
  convertToTimeStr = (v) => {
    let hours = Math.floor(v / 60);
    let minutes = '' + Math.abs(v % 60); // to str
    if (minutes.length === 1) minutes = '0' + minutes;
    return [hours, minutes].join(':');
  };

  mapArrToSelectWithEnd = (arr) => {
    return arr.map( x => {
      let endTime = this.convertToTimeStr( this.convertTimeStr(x) + 15 ) // add 15 mins
      let val = x + ' - ' + endTime
      return { value: val, label: val }
    })
  };

  mapArrToSelect = (arr) => {
    return arr.map( x => {
      return { value: x, label: x }
    })
  }

  // filter the calendar responce dates
  selectAvailableDates = (selectableTimes, data) =>
    selectableTimes.filter( x =>
      !data.some(y => {
        return this.convertTimeStr(y.start, true) - 30 <= this.convertTimeStr(x) &&
          this.convertTimeStr(y.end, true) + 30 >= this.convertTimeStr(x)
      })
    );

  // when date is selected
  handleDateChange = (date) => {
    this.setState({
      date: date,
      meeting_date: date ? date._d : null,
      meeting_time: null, // clear time when new date is selected,
      validationMessage: "" // clear validation error
    });

    if ( date ){
      // var utcDate = new Date(date._d).toISOString();
      // console.log(utcDate)

      var newDate = new Date();
      var todayTime = formatTime(newDate);

      const mDate = moment(date._d);
      const mDateFormatted = mDate.format("YYYY-MM-DD");
      const mDateTomorrow = mDate.add(1, 'days');
      const formatDateIfToday = (dates) => {
        // emulate as some event was created starting at 0:00 and ending at current time
        // x is in local time already, 0:00 is also local
        let todayData = [{start: "00:00", end: todayTime}];
        return dates.filter( x =>
          !todayData.some(y => {
            return this.convertTimeStr(y.start) <= this.convertTimeStr(x) &&
              this.convertTimeStr(y.end) >= this.convertTimeStr(x)
          })
        );
      };

      if (this.useTomorrow) {
        const mDateTomorrowFormatted = mDateTomorrow.format("YYYY-MM-DD");
        const twoDays = this.splitForTwoDays(this.selectableTimesInRange)

        api.get('calendar/' + mDateFormatted)
          .then((res) => this.selectAvailableDates(twoDays.dayOne, res.data))
          .then((deyOneTimes) => {
            api.get('calendar/' + mDateTomorrowFormatted)
              .then((res) => {
                // console.log('deyOneTimes', deyOneTimes);
                let tomorrowTimes = this.selectAvailableDates(twoDays.dayNext, res.data);
                // console.log('tomorrowTimes', tomorrowTimes);
                return [...deyOneTimes, ...tomorrowTimes]
              }).then(dates => {
              // console.log('>>>', dates);
              let availableDates = dates;
              // if selected the today day - filter out past times
              if ( mDateFormatted === this.todayFormated ){
                availableDates = formatDateIfToday(availableDates);
              }
              this.setAvailableDates(availableDates);
            });
          })
      } else {
        // pass yyyy-mm-dd as a param
        api.get('calendar/' + mDateFormatted)
          .then((res) => {
            // res.data.end and res.data.start comes in UTC
            // [{name: "event", start: "16:30", end: "17:30"}]

            // filter the values
            let availableDates = this.selectAvailableDates(this.selectableTimesInRange, res.data);

            // if selected the today day - filter out past times
            if ( mDateFormatted === this.todayFormated ){
              availableDates = formatDateIfToday(availableDates);
            }

            // this is just for testing
            // let removedDates = this.selectableTimesInRange.filter( x =>
            //   res.data.some(y => {
            //     return this.convertTimeStr(y.start, true) - 30 <= this.convertTimeStr(x) &&
            //       this.convertTimeStr(y.end, true) + 30 >= this.convertTimeStr(x)
            //   })
            // );

            // console.log('availableDates', availableDates);
            // console.log('removedDates', removedDates);
            this.setAvailableDates(availableDates);
          });
      }
    }
  };

  setAvailableDates = (dates) => {
    if ( dates.length !== 0 ){
      this.setState({
        meeting_time_options: dates,
        meeting_time_blank: "Please select date"
      });
    } else {
      this.setState({
        meeting_time_options: dates,
        meeting_time_blank: "No time slots available"
      });
    }
  }
  checkboxClick = () => {
    this.setState({
      email_instead: !this.state.email_instead,
      validationMessage: ""
    })
  }

  submitForm = () => {
    // trigger from SignupContainer via refs
    const { meeting_date, meeting_time, email_instead } = this.state;

    // validation logic
    if ( ( meeting_date && meeting_time) || (email_instead) ){
      this.setState({
        validationMessage: ""
      }, () => this.nextStep())

    } else {
      this.setState({
        validationMessage: "Let us know when is a good time to chat?"
      })
    }
  }

  nextStep = () => {

    const { meeting_date, meeting_time, date, selected_plan, email_instead } = this.state;

    let pricingOptionsStr = buildOptionsString(this.props.pricingOptions, this.props.pricingOptionsSub);

    // convert selected date & time to UTC +8
    let SingaporeDateDate = ""
    let SingaporeDateTime = ""

    if ( !email_instead ){
      const fTime = meeting_time.label.split(' -')[0]
      const [fTimeHour, fTimeMinute] = fTime.split(':');
      const fDate = moment(meeting_date).hour(fTimeHour).minute(fTimeMinute).utc(); // for some reason utc is requred
      const fDateTimeZone = moment.tz(fDate.format("YYYY-MM-DD HH:mm"), moment.tz.guess())
      const SingaporeDate = fDateTimeZone.clone().tz("Asia/Singapore")

      SingaporeDateDate = SingaporeDate.format("YYYY-MM-DD")
      SingaporeDateTime = SingaporeDate.format("HH:mm")
    }

    api
      .patch('signup_leads/' + this.props.signupId, {
        signup_lead: {
          isProduction: isProduction(),
          meeting_date: SingaporeDateDate,
          meeting_time: SingaporeDateTime,
          selected_plan: selected_plan ? selected_plan.label : null,
          email_instead: email_instead,
          ispending: false,
          isfollowup: false,
          pricing_plan: this.props.pricingPlan,
          pricing_options: pricingOptionsStr
        }
      })
      .then((res) => {

        this.setState({ isTransitioningNext: true })

        setTimeout(() => {
          this.props.setSignupStep(5);

          this.props.setSignupFields({
            ...this.props.signupFields,
            date: date,
            meeting_date: meeting_date,
            meeting_time: meeting_time,
            selected_plan: selected_plan,
            email_instead: email_instead
          })

          this.setState({ isTransitioningNext: false });

        }, 400)

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

    const { date, meeting_time, meeting_time_blank, focused, selected_plan, email_instead, meeting_time_options, isTransitioningNext, validationMessage } = this.state;

    const plansSelect = [
      "Incorporation",
      "Corporate Secretary",
      "Annual Reporting",
      "Monthly Reporting",
      "Customised Finance Team",
      "Dormant",
      "I don't know"
    ]

    return(
      <div className={"signup__wrapper " + (isTransitioningNext ? "fade-out" : "")} data-aos="fade-left">
        <div className="signup__left">
          <div className="signup__avatar signup__avatar--small">
            <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
          </div>
          <h2>Let me know when is a good time to reach out?</h2>
        </div>
        <div className="signup__right">
          <div className="ui-group">
            <label htmlFor="">Let us know which plan you are interested in?</label>
          </div>
          <div className="ui-group">
            <Select
              name="selected_plan"
              searchable={false}
              autosize={false}
              value={selected_plan}
              onChange={this.handleSelectChange.bind(this, 'selected_plan')}
              placeholder="Select a plan"
              options={this.mapArrToSelect(plansSelect)}
            />
          </div>
          <div className="ui-group">
            <label htmlFor="">When is a good time for us give you a 15 minutes call to answer any questions you have?</label>
          </div>
          <div className={ "signup__datetime " + (email_instead ? "is-disabled" : "") + (validationMessage ? " has-error" : "") }>
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
                    if ( formatDate(date._d) < this.todayFormated ) {
                      return true
                    } else {
                      let day = date._d.getDay()
                      return (day === 6) || (day === 0) ? true : false
                    }
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
                onChange={this.handleSelectChange.bind(this, 'meeting_time')}
                placeholder="Select time"
                noResultsText={meeting_time_blank}
                options={this.mapArrToSelectWithEnd(meeting_time_options)}
              />
            </div>

          </div>
          <div className="signup__datetime-hint">
            Select time in your local timezone {this.clientTimeZoneOffsetVerbose}
          </div>


          <div className="signup__email-instead">
            { validationMessage &&
              <div className="ui-group-validation">{validationMessage}</div>
            }
            <div className={"ui-group " + (validationMessage ? "has-error" : "")}>
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

    )
  }
}


const mapStateToProps = (state) => ({
  signupId: state.signup.signupId,
  signupFields: state.signup.fields,
  pricingPlan: state.pricing.selectedPlan,
  pricingOptions: state.pricing.pricingOptions,
  pricingOptionsSub: state.pricing.pricingOptionsSub,
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupFields: (data) => dispatch({ type:SET_SIGNUP_FIELDS, payload: data }),
  setPricingPlan: (data) => dispatch({ type: SET_PRICING_PLAN, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupStep4);
