import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {api} from 'services/Api';
import isProduction from 'services/isProduction';
import { SET_SIGNUP_ID, SET_SIGNUP_EMAIL, SET_SIGNUP_STEP } from 'store/ActionTypes';


class SingupEmail extends Component {
  static propTypes = {
    setSignupId: PropTypes.func,
    setSignupEmail: PropTypes.func,
    // signupId: PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      email: '',
      errors: '',
      isNewLead: false
    };
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal});

    // clear error when started typing
    if ( this.state.errors ){
      this.setState({
        errors: ' '
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;
    // eslint-disable-next-line
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // pre-validation
    // console.log(emailRegEx.test(email))
    if ( email === "" ){
      this.setState({
        errors: "Please enter your email"
      })
    } else if ( !emailRegEx.test(email) ){
      this.setState({
        errors: "Email format is not correct"
      })
    } else {
      api
        .post(`signup_leads`, {
          signup_lead: {
            isProduction: isProduction(),
            email: email
          }
        })
        .then((res) => {
          var errors = res.data.errors
          if ( errors ){
            this.setState({
              errors: errors.email[0] // get only first validation error
            })
          } else {
            this.props.setSignupStep(1);
            this.props.setSignupId(res.data.id);
            this.props.setSignupEmail(res.data.email);

            this.setState({
              isNewLead: true
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  render(){
    const { isNewLead, errors } = this.state;

    if (isNewLead) {
      return <Redirect to='/get-started' />;
    }

    return(
      <div>
        <form className={"signup-email " + this.props.extraClass + (errors ? " has-error" : "") } onSubmit={this.handleSubmit}>
          <input type="text" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange}/>
          <button type="submit" className="btn btn--huge">Get Started</button>
          { errors &&
            // render all errors or only first (most relevant?)
            // <div className="ui-input-validation">{errors.map((err) => (
            //   err
            // ))}</div>
            <div className="ui-input-validation">{errors}</div>
          }
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  signupId: state.signup.signupId
});

const mapDispatchToProps = (dispatch) => ({
  setSignupStep: (data) => dispatch({ type: SET_SIGNUP_STEP, payload: data }),
  setSignupEmail: (data) => dispatch({ type: SET_SIGNUP_EMAIL, payload: data }),
  setSignupId: (data) => dispatch({ type: SET_SIGNUP_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SingupEmail);
