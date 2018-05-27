import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../services/Api';

export default class SingupEmail extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      error: '',
      isNewLead: false
    };
  }

  handleChange = (e) => {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({...this.state, [fieldName]: fleldVal})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    api
      .post(`signup_leads`, {
        signup_lead: {
          email: this.state.email
        }
      })
      .then((res) => {
        console.log(res);
        this.setState({
          isNewLead: true
        })
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render(){
    const { isNewLead } = this.state;

    if (isNewLead) {
      return <Redirect to='/profile' />;
    }

    return(
      <form className={"signup-email " + this.props.extraClass} onSubmit={this.handleSubmit}>
        <input type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange}/>
        <button type="submit" className="btn btn--huge">Get started</button>
      </form>
    )
  }
}
