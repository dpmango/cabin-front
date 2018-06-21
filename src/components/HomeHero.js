import React, { Component } from 'react';
import SignupEmail from '../containers/SignupEmail';

export default class HomeHero extends Component {
  render(){
    return(
      <div className="home-hero">
        <div className="container">
          <div className="home-hero__wrapper">
            <h1 data-aos="fade-up">Turn messy documents into accurate financial statements.</h1>
            <div className="t-paragraph" data-aos="fade-up" data-aos-delay="150">Online accounting and corporate secretary service starting at <span>$200 per month</span></div>
            <SignupEmail extraClass="home-hero__form" />
          </div>
        </div>
        <div className="home-hero__bg">
          <img src={require(`../images/homeHeroIllustration.png`)} srcSet={require(`../images/homeHeroIllustration@2x.png`)  + ' 2x'} alt=""/>
        </div>
      </div>
    )
  }
}
