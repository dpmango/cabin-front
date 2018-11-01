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

  componentDidMount() {
    // create refs for first option
    // to be called ouside this componenet as method
    if ( this.props.index === 0 ){
      this.props.onRef(this)
    }
  }
  componentWillUnmount() {
    if ( this.props.index === 0 ){
      this.props.onRef(undefined)
    }
  }

  computeClickHandler = (isSyntetic) => {
    const { index, name, price } = this.props;

    this.props.clickHandler(index, name, price, isSyntetic)
  }


  // to separate str to lines on mobile
  renderName = (str) => {
    let firstLetter
    firstLetter = str.match(/[A-Za-z]/)[0]
    return str.replace(firstLetter, '<br />' + firstLetter);
  }

  render(){

    const { name, price, pricePer, isActiveOption } = this.props;

    return(
      <div className="p-builder-option" onClick={this.computeClickHandler.bind(this, false)}>
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
