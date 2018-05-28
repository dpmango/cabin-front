import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';
import api from '../services/Api';

import HomeLogosEl from '../components/HomeLogosEl';
import GetStartedBottom from '../components/GetStartedBottom';
import SignupEmail from '../components/SignupEmail';
import HomeBenefits from '../components/HomeBenefits';

class Home extends Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  componentDidMount(){
    this.props.setHeaderClass('');
  }

  render() {
    return (
      <div className="home">
        <Helmet>
          <title>Homepage || CABIN</title>
        </Helmet>

        <div className="home-hero">
          <div className="container">
            <div className="home-hero__wrapper">
              <h1>Turn messy documents into accurate financial statements.</h1>
              <div className="home-hero__desc">Online accounting and corporate secretary service starting at <span>$200 per month</span></div>
              <SignupEmail extraClass="home-hero__form" />
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

        <div className="home-promo">
          <div className="container container--narrow">
            <div className="home-promo__wrapper">
              <div className="home-promo__left">
                <div className="home-promo__image">
                  <img src={require('../images/homePromoList.png')} srcSet={require('../images/homePromoList@2x.png')  + ' 2x'} alt=""/>
                </div>
              </div>
              <div className="home-promo__right">
                <div className="t-small">Why we built Cabin</div>
                <h2>You focus on your business, we take care of everything else.</h2>
                <p className="t-paragraph">Growing a business is tough. You have lots to do. Do not be distracted by bookkeeping, accounting, compliance, taxes, payroll, and other chores. Let us take that off your hands.</p>
              </div>
            </div>
          </div>
        </div>

        <HomeBenefits />

        <GetStartedBottom />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
