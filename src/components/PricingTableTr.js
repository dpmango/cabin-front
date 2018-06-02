import React, { Component } from 'react';
import SvgIcon from '../components/SvgIcon';
import { Tooltip } from 'react-tippy';

export default class PricingTableTr extends Component {
  render(){

    const { tag, name, checks, tooltipContent } = this.props;

    return(
      <div className="pricing-table__tr">
        <div className="pricing-table__td pricing-table__td--primary">
          { tag &&
            <span className="pricing-table__tag">[{tag}]</span>
          }
          <span className="pricing-table__name">{name}</span>
          { tooltipContent &&
            <Tooltip
              title={tooltipContent}
              position="right"
              distance="10"
              arrow="true">
              <SvgIcon name="question-circle" />
            </Tooltip>
          }


        </div>
        { checks.map((col, i) => {

          let ShowCheckMark = typeof(col) === "boolean" ? col : false
          let ShowContentText = typeof(col) === "string" ? true : false

          return(
            <div className="pricing-table__td">
              { ShowCheckMark && <div className="pricing-table__checkmark"><SvgIcon name="check" /></div> }
              { ShowContentText && <span className="pricing-table__td-content">{col}</span> }
            </div>
          );

        })}
      </div>
    )
  }
}
