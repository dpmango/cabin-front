import React, { Component } from 'react';
import SignupEmail from '../components/SignupEmail';

export default class HomeHero extends Component {
  render(){
    return(
      <div className="home-hero">
        <div className="container">
          <div className="home-hero__wrapper">
            <h1>Turn messy documents into accurate financial statements.</h1>
            <div className="home-hero__desc">Online accounting and corporate secretary service starting at <span>$200 per month</span></div>
            <SignupEmail extraClass="home-hero__form" />
          </div>
        </div>
      </div>
    )
  }
}
