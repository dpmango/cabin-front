import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_PRICING_PLAN } from 'store/ActionTypes';
import { Tooltip } from 'react-tippy';
import { GetStarted } from 'routes';
import ScrollTo from 'services/ScrollTo';
import FaqPanel from 'components/FaqPanel';
import PricingOption from 'components/PricingOption';
import PricingScopeList from 'components/PricingScopeList';
import SvgIcon from 'components/SvgIcon';

class PricingIncorp extends Component {

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
    ]

    return(
      <div data-aos="fade">
        <div className="pricing-scope" >
          <div className="container">
            <div className="pricing-scope__grid">

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-incorp-lean" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Lean Incorporation</div>
                    <div className="pricing-scope__description"><span>The basics to get your <br/>company started</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        "Company name search and reservation",
                        "Company structure and Constitution advisory",
                        "Minutes and resolution of First Director’s Meeting",
                        "Share certificates issuance",
                        "Form 45 and Form 45B"
                      ]
                    ]}
                  />
                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-starting"></div>
                    <div className="pricing-scope__price-main">S$150
                      <Tooltip
                        title="Excludes statutory filing fees and name registration fees of S$315"
                        position="top"
                        distance="10"
                        arrow="true">
                          <SvgIcon name="question-circle" />
                      </Tooltip>
                    </div>
                    <div className="pricing-scope__price-for"></div>
                  </div>
                </div>
                <div className="pricing-scope__cta">
                  <Link to="/get-started"
                    onClick={this.onSelectPlanClick.bind(this, 'Lean Incorporation')}
                    onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
                    className="btn btn--mega btn--block">
                    Select <span>Lean Incorporation</span> Plan
                  </Link>
                </div>
              </div>

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__tag">Most Popular</div>
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-incorp-standart" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Standard Incorporation</div>
                    <div className="pricing-scope__description"><span>Includes one year of corporate secretary</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        "Company name search and reservation",
                        "Company structure and Constitution advisory",
                        "Minutes and resolution of First Director’s Meeting",
                        "Share certificates issuance",
                        "Form 45 and Form 45B",
                        {
                          fragment:
                            <React.Fragment>
                              1-year <Link to="/pricing/secretary" onClick={ScrollTo.bind(this, 0, 300)}> Corporate Secretary </Link> plan
                            </React.Fragment>
                        }
                      ]
                    ]}
                  />

                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-starting"></div>
                    <div className="pricing-scope__price-main">S$400
                      <Tooltip
                        title="Excludes statutory filing fees and name registration fees of S$315"
                        position="top"
                        distance="10"
                        arrow="true">
                          <SvgIcon name="question-circle" />
                      </Tooltip>
                    </div>
                    <div className="pricing-scope__price-for">save S$100</div>
                  </div>

                </div>
                <div className="pricing-scope__cta">
                  <Link to="/get-started"
                    onClick={this.onSelectPlanClick.bind(this, 'Standard Incorporation')}
                    onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
                    className="btn btn--mega btn--block">
                    Select <span>Standard Incorporation</span> Plan
                  </Link>
                </div>

              </div>

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-incorp-value" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Value Incorporation</div>
                    <div className="pricing-scope__description"><span>Includes one year of corporate secretary, accounting, and tax</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        "Company name search and reservation",
                        "Company structure and Constitution advisory",
                        "Minutes and resolution of First Director’s Meeting",
                        "Share certificates issuance",
                        "Form 45 and Form 45B",
                        {
                          fragment:
                            <React.Fragment>
                              1-year <Link to="/pricing/secretary" onClick={ScrollTo.bind(this, 0, 300)}> Corporate Secretary </Link> plan
                            </React.Fragment>
                        },
                        {
                          fragment:
                            <React.Fragment>
                              1-year <Link to="/pricing" onClick={ScrollTo.bind(this, 0, 300)}> Annual Reporting </Link> plan
                            </React.Fragment>
                        }
                      ]
                    ]}
                  />

                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-starting"></div>
                    <div className="pricing-scope__price-main">S$1,150
                      <Tooltip
                        title="Excludes statutory filing fees and name registration fees of S$315"
                        position="top"
                        distance="10"
                        arrow="true">
                          <SvgIcon name="question-circle" />
                      </Tooltip>
                    </div>
                    <div className="pricing-scope__price-for">save S$300</div>
                  </div>

                </div>
                <div className="pricing-scope__cta">
                  <Link to="/get-started"
                    onClick={this.onSelectPlanClick.bind(this, 'Value Incorporation')}
                    onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
                    className="btn btn--mega btn--block">
                    Select <span>Value Incorporation</span> Plan
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </div>

        <div className="pricing-options" >
          <div className="container">
            <div className="pricing-options__heading">
              <h2>Additional requirements</h2>
              <p className="t-paragraph">Our packages include everything a typical company needs. However, there may be some additional requirements specific to your business. We’ve got them covered here.</p>
            </div>
            <div className="pricing-options__grid pricing-options__grid--no-heading">
              <div className="pricing-options__col">
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

                </div>
              </div>
              <div className="pricing-options__col">
                <div className="pricing-options__section">
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
            </div>
          </div>
        </div>

        <div className="faq" >
          <div className="t-center">
            <h2>FAQ</h2>
          </div>
          <div className="container container--narrow">
            {faqContent.map((el, i) => (
              <FaqPanel key={i} name={el.name} content={el.content} isOpenedByDefault={el.isDefaultOpened} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  // pricingOptions: state.pricing.pricingOptions,
});

const mapDispatchToProps = (dispatch) => ({
  setPricingPlan: (data) => dispatch({ type: SET_PRICING_PLAN, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingIncorp);
