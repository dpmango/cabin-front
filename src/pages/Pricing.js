import React, { Component } from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from 'store/ActionTypes';
import Select from 'react-select';

import GetStartedBottom from 'components/GetStartedBottom';

import PricingAccounting from 'containers/PricingAccounting';
import PricingSecretary from 'containers/PricingSecretary';
import PricingIncorp from 'containers/PricingIncorp';
import PricingDormant from 'containers/PricingDormant';
import PricingCustom from 'containers/PricingCustom';
import PricingMonthly from 'containers/PricingMonthly';

class Pricing extends Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.selectOptions = [
      { value: '/pricing/accounting', label: 'Accounting and tax' },
      { value: '/pricing/secretary', label: 'Corporate secretary' },
      { value: '/pricing/incorporation', label: 'Incorporation' },
      { value: '/pricing/dormant', label: 'Dormant company' }
    ]

    this.state = {
      selectValue: this.selectOptions.filter( x =>
        x.value.replace(/\//g,'') === props.location.pathname.replace(/\//g,'') )[0]
    };
  }

  componentDidMount(){
    this.props.aosInst.refreshHard();
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
    const { location } = this.props;

    const heroRender = (
      <div className="hero">
        <div className="hero__bg">
          <img src={require('images/pricingHeroImg.png')} srcSet={require('images/pricingHeroImg@2x.png')  + ' 2x'} alt=""/>
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
              <NavLink to="/pricing/accounting" className="hero__nav-el" activeClassName='is-active'>
                Accounting and tax
              </NavLink>
              <NavLink to="/pricing/secretary" className="hero__nav-el" activeClassName='is-active'>
                Corporate secretary
              </NavLink>
              <NavLink to="/pricing/incorporation" className="hero__nav-el" activeClassName='is-active'>
                Incorporation
              </NavLink>
              <NavLink to="/pricing/dormant" className="hero__nav-el" activeClassName='is-active'>
                Dormant company
              </NavLink>
            </div>
            <div className="hero__nav-mobile">
              <Select
                className="Select-white"
                name="mobile-pricing-nav"
                searchable={false}
                autosize={false}
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
        { location.pathname.indexOf("/pricing/custom") === -1 &&
          location.pathname.indexOf("/pricing/monthly") === -1
          ? heroRender : null }

        <Route exact={true} path="/pricing" component={PricingRouter} />
        <Route path="/pricing/accounting" component={PricingAccounting} />
        <Route path="/pricing/secretary" component={PricingSecretary} />
        <Route path="/pricing/incorporation" component={PricingIncorp} />
        <Route path="/pricing/dormant" component={PricingDormant} />
        <Route path="/pricing/custom" component={PricingCustom} />
        <Route path="/pricing/monthly" component={PricingMonthly} />

        <GetStartedBottom />

      </div>
    );
  }
}

class PricingRouter extends Component{
  render(){
    return(
      <React.Fragment>
        <Redirect to="/pricing/accounting" />
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
