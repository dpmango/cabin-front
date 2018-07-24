import React, { Component } from 'react';
import SignupEmail from '../containers/SignupEmail';

export default class HomeHero extends Component {
  render(){
    return(
      <div className="home-hero">
        <div className="container">
          <div className="home-hero__wrapper">
            <h1>Fuss-free accounting.<br/> Make better decisions.</h1>
            <div className="t-paragraph">Cabin is&nbsp;an&nbsp;online accounting and corporate secretary service. Starting at&nbsp;an&nbsp;affordable <strong>$200/month</strong>, we&nbsp;help you turn messy documents into useful reports.</div>
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
