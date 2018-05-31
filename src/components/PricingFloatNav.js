import React, { Component } from 'react';
import { connect } from 'react-redux';

import SvgIcon from '../components/SvgIcon';

class PricingFloatNav extends Component {
  render(){
    let addonPrice = 0;

    if ( this.props.pricingOptions.length > 0 ){
      this.props.pricingOptions.map( (option) => {
        addonPrice += Number((option.price).match(/\d+$/))
      } )
    }

    return(
      <div className="pricing-float">
        <div className="container container--narrow">
          <div className="pricing-float__wrapper">
            <div className="pricing-float__summary">
              <span className="pricing-float__summary-holder">Your Custom Plan:</span>
              <div className="pricing-float__summary-price">
                <span>S${addonPrice}</span>
                <span>per month</span>
              </div>
            </div>
            <div className="pricing-float__cta">
              <div className="pricing-float__cta-text">Get Started</div>
              <div className="pricing-float__cta-icon">
                <SvgIcon name="next-arrow2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pricingOptions: state.pricing.pricingOptions,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PricingFloatNav);
