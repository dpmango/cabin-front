import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_PRICING_PLAN } from '../store/ActionTypes';
import { Tooltip } from 'react-tippy';
import { Helmet } from 'react-helmet';

import FaqPanel from '../components/FaqPanel';
import PricingOption from '../components/PricingOption';
import PricingScopeList from '../components/PricingScopeList';

import SvgIcon from '../components/SvgIcon';

class PricingDormant extends Component {

  onSelectPlanClick = (pricingName) => {
    this.props.setPricingPlan(pricingName);
  }

  render(){
    const faqContent = [
      {
        name: 'How do you determine a bank transaction?',
        content: 'Our most comprehensive service. Accounting, tax, corporate secretary, back office operations, all in one affordable monthly subscription. All of our plan comes with a dedicated team to handle your finance operations and simple software to let you keep track of your financials.',
        isDefaultOpened: true
      },
      {
        name: 'If I exceed my pricing tier by a few transactions, do you move me up a tier?',
        content: 'Our most comprehensive service. Accounting, tax, corporate secretary, back office operations, all in one affordable monthly subscription. All of our plan comes with a dedicated team to handle your finance operations and simple software to let you keep track of your financials.'
      }
    ]

    return(
      <React.Fragment>
        <Helmet>
          <title>Pricing Dormant || CABIN</title>
        </Helmet>

      <div className="pricing-scope">
        <div className="container container--narrow">
          <div className="pricing-scope__holder">
            <div className="pricing-scope__box">
              <div className="pricing-scope__head">
                <div className="pricing-scope__icon">
                  <i className="icon icon-pricing-corporate" />
                </div>
                <div className="pricing-scope__names">
                  <div className="pricing-scope__name">Dormant</div>
                  <div className="pricing-scope__description">I have a dormant company, and I need all year-end compliances taken care of</div>
                </div>
                <div className="pricing-scope__price">
                  <div className="pricing-scope__price-main">S$850</div>
                  <div className="pricing-scope__price-for">per year</div>
                  <div className="pricing-scope__tooltip">
                    <Tooltip
                      title="This plan is very good for startaps"
                      position="left"
                      distance="10"
                      arrow="true">
                        <SvgIcon name="question-circle" />
                    </Tooltip>
                  </div>
                </div>
              </div>
              <PricingScopeList
                list={[
                  [
                    "Company name search and reservation",
                    "Company structure and Constitution advisory",
                    "Minutes and resolution of First Director’s Meeting"
                  ],
                  [
                    "Company name search and reservation",
                    "Company structure and Constitution advisory",
                    "Minutes and resolution of First Director’s Meeting"
                  ]
                ]}
              />

            </div>
            <div className="pricing-scope__cta">
              <Link to="/get-started" onClick={this.onSelectPlanClick.bind(this, 'Dormant (S$850)')} className="btn btn--mega btn--block">Select <span>Dormant</span> Plan</Link>
            </div>
          </div>
        </div>
      </div>


      <div className="pricing-options">
        <div className="container">
          <div className="pricing-options__heading">
            <h2>Additional requirements</h2>
            <p className="t-paragraph">Our packages include everything a typical company needs. However, there may be some additional requirements specific to your business. We’ve got them covered here.</p>
          </div>

          <div className="pricing-options__grid">
            <div className="pricing-options__col">
              <div className="pricing-options__section-name">Corporate Secretary</div>
              <div className="pricing-options__section">
                <PricingOption
                  name="Non-shares related matters"
                  tooltipContent="Tooltip content for pricing option"
                  price="S$50"
                  pricePer="per transaction"
                />
                <PricingOption
                  name="Shares related matters"
                  tooltipContent="Tooltip content for pricing option"
                  price="S$75 - S$150"
                  pricePer="per transaction"
                />
                <PricingOption
                  name="Complex matters"
                  tooltipContent="Tooltip content for pricing option"
                  price="S$150"
                  priceSuf="from"
                  pricePer="per transaction"
                />
              </div>
            </div>
            <div className="pricing-options__col">
              <div className="pricing-options__section-name">Accounting & Tax</div>
              <div className="pricing-options__section">
                <PricingOption
                  name="Corporate Shareholder Involved"
                  tooltipContent="Tooltip content for pricing option"
                  price="S$100"
                  pricePer="per entity<br>per year"
                />
                <PricingOption
                  name="5th Director/Shareholder Onwards"
                  tooltipContent="Tooltip content for pricing option"
                  price="S$25"
                  pricePer="per induvidual<br>per year"
                />
                <PricingOption
                  name="Provision of Nominee Director"
                  tooltipContent="Tooltip content for pricing option"
                  price="S$2000"
                  pricePer="per year"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq">
        <div className="t-center">
          <h2>FAQ</h2>
        </div>
        <div className="container container--narrow">
          {faqContent.map((el, i) => (
            <FaqPanel key={i} name={el.name} content={el.content} isOpenedByDefault={el.isDefaultOpened} />
          ))}
        </div>
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  // pricingOptions: state.pricing.pricingOptions,
});

const mapDispatchToProps = (dispatch) => ({
  setPricingPlan: (data) => dispatch({ type: SET_PRICING_PLAN, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingDormant);
