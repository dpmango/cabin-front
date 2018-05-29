import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';

export default class HomeLogosEl extends Component {
  render(){
    return(
      <Tooltip
        title={this.props.tooltipContent}
        position="bottom"
        distance="0"
        arrow="true">
        <div className="home-logos__el">
        <i className={"icon icon-clientLogo-" + this.props.iconName} />
        </div>
      </Tooltip>
    )
  }
}
