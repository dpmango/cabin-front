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
    pricingOptionsSub: PropTypes.array,
    setPricingPlan: PropTypes.func
  };

  constructor(props){
    super(props);

    this.scrollWithThrottle = throttle(this.handleScroll, 200);

    this.state = {
      isScrolledAfterHero: false
    }

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

  onGetStartedClick = () => {
    this.props.setPricingPlan('Custom');
  }

  getTotal = () => {

    const { pricingOptions, pricingOptionsSub } = this.props;
    let calc = 0;

    // add all suboptions first
    if ( pricingOptionsSub && pricingOptionsSub.length > 0 ){
      pricingOptionsSub.forEach( (sub) => {
        calc += this.parsePrice(sub.price)
      })
    }

    // watch if box without options present
    if ( pricingOptions && pricingOptions.length > 0 ){
      pricingOptions.forEach( (option) => {
        if ( !pricingOptionsSub.some( x => x.boxId === option.id ) ){
          calc += this.parsePrice(option.price);
        }
      })
    }

    return calc
  }

  parsePrice = (str) => {
    return Number((str).match(/\d+$/))
  }

  render(){
    // calculate Price summ
    const { isScrolledAfterHero } = this.state;
    let summaryPrice = this.getTotal();

    return(
      <div className={ summaryPrice > 0 && isScrolledAfterHero ? "pricing-float is-active" : "pricing-float"}>
        <div className="container container--narrow">
          <div className="pricing-float__wrapper">
            <div className="pricing-float__summary">
              <span className="pricing-float__summary-holder">Your Custom Plan:</span>
              <div className="pricing-float__summary-price">
                <span>S${summaryPrice}</span>
                <span>per month</span>
              </div>
            </div>
            <Link to="/get-started" onClick={this.onGetStartedClick} className="pricing-float__cta">
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
  pricingOptionsSub: state.pricing.pricingOptionsSub
});

const mapDispatchToProps = (dispatch) => ({
  setPricingPlan: (data) => dispatch({ type: SET_PRICING_PLAN, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingFloatNav);
