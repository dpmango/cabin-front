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
    let firstLetter, newStr
    firstLetter = str.match(/[A-Za-z]/)[0]
    // firstLetterIndex = str.indexOf(firstLetter)
    newStr = str.replace(firstLetter, '<br />' + firstLetter);

    return newStr
  }

  render(){

    const { name, price, pricePer, index, isActiveOption } = this.props;

    return(
      <div className="p-builder-option" data-index={index} data-name={name} data-price={price} onClick={this.props.clickHandler}>
        <div className={"p-builder-option__wrapper " + (isActiveOption ? "is-selected" : " ")}>
          <div className="p-builder-option__head">
            <div className="p-builder-option__name">{this.renderName(name).split('<br />').map((item, key) => <span key={key}>{item}</span>)}
            </div>
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
