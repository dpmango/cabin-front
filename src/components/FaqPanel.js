import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import SvgIcon from '../components/SvgIcon';
import map from 'lodash/map';

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

    // https://github.com/facebook/react-native/issues/3148
    // let contentWithLink;
    //
    // let tokens = content.split(/\s/);
    //
    // contentWithLink = map(tokens, (token, i) => {
    //   let hasSpace = i !== (tokens.length - 1);
    //   let maybeSpace = hasSpace ? ' ' : '';
    //
    //   if (token.match(/^http\:\//)) {
    //     return (
    //       <Link
    //         key={i}
    //         to={{uri: token}}
    //         >
    //         {token}{maybeSpace}
    //       </Link>
    //     );
    //   } else {
    //     return token + maybeSpace;
    //   }
    // });


    return(
      <div className={isOpened ? "faq-panel is-active" : "faq-panel"}>
        <div className="faq-panel__head" onClick={this.togglePanel}>
          <div className="faq-panel__name">{name}</div>
          <SvgIcon name="collapse-arrow" />
        </div>
        <Collapse isOpened={isOpened}>
          <div className="faq-panel__content">
            <p>{content}</p>
            {/* <p dangerouslySetInnerHTML={{__html:content}} /> */}
            {/* {contentWithLink} */}
          </div>
        </Collapse>
      </div>
    )
  }
}
