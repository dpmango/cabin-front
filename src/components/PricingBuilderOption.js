import React, { Component } from 'react';

export default class PricingBuilderOption extends Component {
  render(){

    const { name, price, pricePer, index, isActiveOption } = this.props;

    return(
      <div className="p-builder-option" data-index={index} onClick={this.props.clickHandler}>
        <div className={"p-builder-option__wrapper " + (isActiveOption ? "is-selected" : " ")}>
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
