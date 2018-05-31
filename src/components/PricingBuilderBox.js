import React, { Component } from 'react';

import PricingBuilderOption from '../components/PricingBuilderOption';
import PricingBuilderBoxList from '../components/PricingBuilderBoxList';

export default class PricingBuilderBox extends Component {
  render(){

    const { name, price, pricePer, priceStartingFrom, pricingOptions, boxList } = this.props;

    return(
      <div className="p-builder-box">
        <div className="p-builder-box__wrapper">
          <div className="p-builder-box__head">
            <div className="p-builder-box__name">{name}</div>
            <div className="p-builder-box__price">
              { priceStartingFrom &&
                <span className="p-builder-box__price-top">starting at</span>
              }
              <span className="p-builder-box__price-core">{price}</span>
              <span className="p-builder-box__price-for">{pricePer}</span>
            </div>
          </div>

          <PricingBuilderBoxList
            list={boxList}
          />

          <div className="p-builder-box__help-text">*Cabin’s tax optimisation and planning service thoroughly combs through your financials to help maximise deductions. This includes planning your capital allowances, S14Q claims, and donations claims to fully utilise your tax allowance.</div>
        </div>

        <div className="p-builder-box__options">
          <div className="p-builder-box__options-list" data-number-of-elements={pricingOptions.length}>
            { pricingOptions.map((option, i) => (
              <PricingBuilderOption
                key={i}
                name={option.name}
                price={option.price}
                pricePer={option.pricePer}
              />
            )) }

          </div>
        </div>
      </div>
    )
  }
}
