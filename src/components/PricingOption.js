import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import SvgIcon from '../components/SvgIcon';

export default class PricingOption extends Component {
  static propTypes = {
    name: PropTypes.string,
    tooltipContent: PropTypes.string,
    price: PropTypes.string,
    pricePer: PropTypes.string,
    priceSuf: PropTypes.string
  };

  render(){
    const { name, tooltipContent, price, pricePer, priceSuf } = this.props

    return(
      <div className="pricing-option">
        <div className="pricing-option__name">
          <span>{name}</span>
          <div className="pricing-option__tooltip">
            <Tooltip
              title={tooltipContent}
              position="top"
              distance="10"
              arrow="true">
                <SvgIcon name="question-circle" />
            </Tooltip>
          </div>
        </div>
        <div className="pricing-option__price">
          <div className="pricing-option__price-main"><span className="pricing-option__price-suf">{priceSuf}</span><span className="pricing-option__price-plus">+</span>{price}</div>
          <div className="pricing-option__price-for" dangerouslySetInnerHTML={{__html:pricePer}} ></div>
        </div>
      </div>
    )
  }
}
