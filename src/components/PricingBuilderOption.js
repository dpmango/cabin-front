import React, { Component } from 'react';

export default class PricingBuilderOption extends Component {
  render(){

    const { name, price, pricePer } = this.props;

    return(
      <div className="p-builder-option">
        <div className="p-builder-option__wrapper">
          <div className="p-builder-option__head">
            <div className="p-builder-option__name">{name}</div>
          </div>

          <div className="p-builder-option__price">
            <span>{price}</span>
            <span>{pricePer}</span>
          </div>
        </div>
      </div>
    )
  }
}
