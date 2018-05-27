import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';

export default class HomeLogosEl extends Component {
  render(){
    return(
      <div className="home-logos__el">
        <Tooltip
          title={this.props.tooltipContent}
          position="bottom"
          arrow="true"
        >
          <i className={"icon icon-clientLogo-" + this.props.iconName} />
        </Tooltip>
      </div>
    )
  }
}
