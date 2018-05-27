import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../services/Api';
// import sprite from '../images/sprite.svg';

import HomeLogosEl from '../components/homeLogosEl'

export default class Home extends Component {
  constructor() {
    super();
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="home">
        <div className="home-hero">
          <div className="container">
            <div className="home-hero__wrapper">
              <h1>Turn messy documents into accurate financial statements.</h1>
              <div className="home-hero__desc">Online accounting and corporate secretary service starting at <span>$200 per month</span></div>
              <form className="home-hero__form">
                <input type="email" placeholder="Email address"/>
                <button type="submit" className="btn btn--huge">Get started</button>
              </form>
            </div>
          </div>
        </div>

        <div className="home-logos">
          <div className="container">
            <div className="home-logos__wrapper">
              <span className="home-logos__name">Trusted by:</span>
              <div className="home-logos__list">
                <HomeLogosEl iconName="grain" tooltipContent="Grain tooltip content" />
                <HomeLogosEl iconName="bbounce" tooltipContent="bbounce tooltip content" />
                <HomeLogosEl iconName="canny" tooltipContent="canny tooltip content" />
                <HomeLogosEl iconName="elements" tooltipContent="Wellness and spa" />
                <HomeLogosEl iconName="seventeen" tooltipContent="seventeen tooltip content" />
                <HomeLogosEl iconName="poh" tooltipContent="Poh tooltip content" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
