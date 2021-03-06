import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'components/SvgIcon';
import { Tooltip } from 'react-tippy';

export default class PricingBuilderBoxList extends Component {
  static propTypes = {
    list: PropTypes.array
  }

  render(){

    const { list } = this.props;

    const renderElementName = (el) => {
      if ( typeof el !== "object" ){
        return (
          <span>
            {el}
          </span>
        )
      } else {
        return (
          <span>
            {el.name}
            <Tooltip
              title={el.tooltip}
              position="top"
              distance="10"
              arrow="true">
              <SvgIcon name="question-circle" />
            </Tooltip>
          </span>
        )
      }
    }

    return(
      <div className="p-builder-box__list">
        { list.map((col, i) => (
          <div className="p-builder-box__list-col" key={i}>
            { col.map((el, ind) => (
              <div className="p-builder-box__list-el" key={ind}>
                <SvgIcon name="check" />
                { renderElementName(el) }
              </div>
            )) }
          </div>
        )) }

      </div>
    )
  }
}
