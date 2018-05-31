import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import FaqPanel from '../components/FaqPanel';
import PricingOption from '../components/PricingOption';

export default class PricingCore extends Component {
  static propTypes = {

  };


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
          <title>Pricing Core || CABIN</title>
        </Helmet>

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
