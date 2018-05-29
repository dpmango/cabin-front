import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

export default class Professionals extends Component {
  constructor() {
    super();
    this.state = {
      // if false - show testimonials slider instead of logos
      isAlt: true
    }
  }

  render(){
    const swiperParams = {
      // react specific params
      // https://github.com/kidjp85/react-id-swiper
      containerClass: 'professionals__slider',
      // shouldSwiperUpdate: true,
      // rebuildOnUpdate: true,

      // common swiper API
      // http://idangero.us/swiper/api/

      direction: 'horizontal',
      loop: true,
      watchOverflow: true,
      slidesPerView: 'auto',
      normalizeSlideIndex: true,
      freeMode: true,
      slidesOffsetBefore: -135,
    }

    const { isAlt } = this.state

    return(
      <div className="professionals">
        <div className="container">
          <div className="t-center">
            <span className="t-small">You are in good hands</span>
            <h2>Cabin is powered by a team of thoughtful professionals</h2>
          </div>

          { isAlt &&
            <div className="professionals__logos">
              <div className="professionals__logos-el">
                <i className="icon icon-logo-ISCA" />
              </div>
              <div className="professionals__logos-el">
                <i className="icon icon-logo-ACCA" />
              </div>
              <div className="professionals__logos-el">
                <i className="icon icon-logo-ACRA" />
              </div>
              <div className="professionals__logos-el">
                <i className="icon icon-logo-Xero" />
              </div>
            </div>
          }
        </div>

        { !isAlt &&
        <Swiper {...swiperParams}>
          <div className="professionals__slide">
            <div className="professionals-card">
              <div className="professionals-card__avatar">
                <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
              </div>
              <div className="professionals-card__content">
                <div className="professionals-card__name">John Tan</div>
                <div className="professionals-card__position">Senior Accountant</div>
                <div className="professionals-card__qualifications">
                  <span>Qualification A</span>
                  <span>Qualification B</span>
                </div>
              </div>
            </div>
          </div>
          <div className="professionals__slide">
            <div className="professionals-card">
              <div className="professionals-card__avatar">
                <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
              </div>
              <div className="professionals-card__content">
                <div className="professionals-card__name">John Tan</div>
                <div className="professionals-card__position">Senior Accountant</div>
                <div className="professionals-card__qualifications">
                  <span>Qualification A</span>
                  <span>Qualification B</span>
                </div>
              </div>
            </div>
          </div>
          <div className="professionals__slide">
            <div className="professionals-card">
              <div className="professionals-card__avatar">
                <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
              </div>
              <div className="professionals-card__content">
                <div className="professionals-card__name">John Tan</div>
                <div className="professionals-card__position">Senior Accountant</div>
                <div className="professionals-card__qualifications">
                  <span>Qualification A</span>
                  <span>Qualification B</span>
                </div>
              </div>
            </div>
          </div>
          <div className="professionals__slide">
            <div className="professionals-card">
              <div className="professionals-card__avatar">
                <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
              </div>
              <div className="professionals-card__content">
                <div className="professionals-card__name">John Tan</div>
                <div className="professionals-card__position">Senior Accountant</div>
                <div className="professionals-card__qualifications">
                  <span>Qualification A</span>
                  <span>Qualification B</span>
                </div>
              </div>
            </div>
          </div>
          <div className="professionals__slide">
            <div className="professionals-card">
              <div className="professionals-card__avatar">
                <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
              </div>
              <div className="professionals-card__content">
                <div className="professionals-card__name">John Tan</div>
                <div className="professionals-card__position">Senior Accountant</div>
                <div className="professionals-card__qualifications">
                  <span>Qualification A</span>
                  <span>Qualification B</span>
                </div>
              </div>
            </div>
          </div>
        </Swiper>
        }

      </div>
    )
  }
}
