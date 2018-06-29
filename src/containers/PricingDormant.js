import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_PRICING_PLAN } from '../store/ActionTypes';
import { Tooltip } from 'react-tippy';
import { Helmet } from 'react-helmet';
import { GetStarted } from '../routes';

import FaqPanel from '../components/FaqPanel';
import PricingOption from '../components/PricingOption';
import PricingScopeList from '../components/PricingScopeList';

import SvgIcon from '../components/SvgIcon';


class PricingDormant extends Component {

  onSelectPlanClick = (pricingName) => {
    this.props.setPricingPlan(pricingName);
  }

  preloaderOnHover = (component) => {
    component.preload();
  };

  render(){
    const faqContent = [
      {
        name: 'Do I need a corporate secretary? ',
        content: 'All companies are required to appoint a company secretary within 6 months of incorporation. It is important to appoint a professional secretary familiar with the Singapore Companies Act as the job covers a few specialised and mandatory duties. Being compliant will help avoid some of the fines and penalties commonly faced by companies.',
        isDefaultOpened: true
      },
      {
        name: 'Are government fees included?',
        content: 'Our fees exclude all Out-of-Pocket expenses paid to third parties, including ACRA filing fees and fines. For most businesses, you will expect an additional S$60 payable to ACRA annually for your Annual Return filing.'
      },
      {
        name: 'If I have minimal transactions do I count as a dormant company?',
        content: 'A Dormant company is defined by ACRA as a company without any transaction in its bank account other than corporate secretarial fees, accounting and auditor fees, and ACRA fees. If you have minimal transactions, check out our <a href="/pricing">Annual Reporting</a> plan. We typically waive the bookkeeping fees if you have less than 10 transactions per year. '
      }
    ]

    const PricingScopePrice = (
      <React.Fragment>
        <div className="pricing-scope__price-main">S$780</div>
        <div className="pricing-scope__price-for">per year</div>
        <div className="pricing-scope__tooltip">
          <Tooltip
            title="A Dormant company is defined by ACRA as a company without any bank transactions other than corporate secretarial fees, accounting and auditor fees, and ACRA fees."
            position="left"
            distance="10"
            arrow="true">
              <SvgIcon name="question-circle" />
          </Tooltip>
        </div>

      </React.Fragment>
    )

    return(
      <React.Fragment>
        <Helmet>
          <title>Pricing Dormant || CABIN</title>
        </Helmet>

      <div className="pricing-scope" data-aos="fade-up">
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
                  { PricingScopePrice }
                </div>
              </div>
              <PricingScopeList
                list={[
                  [
                    "Corporate secretary (12 months)",
                    "Annual General Meeting (AGM)",
                    "Annual Return"
                  ],
                  [
                    {
                      name: "Unaudited Annual Financial Statements",
                      tooltip: "A Dormant company is defined by ACRA as a company without any bank transactions other than corporate secretarial fees, accounting and auditor fees, and ACRA fees."
                    },
                    "Tax computation and filing"
                  ]
                ]}
              />
              <div className="pricing-scope__price pricing-scope__price--mobile">
                { PricingScopePrice }
              </div>
            </div>
            <div className="pricing-scope__cta">
              <Link to="/get-started"
                onClick={this.onSelectPlanClick.bind(this, 'Dormant (S$780)')}
                onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
                className="btn btn--mega btn--block">
                Select <span>Dormant</span> Plan
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pricing-options" data-aos="fade-up">
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
                  name="Non-shares matters"
                  tooltipContent="For example: Board approval of contracts and agreement, Opening/termination of bank accounts, Change of bank signatories, Change of financial year end, Extension of Annual General Meeting (AGM) deadline, Approval of Director’s remuneration, etc."
                  price="S$50"
                  pricePer="per transaction"
                />
                <PricingOption
                  name="Shares matters"
                  tooltipContent="For example: Transfer of shares, Replacement of share certificates, Issuance of dividends and bonus, Share allotment for new shareholders, etc"
                  price="S$75"
                  pricePer="per transaction"
                />
                <PricingOption
                  name="Complex matters"
                  tooltipContent="For example: Instatement of Employee Stock Option Scheme (ESOS, Share buyback - equal access (Section 76C) or selective acquisition (Section 76D), Reduction of share capital (Section 78B), Striking off or unwinding of Company, etc."
                  price="S$150"
                  priceSuf="from"
                  pricePer="per transaction"
                />
                <PricingOption
                  name="Corporate shareholder involved"
                  tooltipContent="Applicable if a corporate shareholder has more than 25% shareholding. Additional due diligence and compliance processes required by MAS’s anti-money laundering regulation"
                  price="S$100"
                  pricePer="per entity<br>per year"
                />
                <PricingOption
                  name="5th director/shareholder onwards"
                  tooltipContent="Additional administrative and recording keeping processes required"
                  price="S$25"
                  pricePer="per individual<br>per year"
                />
                <PricingOption
                  name="Provision of registered address"
                  tooltipContent="Inclusive of weekly mail scanning service. Mail forwarding service will be provided upon request (S$10 per package + courier fees)."
                  price="S$300"
                  pricePer="per year"
                />
                <PricingOption
                  name="Provision of Nominee Director"
                  tooltipContent="All companies are required to have one ordinarily resident director in Singapore (i.e. Singapore Citizen, PR, EntrePass holder, and selected approved EP holder). If you are a foreigner, we will provide a Nominee Director to help fulfil this requirement."
                  price="S$2000"
                  pricePer="per year"
                />
              </div>
            </div>
            <div className="pricing-options__col">
              <div className="pricing-options__section-name">Accounting and Tax</div>
              <div className="pricing-options__section">
                <PricingOption
                  name="XXBRL filing required (financial statements highlights)"
                  tooltipContent="Required for insolvent exempt private companies or companies regulated by MAS"
                  price="S$250"
                  withoutPlus={true}
                />
                <PricingOption
                  name="XBRL filing required (full-set, non-consolidated)"
                  tooltipContent="Required for companies with corporate shareholder(s)"
                  price="S$350"
                  withoutPlus={true}
                />
                <PricingOption
                  name="XBRL filing required (full-set, consolidated) "
                  tooltipContent="Required for holding companies with corporate shareholder(s)"
                  price="S$450"
                  withoutPlus={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq" data-aos="fade-up">
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
