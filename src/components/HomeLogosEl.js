import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';

export default class HomeLogosEl extends Component {
  render(){

    const { tooltipContent, iconName } = this.props

    return(
      <Tooltip
        title={tooltipContent}
        position="bottom"
        distance="0"
        arrow="true">
        <div className="home-logos__el">
        <i className={"icon icon-clientLogo-" + iconName} />
        </div>
      </Tooltip>
    )
  }
}
