import React, { Component } from 'react';
import HomeLogosEl from 'components/HomeLogosEl';

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
              <HomeLogosEl iconName="waa" tooltipContent="Fast-casual restaurant" />
              <HomeLogosEl iconName="style" tooltipContent="Designer clothing subscription" />
              <HomeLogosEl iconName="poh" tooltipContent="Retail chain" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
