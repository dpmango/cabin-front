import React, { Component } from 'react';
import HomeLogosEl from '../components/HomeLogosEl';

export default class HomeLogos extends Component {
  render(){
    return(
      <div className="home-logos">
        <div className="container">
          <div className="home-logos__wrapper">
            <span className="home-logos__name">Trusted by:</span>
            <div className="home-logos__list">
              <HomeLogosEl iconName="grain" tooltipContent="Online restaurant" />
              <HomeLogosEl iconName="canny" tooltipContent="Digital marketing" />
              <HomeLogosEl iconName="elements" tooltipContent="Spa and wellness group" />
              <HomeLogosEl iconName="bbounce" tooltipContent="bbounce tooltip content" />
              <HomeLogosEl iconName="seventeen" tooltipContent="seventeen tooltip content" />
              <HomeLogosEl iconName="poh" tooltipContent="Retail chain" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
