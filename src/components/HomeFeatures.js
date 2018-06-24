import React, { Component } from 'react';

export default class HomeFeatures extends Component {
  render(){
    return(
      <div className="home-features">
        <div className="container">
          <div className="t-center">
            <span className="t-small">How are we different</span>
            <h2>We are built for the modern business</h2>
          </div>
        </div>
        <div className="home-features__bg-holder">
          <div className="container">
            <div className="home-features__wrapper">
              <div className="home-features__col">
                <div className="home-features-card">
                  <div className="home-features-card__image">
                    <i className="icon icon-homeFeatures-1"></i>
                  </div>
                  <div className="home-features-card__content">
                    <div className="home-features-card__name">Fully digital</div>
                    <p>Powered by real humans. We spend time to understand your.</p>
                  </div>
                </div>
              </div>
              <div className="home-features__col">
                <div className="home-features-card">
                  <div className="home-features-card__image">
                    <i className="icon icon-homeFeatures-2"></i>
                  </div>
                  <div className="home-features-card__content">
                    <div className="home-features-card__name">Thoughtful humans</div>
                    <p>Powered by real humans. We spend time to understand your.</p>
                  </div>
                </div>
              </div>
              <div className="home-features__col">
                <div className="home-features-card">
                  <div className="home-features-card__image">
                    <i className="icon icon-homeFeatures-3"></i>
                  </div>
                  <div className="home-features-card__content">
                    <div className="home-features-card__name">Tailored services</div>
                    <p>Powered by real humans. We spend time to understand your.</p>
                  </div>
                </div>
              </div>
              <div className="home-features__col">
                <div className="home-features-card">
                  <div className="home-features-card__image">
                    <i className="icon icon-homeFeatures-4"></i>
                  </div>
                  <div className="home-features-card__content">
                    <div className="home-features-card__name">Affordable</div>
                    <p>Powered by real humans. We spend time to understand your.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
