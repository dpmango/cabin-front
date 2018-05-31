import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';

import SvgIcon from '../components/SvgIcon';
import PricingBuilderSection from '../components/PricingBuilderSection';


class PricingCustom extends Component {

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Pricing Custom || CABIN</title>
        </Helmet>

        <div className="hero">
          <div className="hero__bg">
            <img src={require('../images/pricingHeroCustom.png')} srcSet={require('../images/pricingHeroCustom@2x.png')  + ' 2x'} alt=""/>
          </div>
          <div className="container container--narrow">
            <div className="hero__wrapper">
              <span className="t-small">Pricing</span>
              <h2>Custom Plan</h2>
              <p className="t-paragraph">Comprehensive monthly plan with everything you need in one affordable monthly subscription.</p>
              <div className="hero__info">This is a pricing calculator to help you understand our pricing structure. Don’t worry about getting it right, our sales team will spend time to understand your business needs and propose a plan that is right for you. </div>
            </div>
          </div>
        </div>

        <PricingBuilderSection
          headerStep="Step 1"
          headerName="Accounting and Tax"
          headerDesc="Pick a plan base on the scale of your business"
          headerTooltipContent="We determine this through the number of transactions on your bank statements. Every deposit or withdrawal counts as a single transaction. We may exercise our own discretion to not count repeated transactions of the same nature. "

          boxes={{
            name: "Monthly accounting and tax services",
            price: "S$200",
            pricePer: "per month",
            priceStartingFrom: true,
            pricingOptions: [
              {
                name: "<25 bank transactions",
                price: "S$200",
                pricePer: "per month"
              },
              {
                name: "25 - 75 bank transactions",
                price: "S$375",
                pricePer: "per month"
              },
              {
                name: "75 - 125 bank transactions",
                price: "S$550",
                pricePer: "per month"
              },
              {
                name: "125 - 200 bank transactions",
                price: "S$650",
                pricePer: "per month"
              },
              {
                name: "200 - 300 bank transactions",
                price: "S$850",
                pricePer: "per month"
              }
            ],
            boxList: [
              [
                "Monthly management reports (P&L, balance sheet, cash flow statement)",
                "Bookkeeping",
                "Bank reconciliation",
                "Software subscription"
              ],
              [
                "Annual Financial Statements based on Singapore Financial Reporting Standards (SFRS)",
                "Annual corporate tax computation and filing (ECI and Form C-S)",
                "Tax optimisation and planning*",
                "GST computation and quarterly GST F5 submission (for GST-registered company)"
              ]
            ]
          }}
        />


        <div className="pricing-float">
          <div className="container container--narrow">
            <div className="pricing-float__wrapper">
              <div className="pricing-float__summary">
                <span className="pricing-float__summary-holder">Your Custom Plan:</span>
                <div className="pricing-float__summary-price">
                  <span>S$2500</span>
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
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => (
  {

  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PricingCustom);
