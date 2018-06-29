import React, { Component } from 'react';
import SignupEmail from '../containers/SignupEmail';

export default class HomeHero extends Component {
  render(){
    return(
      <div className="home-hero">
        <div className="container">
          <div className="home-hero__wrapper">
            <h1>Fuss-free accounting. Make better decisions.</h1>
            <div className="t-paragraph">Cabin is an online accounting and corporate secretary service. Starting at an affordable <span>$200/month</span>, we help you make better financial decisions for your business.</div>
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
