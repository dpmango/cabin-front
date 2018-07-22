import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_PRICING_PLAN } from '../store/ActionTypes';
import { Tooltip } from 'react-tippy';
import { GetStarted } from '../routes';

import ScrollTo from '../services/ScrollTo';
import SvgIcon from '../components/SvgIcon';
import FaqPanel from '../components/FaqPanel';
import PricingOption from '../components/PricingOption';
import PricingScopeList from '../components/PricingScopeList';
import PricingTableTr from '../components/PricingTableTr';

class PricingAccounting extends Component {
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
        name: 'Can I do my own bookkeeping?',
        content: 'Definitely. We will require a trial balance to be generated before we can take over to compile your annual financial statements and compute your corporate tax. For companies with minimal transactions (less than 10 transactions per year), we typically waive the bookkeeping fees.',
        isDefaultOpened: true
      },
      {
        name: 'What accounting software do you use?',
        content: 'Cabin does all of our accounting on Xero, a cloud accounting software. Xero offers a wide range of integration with other enterprise tools like payroll. Being on Xero means that you are not locked in and if you decide to move on from Cabin, you can take all your accounting data with you easily. '
      }
    ]

    return(
      <div data-aos="fade">
        <div className="pricing-scope" >
          <div className="container">
            <div className="pricing-scope__grid">

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-annual-reporting" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Annual Reporting</div>
                    <div className="pricing-scope__description"><span>Basic plan to cover all your annual reporting requirements to ACRA and IRAS</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        {
                          name: "Unaudited Annual Financial Statements",
                          tooltip: "Compliant with Singapore Financial Reporting Standards (SFRS)"
                        },
                        "Annual corporate tax computation",
                        "Filing of ECI and Form C-S with IRAS",
                        "Support for AGM documents preparation"
                      ]
                    ]}
                  />
                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-starting">From</div>
                    <div className="pricing-scope__price-main">S$750
                      <Tooltip
                        title="Indicative rate for a standard company. Additional charges might apply for complex business or disclosure requirements. Speak to us for a quote based on your company’s requirements."
                        position="top"
                        distance="10"
                        arrow="true">
                          <SvgIcon name="question-circle" />
                      </Tooltip>
                    </div>
                    <div className="pricing-scope__price-for">per year</div>
                  </div>
                  <div className="pricing-scope__more">

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
                    <i className="icon icon-pricing-monthly-reporting" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Monthly Reporting</div>
                    <div className="pricing-scope__description"><span>Standard plan to provide monthly management reports for decision making</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        {
                          name: "Unaudited Annual Financial Statements",
                          tooltip: "Compliant with Singapore Financial Reporting Standards (SFRS)"
                        },
                        "Annual corporate tax computation",
                        "Filing of ECI and Form C-S with IRAS",
                        "Support for AGM documents preparation",
                        "<strong>Monthly management reports</strong>",
                        "<strong>Monthly scorecard of key financial metrics</strong>",
                        "<strong>Quarterly GST computation and submission</strong>"
                      ]
                    ]}
                  />

                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-starting">From</div>
                    <div className="pricing-scope__price-main">S$200</div>
                    <div className="pricing-scope__price-for">per month</div>
                  </div>

                  <div className="pricing-scope__more">
                    <Link to="/pricing/monthly" className="learn-more">Detailed Pricing <SvgIcon name="right-arrow" /></Link>
                  </div>
                </div>
                <div className="pricing-scope__cta">
                  <Link to="/get-started"
                    onClick={this.onSelectPlanClick.bind(this, 'Monthly Reporting')}
                    onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
                    className="btn btn--mega btn--block">
                    Select <span>Monthly Reporting</span> Plan
                  </Link>
                </div>
                <div className="pricing-scope__compare">
                  <a onClick={this.scrollToTable} className="learn-more">Compare features <SvgIcon name="right-arrow" /></a>
                </div>
              </div>

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-full-stack" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Customised Finance Team</div>
                    <div className="pricing-scope__description"><span>Comprehensive plan to handle day-to-day finance operations and complex requirements</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        {
                          name: "Unaudited Annual Financial Statements",
                          tooltip: "Compliant with Singapore Financial Reporting Standards (SFRS)"
                        },
                        "Annual corporate tax computation",
                        "Filing of ECI and Form C-S with IRAS",
                        "Support for AGM documents preparation",
                        "Monthly management reports",
                        "Monthly scorecard of key financial metrics",
                        "Quarterly GST computation and submission",
                        "<strong>Accounts payable and receivable service</strong>",
                        "<strong>Payroll and staff expense claims</strong>",
                        "<strong>Complex accounting requirements</strong>"
                      ]
                    ]}
                  />

                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-starting"></div>
                    <div className="pricing-scope__price-main">Varies</div>
                    <div className="pricing-scope__price-for"></div>
                  </div>

                  <div className="pricing-scope__more">
                    <Link to="/pricing/custom" className="learn-more">Detailed Pricing <SvgIcon name="right-arrow" /></Link>
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
                        <i className="icon icon-pricing-annual-reporting" />
                        <div className="pricing-table__head-name">Annual Reporting</div>
                      </div>
                    </div>
                    <div className="pricing-table__td">
                      <div className="pricing-table__head pricing-table__head--popular">
                        <i className="icon icon-pricing-monthly-reporting" />
                        <div className="pricing-table__head-name">Monthly Reporting</div>
                        <div className="pricing-table__head-tag">Most Popular</div>
                      </div>
                    </div>
                    <div className="pricing-table__td">
                      <div className="pricing-table__head">
                        <i className="icon icon-pricing-full-stack" />
                        <div className="pricing-table__head-name">Customised <br/>Finance Team</div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pricing-table__tbody">
                  <PricingTableTr
                    tag="ACRA"
                    name="Compilation of unaudited Annual Financial Statements"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="IRAS"
                    name="Corporate tax computation and filing of ECI and Form C-S"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="ACRA"
                    name="Compliant with Singapore Companies Act"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="IRAS"
                    name="Compliant with Income Tax Act"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="ACRA"
                    name="Compliant with Singapore Financial Reporting Standards (SFRS)"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    tag="ACRA"
                    name="Support for Annual General Meeting documents preparation"
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    name="Tax optimisation and planning"
                    tooltipContent="Cabin’s tax optimisation and planning service thoroughly combs through your financials to help maximise deductions. This includes planning your capital allowances, S14Q claims, and donation claims to fully utilise your tax allowance."
                    checks={[
                      true, true, true
                    ]}
                  />
                  <PricingTableTr
                    name="Bookkeeping"
                    checks={[
                      {
                        name: "S$150 per 50 transactions",
                        tooltipContent: "We determine this through the number of transactions on your bank statements. Every deposit or withdrawal counts as a single transaction."
                      },
                      true,
                      true
                    ]}
                  />
                  <PricingTableTr
                    name="Monthly management reports: Profit and Loss, Balance Sheet, and Cash Flow Statement"
                    checks={[
                      false, true, true
                    ]}
                  />
                  <PricingTableTr
                    name="Quarterly GST computation and F5 submission"
                    checks={[
                      false, true, true
                    ]}
                  />
                  <PricingTableTr
                    name="Monthly scorecard of key financial metrics"
                    checks={[
                      false, true, true
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
                  <Link to="/pricing/monthly" className="learn-more">Learn more <SvgIcon name="right-arrow" /></Link>
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

            <div className="pricing-options__grid pricing-options__grid--no-heading">
              <div className="pricing-options__col">
                <div className="pricing-options__section">
                  <PricingOption
                    name="GST Registration"
                    tooltipContent="For companies with revenue more than S$1M revenue in the last 12 month"
                    price="S$300"
                    withoutPlus={true}
                  />
                  <PricingOption
                    name="Complex accounting and tax requirements"
                    tooltipContent="For companies with group reporting, multiple business types, share options scheme, complex hire purchase scheme, or additional disclosures required"
                    price="Varies"
                    priceSuf=""
                    pricePer=""
                  />
                  <PricingOption
                    name="Form C filing required"
                    tooltipContent="For companies with annual turnover of S$5M or above, or have complex tax claims and deductions"
                    price="S$215"
                    withoutPlus={true}
                  />

                </div>
              </div>
              <div className="pricing-options__col">
                <div className="pricing-options__section">
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

export default connect(mapStateToProps, mapDispatchToProps)(PricingAccounting);
