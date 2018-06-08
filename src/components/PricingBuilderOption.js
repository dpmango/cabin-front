import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PricingBuilderOption extends Component {
  static propTypes = {
    name: PropTypes.string,
    price: PropTypes.string,
    pricePer: PropTypes.string,
    index: PropTypes.number,
    isActiveOption: PropTypes.bool,
    clickHandler: PropTypes.func
  };

  // to separate str to lines on mobile
  renderName = (str) => {
    // let strWithBr = str
    // strWithBr = strWithBr.indexOf()
    // console.log(strWithBr)
    return str
  }

  render(){

    const { name, price, pricePer, index, isActiveOption } = this.props;

    return(
      <div className="p-builder-option" data-index={index} data-name={name} data-price={price} onClick={this.props.clickHandler}>
        <div className={"p-builder-option__wrapper " + (isActiveOption ? "is-selected" : " ")}>
          <div className="p-builder-option__head">
            <div className="p-builder-option__name">{this.renderName(name)}</div>
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
