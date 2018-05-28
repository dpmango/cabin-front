import React, { Component } from 'react';
import SignupEmail from '../components/SignupEmail';

export default class GetStartedBottom extends Component {
  render(){
    return(
      <div className="bottom-cta">
        <div className="container">
          <div className="bottom-cta__wrapper">
            <h1>Get Started Today</h1>
            <p className="t-paragraph">Focus on running your business. Let us handle the rest.</p>
            <SignupEmail extraClass="bottom-cta__form" />
          </div>
        </div>
      </div>
    )
  }
}