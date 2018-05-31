import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';

import SvgIcon from '../components/SvgIcon';
import PricingBuilderBox from '../components/PricingBuilderBox';

export default class PricingBuilderSection extends Component {
  render(){

    const { headerStep, headerName, headerDesc, headerTooltipContent, boxes } = this.props;

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

          <PricingBuilderBox
            pricingOptions={boxes.pricingOptions}
            boxList={boxes.boxList}
            name={boxes.name}
            price={boxes.price}
            pricePer={boxes.pricePer}
            priceStartingFrom={boxes.priceStartingFrom}
          />

        </div>

      </div>
    )
  }
}
