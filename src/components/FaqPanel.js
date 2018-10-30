import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import SvgIcon from 'components/SvgIcon';

export default class FaqPanel extends Component {
  static propTypes = {
    isOpened: PropTypes.bool,
    name: PropTypes.string,
    content: PropTypes.string
  };

  constructor(props) {
    super();

    this.state = {
      isOpened: props.isOpenedByDefault || false
    }
  }

  togglePanel = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  }

  render(){
    const { name, content } = this.props
    const { isOpened } = this.state

    return(
      <div className={isOpened ? "faq-panel is-active" : "faq-panel"}>
        <div className="faq-panel__head" onClick={this.togglePanel}>
          <div className="faq-panel__name">{name}</div>
          <SvgIcon name="collapse-arrow" />
        </div>
        <Collapse isOpened={isOpened}>
          <div className="faq-panel__content">
            <p>{content}</p>
          </div>
        </Collapse>
      </div>
    )
  }
}
