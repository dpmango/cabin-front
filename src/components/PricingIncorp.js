import React, { Component } from 'react';
import { Tooltip } from 'react-tippy';
import { Helmet } from 'react-helmet';

import FaqPanel from '../components/FaqPanel';
import PricingOption from '../components/PricingOption';
import SvgIcon from '../components/SvgIcon';

export default class PricingIncorp extends Component {

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
          <title>Pricing Incorporation || CABIN</title>
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
                  <div className="pricing-scope__name">Incorporation</div>
                  <div className="pricing-scope__description">I want to incorporate a company</div>
                </div>
                <div className="pricing-scope__price">
                  <div className="pricing-scope__price-main">S$350</div>
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

              <div className="pricing-scope__list">
                <div className="pricing-scope__list-col">
                  <div className="pricing-scope__list-el">
                    <SvgIcon name="check" />
                    <span>Company name search and reservation</span>
                  </div>
                  <div className="pricing-scope__list-el">
                    <SvgIcon name="check" />
                    <span>Company structure and Constitution advisory</span>
                  </div>
                  <div className="pricing-scope__list-el">
                    <SvgIcon name="check" />
                    <span>Minutes and resolution of First Director’s Meeting</span>
                  </div>
                </div>
                <div className="pricing-scope__list-col">
                  <div className="pricing-scope__list-el">
                    <SvgIcon name="check" />
                    <span>Company name search and reservation</span>
                  </div>
                  <div className="pricing-scope__list-el">
                    <SvgIcon name="check" />
                    <span>Company structure and Constitution advisory</span>
                  </div>
                  <div className="pricing-scope__list-el">
                    <SvgIcon name="check" />
                    <span>Minutes and resolution of First Director’s Meeting</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="pricing-scope__cta">
              <a className="btn btn--mega btn--block">Select <span>Incorporation</span> Plan</a>
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
          <div className="pricing-options__section-name">Corporate Secretary</div>
          <div className="pricing-options__grid">
            <div className="pricing-options__col">
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
