import React, { Component } from 'react';

export default class HomeFeatures extends Component {
  render(){
    return(
      <div className="home-features">
        <div className="container container--narrow">
          <div className="t-center">
            <span className="t-small">How are we different</span>
            <h2>We are built for the modern business</h2>
          </div>
        </div>
        <div className="home-features__bg-holder">
          <div className="container container--narrow">
            <div className="home-features__wrapper">
              <div className="home-features__col">
                <div className="home-features-card">
                  <div className="home-features-card__image">

                  </div>
                  <div className="home-features-card__content">
                    <div className="home-features-card__name">Fully digital</div>
                    <p>Powered by real humans. We spend time to understand your business and what is most important to you. Our reports are tailored to the needs of your business.</p>
                  </div>
                </div>
              </div>
              <div className="home-features__col">
                <div className="home-features-card">
                  <div className="home-features-card__image">

                  </div>
                  <div className="home-features-card__content">
                    <div className="home-features-card__name">Powered by thoughtful humans</div>
                    <p>Powered by real humans. We spend time to understand your business and what is most important to you. Our reports are tailored to the needs of your business.</p>
                  </div>
                </div>
              </div>
              <div className="home-features__col">
                <div className="home-features-card">
                  <div className="home-features-card__image">

                  </div>
                  <div className="home-features-card__content">
                    <div className="home-features-card__name">Tailored for your industry</div>
                    <p>Powered by real humans. We spend time to understand your business and what is most important to you. Our reports are tailored to the needs of your business.</p>
                  </div>
                </div>
              </div>
              <div className="home-features__col">
                <div className="home-features-card">
                  <div className="home-features-card__image">

                  </div>
                  <div className="home-features-card__content">
                    <div className="home-features-card__name">Less costly than hiring internally</div>
                    <p>Powered by real humans. We spend time to understand your business and what is most important to you. Our reports are tailored to the needs of your business.</p>
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
