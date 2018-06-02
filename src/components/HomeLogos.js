import React, { Component } from 'react';
import HomeLogosEl from '../components/HomeLogosEl';

export default class HomeLogos extends Component {
  render(){
    return(
      <div className="home-logos" data-aos="fade-up">
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
    )
  }
}
