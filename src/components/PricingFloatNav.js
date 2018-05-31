import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_PRICING_PLAN } from '../store/ActionTypes';
import throttle from 'lodash/throttle';

import SvgIcon from '../components/SvgIcon';

class PricingFloatNav extends Component {
  static propTypes = {
    heroHeight: PropTypes.number,
    pricingOptions: PropTypes.array,
    setPricingPlan: PropTypes.func
  };

  constructor(props){
    super(props);

    this.state = {
      isScrolledAfterHero: false
    }

    this.scrollWithThrottle = throttle(this.handleScroll, 100);
  }

  onGetStartedClick = () => {
    this.props.setPricingPlan('Custom');
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollWithThrottle, false);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollWithThrottle, false);
  };

  handleScroll = (event) => {
    var wScroll = window.scrollY

    if ( wScroll > this.props.heroHeight ){
      this.setState({
        isScrolledAfterHero: true
      })
    } else {
      this.setState({
        isScrolledAfterHero: false
      })
    }
  };

  render(){
    // calculate Price summ
    let summaryPrice = 0;

    if ( this.props.pricingOptions.length > 0 ){
      this.props.pricingOptions.map( (option) => {
        summaryPrice += Number((option.price).match(/\d+$/))
      } )
    }

    return(
      <div className={ summaryPrice > 0 && this.state.isScrolledAfterHero ? "pricing-float is-active" : "pricing-float"}>
        <div className="container container--narrow">
          <div className="pricing-float__wrapper">
            <div className="pricing-float__summary">
              <span className="pricing-float__summary-holder">Your Custom Plan:</span>
              <div className="pricing-float__summary-price">
                <span>S${summaryPrice}</span>
                <span>per month</span>
              </div>
            </div>
            <Link to="/profile" onClick={this.onGetStartedClick} className="pricing-float__cta">
              <div className="pricing-float__cta-text">Get Started</div>
              <div className="pricing-float__cta-icon">
                <SvgIcon name="next-arrow2" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pricingOptions: state.pricing.pricingOptions,
});

const mapDispatchToProps = (dispatch) => ({
  setPricingPlan: (data) => dispatch({ type: SET_PRICING_PLAN, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingFloatNav);
