import React from 'react';
import PropTypes from 'prop-types';

import gtmParts from 'react-google-tag-manager';

class GoogleTagManager extends React.Component {
  static propTypes = {
    gtmId: PropTypes.string.isRequired,
    dataLayerName: PropTypes.string,
    additionalEvents: PropTypes.object,
    previewVariables: PropTypes.string,
    scriptId: PropTypes.string,
    scheme: PropTypes.string,
  }

  componentDidMount() {
    const dataLayerName = this.props.dataLayerName || 'dataLayer';
    const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';

    if (!window[dataLayerName]) {
      const script = document.createElement("script")
      const gtmScriptNode = document.getElementById(scriptId)
      const scriptText = document.createTextNode(gtmScriptNode.textContent)

      script.appendChild(scriptText)
      document.head.appendChild(script)
    }
  }

  render() {
    console.log(this.props.additionalEvents)
    const gtm = gtmParts({
      id: this.props.gtmId,
      dataLayerName: this.props.dataLayerName || 'dataLayer',
      additionalEvents: this.props.additionalEvents || {},
      previewVariables: this.props.previewVariables || false,
      scheme: this.props.scheme || 'https:',
    });

    return (
      <div>
        <div>{gtm.noScriptAsReact()}</div>
        <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
          {gtm.scriptAsReact()}
        </div>
      </div>
    );
  }
}

export default GoogleTagManager;
