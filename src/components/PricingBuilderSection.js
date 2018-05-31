import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';

import SvgIcon from '../components/SvgIcon';
import PricingBuilderOption from '../components/PricingBuilderOption';

export default class PricingBuilderSection extends Component {
  render(){

    const { headerStep, headerName, headerDesc, headerTooltipContent } = this.props;

    const pricingOptions = [
      {
        name: "<25 bank transactions",
        price: "S$200",
        pricePer: "per month"
      },
      {
        name: "25 - 75 bank transactions",
        price: "S$375",
        pricePer: "per month"
      },
      {
        name: "75 - 125 bank transactions",
        price: "S$550",
        pricePer: "per month"
      },
      {
        name: "125 - 200 bank transactions",
        price: "S$650",
        pricePer: "per month"
      },
      {
        name: "200 - 300 bank transactions",
        price: "S$850",
        pricePer: "per month"
      }
    ]

    return(
      <div className="p-builder">
        <div className="container container--narrow">
          <div className="p-builder__header">
            <div className="t-small">{headerStep}</div>
            <h2>{headerName}</h2>
            <div className="p-builder__header-desc">
              <p className="t-paragraph">{headerDesc}</p>
              <Tooltip
                title={headerTooltipContent}
                position="top"
                distance="10"
                arrow="true">
                  <SvgIcon name="question-circle" />
              </Tooltip>
            </div>
          </div>

          <div className="p-builder-box">
            <div className="p-builder-box__wrapper">
              <div className="p-builder-box__head">
                <div className="p-builder-box__name">Monthly accounting and tax services</div>
                <div className="p-builder-box__price">
                  <span className="p-builder-box__price-top">starting at</span>
                  <span className="p-builder-box__price-core">S$200</span>
                  <span className="p-builder-box__price-for">per month</span>
                </div>
              </div>

              <div className="p-builder-box__list">
                <div className="p-builder-box__list-col">
                  <div className="p-builder-box__list-el">
                    <SvgIcon name="check" />
                    <span>Company name search and reservation</span>
                  </div>
                  <div className="p-builder-box__list-el">
                    <SvgIcon name="check" />
                    <span>Company structure and Constitution advisory</span>
                  </div>
                  <div className="p-builder-box__list-el">
                    <SvgIcon name="check" />
                    <span>Minutes and resolution of First Director’s Meeting</span>
                  </div>
                </div>
                <div className="p-builder-box__list-col">
                  <div className="p-builder-box__list-el">
                    <SvgIcon name="check" />
                    <span>Company name search and reservation</span>
                  </div>
                  <div className="p-builder-box__list-el">
                    <SvgIcon name="check" />
                    <span>Company structure and Constitution advisory</span>
                  </div>
                  <div className="p-builder-box__list-el">
                    <SvgIcon name="check" />
                    <span>Minutes and resolution of First Director’s Meeting</span>
                  </div>
                </div>
              </div>

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

        </div>

      </div>
    )
  }
}
