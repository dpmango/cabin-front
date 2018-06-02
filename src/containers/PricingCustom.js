import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';

import PricingBuilderSection from '../components/PricingBuilderSection';
import PricingFloatNav from '../containers/PricingFloatNav';

class PricingCustom extends Component {
  constructor(props) {
    super(props);
    this.heroRef = React.createRef();

    this.state = {
      heroHeight: 0,
    }
  }

  componentDidMount(){
    this.setState({
      heroHeight: this.heroRef.current.offsetHeight + 90
    })
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Pricing Custom || CABIN</title>
        </Helmet>

        <div ref={this.heroRef} className="hero">
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

          boxes={[
            {
              name: "Monthly accounting and tax services",
              price: "S$200",
              pricePer: "per month",
              priceStartingFrom: true,
              helpText: "*Cabin’s tax optimisation and planning service thoroughly combs through your financials to help maximise deductions. This includes planning your capital allowances, S14Q claims, and donations claims to fully utilise your tax allowance.",
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
            },
            {
              name: "GST-registered companies",
              isAddon: true,
              price: "+S$125",
              pricePer: "per month",
              priceStartingFrom: false,
              boxList: [
                [
                  "Tracking of standard-rated supplies and purchases",
                  "Quarterly GST computation and F5 filing",
                  "Audit trail for all GST claims"
                ]
              ]
            }

          ]}
        />

        <PricingBuilderSection
          headerStep="Step 2"
          headerName="Corporate Secretary"
          headerDesc="Have Cabin take care of all your corporate secretarial compliance requirements"

          boxes={[
            {
              name: "Corporate secretary services",
              isAddon: true,
              price: "+S$30",
              pricePer: "per month",
              priceStartingFrom: false,
              boxList: [
                [
                  "Provision of qualified person as Company Secretary",
                  "Safekeeping and updates to Company Registers and Minute Books",
                  "Preparation of Annual General Meeting (AGM) documents",
                  "Filing of Annual Return to ACRA"
                ],
                [
                  "Advisory on Corporate Secretarial compliance matters",
                  "Reminder to inform you of your filing due dates",
                  "Unlimited non-shares related resolutions and secretarial matters"
                ]
              ]
            }
          ]}
        />

        <PricingBuilderSection
          headerStep="Step 3"
          headerName="Cabin as your Back Office"
          headerDesc="Let Cabin do the hard work so you don’t have to"

          boxes={[
            {
              name: "Accounts payable service",
              isAddon: true,
              price: "S$200",
              pricePer: "per month",
              priceStartingFrom: true,
              pricingOptions: [
                {
                  name: "<25 bank transactions",
                  price: "+S$200",
                  pricePer: "per month"
                },
                {
                  name: "25 - 75 bank transactions",
                  price: "+S$350",
                  pricePer: "per month"
                },
                {
                  name: "75 - 125 bank transactions",
                  price: "+S$450",
                  pricePer: "per month"
                }
              ],
              boxList: [
                [
                  "Dedicated email inbox for payments requests",
                  "Verification of invoices against payment requests",
                  "Preparation of payments via bank transfer"
                ],
                [
                  "Working capital optimisation",
                  "2 payments cycle a month"
                ]
              ]
            },
            {
              name: "Accounts receivable service",
              isAddon: true,
              price: "S$250",
              pricePer: "per month",
              priceStartingFrom: true,
              pricingOptions: [
                {
                  name: "<100 outstanding invoices",
                  price: "+S$250",
                  pricePer: "per month"
                },
                {
                  name: "100-200 outstanding invoices",
                  price: "+S$350",
                  pricePer: "per month"
                },
                {
                  name: "200-300 outstanding invoices",
                  price: "+S$450",
                  pricePer: "per month"
                }
              ],
              boxList: [
                [
                  "Weekly reconciliation of paid invoices",
                  "Receivables chasing and reminder",
                  "Frequency: 3x email, 2x phone call per overdue invoice"
                ],
              ]
            },
            {
              name: "Payroll service",
              isAddon: true,
              price: "S$250",
              pricePer: "per month",
              priceStartingFrom: true,
              // rangeSlider ?
              // pricingOptions: [
              //   {
              //     name: "<100 outstanding invoices",
              //     price: "+S$250",
              //     pricePer: "per month"
              //   }
              // ],
              boxList: [
                [
                  "Monthly payroll computation",
                  "Bank GIRO file creation + CPF submission"
                ],
                [
                  "Electronic leave management system",
                  "Annual IRA8 or AIS submission. IR21 submission when required"
                ]
              ]
            },
            {
              name: "Cabin assistant ",
              isAddon: true,
              price: "S$150",
              pricePer: "per month",
              priceStartingFrom: true,
              pricingOptions: [
                {
                  name: "<50 documents per month",
                  price: "+S$150",
                  pricePer: "per month"
                },
                {
                  name: "50-150 documents per month",
                  price: "+S$250",
                  pricePer: "per month"
                },
                {
                  name: "150-300 outstanding invoices",
                  price: "+S$350",
                  pricePer: "per month"
                }
              ],
              boxList: [
                [
                  "Consolidate all your documents into a box placed at your office Once a month, a dedicated bookkeeper will visit your office	",
                  "All documents scanning and filing will be all taken care of"
                ],
              ]
            },
            {
              name: "Cost center profitability tracking",
              isAddon: true,
              price: "+S$75",
              pricePer: "per month",
              priceStartingFrom: false,
              boxList: [
                [
                  "Outlet or product line sales and cost tracking",
                ]
              ]
            },
            {
              name: "Projections and budget tracking",
              isAddon: true,
              price: "+S$125",
              pricePer: "per month",
              priceStartingFrom: false,
              boxList: [
                [
                  "Projections and budgeting based on proposed business model (fees charged separately)",
                  "Monthly updates to compare actuals vs. budget/projections"
                ]
              ]
            }
          ]}

        />

        <PricingFloatNav heroHeight={this.state.heroHeight} />

      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  pricingOptions: state.pricing.pricingOptions,
});

const mapDispatchToProps = (dispatch) => (
  {}
);

export default connect(mapStateToProps, mapDispatchToProps)(PricingCustom);
