import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_PRICING_PLAN } from '../store/ActionTypes';
import { Helmet } from 'react-helmet';
import { GetStarted } from '../routes';

import ScrollTo from '../services/ScrollTo';
import SvgIcon from '../components/SvgIcon';
import FaqPanel from '../components/FaqPanel';
import PricingOption from '../components/PricingOption';
import PricingScopeList from '../components/PricingScopeList';
import PricingTableTr from '../components/PricingTableTr';

class PricingCore extends Component {
  static propTypes = {

  };

  constructor(props){
    super(props);

    this.tableRef = React.createRef();
  }

  onSelectPlanClick = (pricingName) => {
    this.props.setPricingPlan(pricingName);
  }

  scrollToTable = () => {
    const docElement = document.scrollingElement || document.documentElement
    const topFromDoc = this.tableRef.current.getBoundingClientRect().top + docElement.scrollTop
    ScrollTo(topFromDoc, 1000)
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
        name: 'Can I do my own bookkeeping?',
        content: 'Definitely. We will require a trial balance to be generated before we can take over to compile your annual financial statements and compute your corporate tax. For companies with minimal transactions (less than 10 transactions per year), we typically waive the bookkeeping fees. '
      },
      {
        name: 'What accounting software do you use?',
        content: 'Cabin does all of our accounting on Xero, a cloud accounting software. Xero offers a wide range of integration with other enterprise tools like payroll. Being on Xero means that you are not locked in and if you decide to move on from Cabin, you can take all your accounting data with you easily. '
      }
    ]

    return(
      <div data-aos="fade">
        <Helmet>
          <title>Cabin</title>
        </Helmet>

        <div className="pricing-scope" >
          <div className="container">
            <div className="pricing-scope__grid">

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-secretary" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Corporate Secretary</div>
                    <div className="pricing-scope__description"><span>I need a corporate secretary only</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        "Corporate secretary (12 months)",
                        "Annual General Meeting (AGM)",
                        "Annual Return"
                      ]
                    ]}
                  />
                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-main">S$350</div>
                    <div className="pricing-scope__price-for">per year</div>
                  </div>
                </div>
                <div className="pricing-scope__cta">
                  <Link to="/get-started"
                    onClick={this.onSelectPlanClick.bind(this, 'Corporate Secretary')}
                    onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
                    className="btn btn--mega btn--block">
                    Select <span>Corporate Secretary</span> Plan
                  </Link>
                </div>
                <div className="pricing-scope__compare">
                  <a onClick={this.scrollToTable} className="learn-more">Compare features <SvgIcon name="right-arrow" /></a>
                </div>
              </div>

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-allin" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Annual Reporting</div>
                    <div className="pricing-scope__description"><span>I need a comprehensive plan to cover all my accounting, tax, and corporate secretary needs</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        "Corporate secretary (12 months)",
                        "Annual General Meeting (AGM)",
                        "Annual Return",
                        {
                          name: "Unaudited Annual Financial Statements",
                          tooltip: "Prepared based on Singapore Financial Reporting Standards (SFRS)"
                        },
                        "Tax computation and filing"
                      ]
                    ]}
                  />

                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-main">S$1,250</div>
                    <div className="pricing-scope__price-for">per year</div>
                  </div>
                </div>
                <div className="pricing-scope__cta">
                  <Link to="/get-started"
                    onClick={this.onSelectPlanClick.bind(this, 'Annual Reporting')}
                    onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
                    className="btn btn--mega btn--block">
                    Select <span>Annual Reporting</span> Plan
                  </Link>
                </div>
                <div className="pricing-scope__compare">
                  <a onClick={this.scrollToTable} className="learn-more">Compare features <SvgIcon name="right-arrow" /></a>
                </div>
              </div>

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__tag">Most Popular</div>
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-full-stack" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Customised Finance Team</div>
                    <div className="pricing-scope__description"><span>I need a team to handle all my day-to-day finance operations, customised to my budget and needs</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        "Corporate secretary (12 months)",
                        "Annual General Meeting (AGM)",
                        "Annual Return",
                        {
                          name: "Unaudited Annual Financial Statements",
                          tooltip: "Prepared based on Singapore Financial Reporting Standards (SFRS)"
                        },
                        "Tax computation and filing",
                        "Monthly management reports",
                        "Accounts payable and receivable service",
                        "Payroll and staff expense claims",
                        "Complex accounting requirements"
                      ]
                    ]}
                  />

                  <div className="pricing-scope__more">
                    <Link to="/pricing/custom" className="learn-more">Learn more <SvgIcon name="right-arrow" /></Link>
                  </div>

                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-starting">From</div>
                    <div className="pricing-scope__price-main">S$200</div>
                    <div className="pricing-scope__price-for">per month</div>
                  </div>
                </div>
                <div className="pricing-scope__cta">
                  <Link to="/get-started"
                    onClick={this.onSelectPlanClick.bind(this, 'Customised Finance Team')}
                    onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
                    className="btn btn--mega btn--block">
                    Select <span>Customised Finance Team</span> Plan
                  </Link>
                </div>
                <div className="pricing-scope__compare">
                  <a onClick={this.scrollToTable} className="learn-more">Compare features <SvgIcon name="right-arrow" /></a>
                </div>

              </div>

            </div>
          </div>
        </div>

        <div className="pricing-table"  ref={this.tableRef}>
          <div className="container">
            <div className="t-center">
              <h2>Detailed Features</h2>
            </div>
            <div className="pricing-table__wrapper">
              <div className="pricing-table__table">
                <div className="pricing-table__thead">
                  <div className="pricing-table__thead-wrapper">

                    <div className="pricing-table__td">
                      <div className="pricing-table__head">
                        <i className="icon icon-pricing-secretary" />
                        <div className="pricing-table__head-name">Corporate Secretary</div>
                      </div>
                    </div>
                    <div className="pricing-table__td">
                      <div className="pricing-table__head">
                        <i className="icon icon-pricing-allin" />
                        <div className="pricing-table__head-name">Annual Reporting</div>
                      </div>
                    </div>
                    <div className="pricing-table__td">
                      <div className="pricing-table__head pricing-table__head--popular">
                        <i className="icon icon-pricing-full-stack" />
                        <div className="pricing-table__head-name">Customised <br/>Finance Team</div>
                        <div className="pricing-table__head-tag">Most Popular</div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pricing-table__tbody">
                  <PricingTableTr
                    tag="ACRA"
                    name="Provision of a qualified person as your company secretary"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="ACRA"
                    name="Safekeeping and updates to Company Registers"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="ACRA"
                    name="Preparation of Annual General Meeting (AGM) documents"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="ACRA"
                    name="Filing of Annual Return to ACRA"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="ACRA"
                    name="Advisory on Corporate Secretarial compliance matters"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="ACRA"
                    name="Compilation of unaudited Annual Financial Statements"
                    tooltipContent="Prepared based on Singapore Financial Reporting Standards (SFRS)"
                    checks={[
                      false, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="IRAS"
                    name="Corporate tax computation and filing of ECI and Form C-S"
                    checks={[
                      false, true, true
                    ]}
                  />
                  <PricingTableTr
                    name="Tax optimisation and planning"
                    tooltipContent="Cabin’s tax optimisation and planning service thoroughly combs through your financials to help maximise deductions. This includes planning your capital allowances, S14Q claims, and donation claims to fully utilise your tax allowance."
                    checks={[
                      false, true, true
                    ]}
                  />
                  <PricingTableTr
                    name="Bookkeeping"
                    checks={[
                      false,
                      {
                        name: "S$150 per 50 transactions",
                        tooltipContent: "We determine this through the number of transactions on your bank statements. Every deposit or withdrawal counts as a single transaction"
                      },
                      true
                    ]}
                  />
                  <PricingTableTr
                    name="Monthly management reports: Profit and Loss, Balance Sheet, and Cash Flow Statement"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Monthly scorecard of key financial metrics"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Accounts payable: Issuing payments to suppliers"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Accounts receivable: Chasing overdue invoices"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Payroll and staff expense claims"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Cabin assistant"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Profit centre tracking"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Complex revenue recognition"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Projections and budget tracking"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Finance team management"
                    checks={[
                      false, false, true
                    ]}
                  />

                </div>
              </div>

              <div className="pricing-table-legend">
                <div className="pricing-table-legend__texts">
                  <span className="pricing-table__tag">ARCA</span>
                  <span className="pricing-table__name">Statutory requirement by ACRA</span>

                  <span className="pricing-table__tag">IRAS</span>
                  <span className="pricing-table__name">Statutory requirement by IRAS</span>
                </div>

                <div className="pricing-table-legend__cta">
                  <Link to="/pricing/custom" className="learn-more">Learn more <SvgIcon name="right-arrow" /></Link>
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
                    name="GST Registration"
                    tooltipContent="For companies with revenue more than S$1M in the last 12 month"
                    price="S$300"
                    withoutPlus={true}
                  />
                  <PricingOption
                    name="Form C filing required"
                    tooltipContent="For companies with annual turnover of S$5M or above, or have complex tax claims and deductions"
                    price="S$215"
                    withoutPlus={true}
                  />
                  <PricingOption
                    name="XBRL filing required (financial statements highlights)"
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

export default connect(mapStateToProps, mapDispatchToProps)(PricingCore);
