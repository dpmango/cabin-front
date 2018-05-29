import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from '../services/Api';
import { SET_SIGNUP_ID, SET_SIGNUP_EMAIL } from '../store/ActionTypes';


class SingupEmail extends Component {
  static propTypes = {
    setSignupId: PropTypes.func,
    setSignupEmail: PropTypes.func
  };

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
        this.props.setSignupId(res.data.id);
        this.props.setSignupEmail(res.data.email);

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


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  setSignupEmail: (data) => dispatch({ type: SET_SIGNUP_EMAIL, payload: data }),
  setSignupId: (data) => dispatch({ type: SET_SIGNUP_ID, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(SingupEmail);
