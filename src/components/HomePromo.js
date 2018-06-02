import React, { Component } from 'react';

export default class HomePromo extends Component {
  render(){
    return(
      <div className="home-promo" data-aos="fade-up">
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
    )
  }
}
