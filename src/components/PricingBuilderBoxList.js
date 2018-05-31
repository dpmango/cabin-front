import React, { Component } from 'react';
import SvgIcon from '../components/SvgIcon';

export default class PricingBuilderBoxList extends Component {
  render(){

    const { list } = this.props;

    return(
      <div className="p-builder-box__list">
        { list.map((col, i) => (
          <div className="p-builder-box__list-col" key={i}>
            { col.map((el, ind) => (
              <div className="p-builder-box__list-el" key={ind}>
                <SvgIcon name="check" />
                <span>{el}</span>
              </div>
            )) }
          </div>
        )) }

      </div>
    )
  }
}
