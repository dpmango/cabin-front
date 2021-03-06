import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_PRICING_PLAN } from 'store/ActionTypes';
import throttle from 'lodash/throttle';
import { GetStarted } from 'routes';
import SvgIcon from 'components/SvgIcon';

class PricingFloatNav extends Component {
  static propTypes = {
    heroHeight: PropTypes.number,
    pricingOptions: PropTypes.array,
    pricingOptionsSub: PropTypes.array,
    setPricingPlan: PropTypes.func,
    planName: PropTypes.string.isRequired
  };

  constructor(props){
    super(props);

    this.pagename = window.location.pathname.split('/')[2];

    this.scrollWithThrottle = throttle(this.handleScroll, 200);

    this.state = {
      isScrolledAfterHero: false,
      pagename: this.pagename
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
    this.props.setPricingPlan(this.props.planName);
  }

  getTotal = () => {

    const { pricingOptions, pricingOptionsSub } = this.props;
    const { pagename } = this.state;
    let calc = {
      price: 0,
      haveQuoteReguired: false
    };

    // add all suboptions first
    if ( pricingOptionsSub && pricingOptionsSub.length > 0 ){
      pricingOptionsSub.forEach( (sub) => {
        if ( sub.pagename === pagename ){
          calc.price += this.parsePrice(sub.price)
        }
      })
    }

    // watch if box without options present
    if ( pricingOptions && pricingOptions.length > 0 ){
      pricingOptions.forEach( (option) => {
        if ( (option.pagename === pagename) && !pricingOptionsSub.some( x => x.boxId === option.id ) ){
          if ( this.parsePrice(option.price) === 0 ){
            // if price is 0 - than selected "quote required"
            calc.haveQuoteReguired = true;
          }
          calc.price += this.parsePrice(option.price);
        }
      })
    }

    return calc
  }

  parsePrice = (str) => {
    return Number((str).match(/\d+$/))
  }

  preloaderOnHover = (component) => {
    component.preload();
  };

  render(){
    // calculate Price summ
    const { isScrolledAfterHero } = this.state;
    const { planName } = this.props;
    let summary = this.getTotal();

    return(
      <div className={ summary.price > 0 && isScrolledAfterHero ? "pricing-float is-active" : "pricing-float"}>
        <div className="container container--narrow">
          <div className="pricing-float__wrapper">
            <div className="pricing-float__summary">
              <span className="pricing-float__summary-holder">Your <strong>{planName ? planName : "Custom plan"}</strong> plan:</span>
              <div className="pricing-float__summary-price">
                <span>S${summary.price}</span>
                <span>per month</span>
                { summary.haveQuoteReguired &&
                  <span>+ additional quote required</span>
                }
              </div>
            </div>
            <Link
              to="/get-started"
              onClick={this.onGetStartedClick}
              onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
              className="pricing-float__cta">
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
