import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';
import Select from 'react-select';

import GetStartedBottom from '../components/GetStartedBottom';

import PricingCore from '../containers/PricingCore';
import PricingIncorp from '../containers/PricingIncorp';
import PricingDormant from '../containers/PricingDormant';
import PricingCustom from '../containers/PricingCustom';

class Pricing extends Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.selectOptions = [
      { value: '/pricing', label: 'Core plans' },
      { value: '/pricing/incorporation', label: 'Incorporation plans' },
      { value: '/pricing/dormant', label: 'Dormant plans' }
    ]

    this.state = {
      selectValue: this.selectOptions.filter( x => x.value === props.location.pathname )[0]
    };
  }

  componentDidMount(){
    this.props.setHeaderClass('');
  }

  mobileNavChange = (e) => {
    this.setState({
      selectValue: e,
    }, () => {
      this.props.history.push(e.value);
    });
  }

  render() {
    const { selectValue } = this.state;

    const heroRender = (
      <div className="hero">
        <div className="hero__bg">
          <img src={require('../images/pricingHeroImg.png')} srcSet={require('../images/pricingHeroImg@2x.png')  + ' 2x'} alt=""/>
        </div>
        <div className="container container--narrow">
          <div className="hero__wrapper">
            <span className="t-small">Pricing</span>
            <h2>Simple and transparent pricing</h2>
            <p className="t-paragraph">Pick a plan that is best suited to your needs and budget</p>
          </div>
        </div>
        <div className="hero__nav">
          <div className="container container--narrow">
            <div className="hero__nav-wrapper">
              <NavLink exact={true} to="/pricing" className="hero__nav-el" activeClassName='is-active'>
                Core plans
              </NavLink>
              <NavLink to="/pricing/incorporation" className="hero__nav-el" activeClassName='is-active'>
                Incorporation plans
              </NavLink>
              <NavLink to="/pricing/dormant" className="hero__nav-el" activeClassName='is-active'>
                Dormant plans
              </NavLink>
            </div>
            <div className="hero__nav-mobile">
              <Select
                className="Select-white"
                name="mobile-pricing-nav"
                value={selectValue}
                onChange={this.mobileNavChange}
                placeholder="Select page"
                options={this.selectOptions}
              />
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div className="pricing">
        <Helmet>
          <title>Pricing || CABIN</title>
        </Helmet>

        { this.props.location.pathname !== "/pricing/custom" ? heroRender : null }

        <Route exact={true} path="/pricing" component={PricingCore} />
        <Route path="/pricing/incorporation" component={PricingIncorp} />
        <Route path="/pricing/dormant" component={PricingDormant} />
        <Route path="/pricing/custom" component={PricingCustom} />

        <GetStartedBottom />

      </div>
    );
  }
}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
