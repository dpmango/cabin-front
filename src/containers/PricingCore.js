import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_PRICING_PLAN } from '../store/ActionTypes';
import { Helmet } from 'react-helmet';

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
    this.scrollTo(this.tableRef.current.offsetTop, 1000)
  }

  scrollTo = (to, duration) =>  {
    const element = document.scrollingElement || document.documentElement
    const start = element.scrollTop
    const change = to - start
    const startDate = +new Date()
    const easeInOutQuad = function(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    }

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;

      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
        if(currentTime < duration) {
          requestAnimationFrame(animateScroll);
        }
        else {
          element.scrollTop = to;
        }
    };
    animateScroll();

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
          <title>Pricing Core || CABIN</title>
        </Helmet>

        <div className="pricing-scope">
          <div className="container">
            <div className="pricing-scope__grid">

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-corporate" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Corporate Secretary</div>
                    <div className="pricing-scope__description"><span>I need a corporate secretary only</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        "Corporate secretary (12 months)",
                        "Annual General Meeting",
                        "Annual Returns"
                      ]
                    ]}
                  />
                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-main">S$350</div>
                    <div className="pricing-scope__price-for">per year</div>
                  </div>
                </div>
                <div className="pricing-scope__cta">
                  <Link to="/get-started" onClick={this.onSelectPlanClick.bind(this, 'Corporate Secretary (S$350)')} className="btn btn--mega btn--block">Select <span>Corporate Secretary</span> Plan</Link>
                </div>
                <div className="pricing-scope__compare">
                  <a onClick={this.scrollToTable} className="learn-more">Compare Features <SvgIcon name="right-arrow" /></a>
                </div>
              </div>

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-compliance" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">All-In</div>
                    <div className="pricing-scope__description"><span>I just need the bare minimum to<br/> cover all my annual compliance</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        "Corporate secretary (12 months)",
                        "Annual General Meeting",
                        "Annual Returns",
                        "Unaudited Financials Statements",
                        "Tax computation and filings"
                      ]
                    ]}
                  />

                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-main">S$950</div>
                    <div className="pricing-scope__price-for">per year</div>
                  </div>
                </div>
                <div className="pricing-scope__cta">
                  <Link to="/get-started" onClick={this.onSelectPlanClick.bind(this, 'All-in (S$950)')} className="btn btn--mega btn--block">Select <span>All-in</span> Plan</Link>
                </div>
                <div className="pricing-scope__compare">
                  <a onClick={this.scrollToTable} className="learn-more">Compare Features <SvgIcon name="right-arrow" /></a>
                </div>
              </div>

              <div className="pricing-scope__col">
                <div className="pricing-scope__box pricing-scope__box--collumned">
                  <div className="pricing-scope__tag">Most Popular</div>
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-custom" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Custom</div>
                    <div className="pricing-scope__description"><span>I need more than just compliance - please take care of my back office chores</span></div>
                  </div>
                  <PricingScopeList
                    list={[
                      [
                        "Corporate secretary (12 months)",
                        "Annual General Meeting",
                        "Annual Returns",
                        "Unaudited Financials Statements",
                        "Tax computation and filings",
                        "Monthly management report",
                        "Back office services"
                      ]
                    ]}
                  />

                  <div className="pricing-scope__more">
                    <Link to="/pricing/custom" className="learn-more">Learn more <SvgIcon name="right-arrow" /></Link>
                  </div>

                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-starting">starting at</div>
                    <div className="pricing-scope__price-main">S$200</div>
                    <div className="pricing-scope__price-for">per year</div>
                  </div>
                </div>
                <div className="pricing-scope__cta">
                  <Link to="/pricing/custom" className="btn btn--mega btn--block">Select <span>Custom</span> Plan</Link>
                </div>
                <div className="pricing-scope__compare">
                  <a onClick={this.scrollToTable} className="learn-more">Compare Features <SvgIcon name="right-arrow" /></a>
                </div>

              </div>

            </div>
          </div>
        </div>

        <div className="pricing-table" ref={this.tableRef}>
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
                        <i className="icon icon-pricing-corporate" />
                        <div className="pricing-table__head-name">Corporate Secretary</div>
                      </div>
                    </div>
                    <div className="pricing-table__td">
                      <div className="pricing-table__head">
                        <i className="icon icon-pricing-compliance" />
                        <div className="pricing-table__head-name">All-In</div>
                      </div>
                    </div>
                    <div className="pricing-table__td">
                      <div className="pricing-table__head pricing-table__head--popular">
                        <i className="icon icon-pricing-custom" />
                        <div className="pricing-table__head-name">Custom</div>
                        <div className="pricing-table__head-tag">Most Popular</div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pricing-table__tbody">
                  <PricingTableTr
                    tag="ACRA"
                    name="Provision of qualified person as Company Secretary"
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
                    name="Compilation of Annual Financial Statements"
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
                    tooltipContent="tooltip content"
                    checks={[
                      false, true, true
                    ]}
                  />
                  <PricingTableTr
                    name="Bookkeeping"
                    tooltipContent="tooltip content"
                    checks={[
                      false, "S$250 per 100 transactions", true
                    ]}
                  />
                  <PricingTableTr
                    name="Monthly management reports"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Accounts payables: Issuing payments to suppliers"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Accounts receivables: Chasing overdue invoices"
                    checks={[
                      false, false, true
                    ]}
                  />
                  <PricingTableTr
                    name="Payroll and employee expense claims"
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

        <div className="pricing-options">
          <div className="container">
            <div className="pricing-options__heading">
              <h2>Additional requirements</h2>
              <p className="t-paragraph">Our packages include everything a typical company needs. However, there may be some additional requirements specific to your business. We’ve got them covered here.</p>
            </div>
            <div className="pricing-options__section-name">Corporate<br/> Secretary</div>
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


const mapStateToProps = (state) => ({
  // pricingOptions: state.pricing.pricingOptions,
});

const mapDispatchToProps = (dispatch) => ({
  setPricingPlan: (data) => dispatch({ type: SET_PRICING_PLAN, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingCore);
