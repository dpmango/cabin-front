import React, { Component } from 'react';
import { connect } from 'react-redux';

import FaqPanel from '../components/FaqPanel';
import PricingBuilderSection from '../containers/PricingBuilderSection';
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
    const faqContent = [
      {
        name: 'How do prices change as I grow?',
        content: 'We adjust our fees only when there is a structural change in the complexity and volume of the work required. To not penalise you for once-off fluctuation in the volume of transactions, we will only make adjustments to your pricing tier if the number of bank transactions exceeds or fall below the mid-point mark between pricing tiers for 3 consecutive months. ',
        isDefaultOpened: true
      },
      {
        name: 'What is your cancellation policy?',
        content: 'We will require at least one month’s notice in order to ensure a smooth transition. A refundable deposit equivalent to one month’s of fees is held to be used to offset any payments due. '
      },
    ]

    return (
      <React.Fragment>

        <div ref={this.heroRef} className="hero">
          <div className="hero__bg">
            <img src={require('../images/pricingHeroCustom.png')} srcSet={require('../images/pricingHeroCustom@2x.png')  + ' 2x'} alt=""/>
          </div>
          <div className="container container--narrow">
            <div className="hero__wrapper">
              <span className="t-small">Pricing</span>
              <h2>Customised Finance Team Plan</h2>
              <p className="t-paragraph">Comprehensive monthly plan with everything you need to handle your day-to-day finance operations in one affordable monthly subscription. </p>
              <div className="hero__info">This is a pricing calculator to help you understand our pricing structure. Don’t worry about getting it right, our sales team will spend time understanding your business needs and propose a plan that is right for you. </div>
            </div>
          </div>
        </div>

        <PricingBuilderSection
          sectionIndex={1}
          headerStep="Step 1"
          headerName="Accounting and Tax"
          headerDesc="Start with the core accounting and tax plan"
          boxes={[
            {
              id: 1,
              isRequired: true,
              name: "Monthly accounting and tax services",
              price: "S$200",
              pricePer: "per month",
              priceStartingFrom: true,
              helpText: {
                name: "Pick a plan base on the scale of your business",
                tooltip: "Our aim is to make pricing simple and transparent. In comparing different pricing models, we found that bank the number of bank transactions correlates closely with the complexity of work required. Every deposit or withdrawal on your bank statement counts as a single transaction. However, we may exercise our own discretion to not count repeated transactions of the same nature. "
              },
              // helpText: "*Cabin’s tax optimisation and planning service thoroughly combs through your financials to help maximise deductions. This includes planning your capital allowances, S14Q claims, and donations claims to fully utilise your tax allowance.",
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
                  name: "76 - 125 bank transactions",
                  price: "S$550",
                  pricePer: "per month"
                },
                {
                  name: "126 - 200 bank transactions",
                  price: "S$650",
                  pricePer: "per month"
                },
                {
                  name: "201 - 300 bank transactions",
                  price: "S$850",
                  pricePer: "per month"
                }
              ],
              boxList: [
                [
                  "Monthly management reports: Profit and Loss, Balance Sheet, and Cash Flow Statement",
                  "Monthly scorecard of key financial metrics",
                  "Bookkeeping",
                  "Bank reconciliation",
                ],
                [
                  "Software subscription",
                  {
                    name: "Unaudited Annual Financial Statements",
                    tooltip: "Prepared based on Singapore Financial Reporting Standards (SFRS)"
                  },
                  "Annual corporate tax computation and filing (ECI and Form C-S)",
                  {
                    name: "Tax optimisation and planning (?)",
                    tooltip: "Cabin’s tax optimisation and planning service thoroughly comb through your financials to help maximise deductions. This includes planning your capital allowances, S14Q claims, and donations claim to fully utilise your tax allowance."
                  }
                ]
              ]
            },
            {
              id: 2,
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

        {/* <PricingBuilderSection
          sectionIndex={2}
          headerStep="Step 2"
          headerName="Corporate Secretary"
          headerDesc="Have Cabin take care of all your corporate secretarial compliance requirements"

          boxes={[
            {
              id: 3,
              name: "Corporate secretary services",
              isAddon: true,
              price: "+S$30",
              pricePer: "per month",
              priceStartingFrom: false,
              boxList: [
                [
                  "Provision of a qualified person as your company secretary",
                  "Safekeeping and updates to Company Registers",
                  "Preparation of Annual General Meeting (AGM) documents",
                ],
                [
                  "Filing of Annual Return to ACRA",
                  "Advisory on Corporate Secretarial compliance matters"
                ]
              ]
            }
          ]}
        /> */}

        <PricingBuilderSection
          sectionIndex={3}
          headerStep="Step 2"
          headerName="Day-to-day finance operations"
          headerDesc="Let Cabin do the hard work so you don’t have to"

          boxes={[
            {
              id: 4,
              name: "Accounts payable",
              isPopular: true,
              isAddon: true,
              price: "S$200",
              pricePer: "per month",
              priceStartingFrom: true,
              pricingOptions: [
                {
                  name: "<10 payments",
                  price: "+S$200",
                  pricePer: "per month"
                },
                {
                  name: "10 - 25 payments",
                  price: "+S$300",
                  pricePer: "per month"
                },
                {
                  name: "26 - 50 payments",
                  price: "+S$475",
                  pricePer: "per month"
                },
                {
                  name: "51 - 75 payments",
                  price: "+S$625",
                  pricePer: "per month"
                },
                {
                  name: "76 - 100 payments",
                  price: "+S$750",
                  pricePer: "per month"
                }
              ],
              boxList: [
                [
                  "Dedicated email inbox for supplier payments requests",
                  "Verification of invoices against the statement of accounts",
                  "Preparation of payments via bank transfer ",
                ],
                [
                  {
                    name: "Working capital optimisation",
                    tooltip: "Payments are made just in time, based on the supplier’s credit terms"
                  },
                ]
              ]
            },
            {
              id: 5,
              name: "Accounts receivable",
              isAddon: true,
              price: "S$200",
              pricePer: "per month",
              priceStartingFrom: true,
              pricingOptions: [
                {
                  name: "<25 unpaid invoices",
                  price: "+S$200",
                  pricePer: "per month"
                },
                {
                  name: "25 - 50 unpaid invoices",
                  price: "+S$300",
                  pricePer: "per month"
                },
                {
                  name: "51 - 100 unpaid invoices",
                  price: "+S$450",
                  pricePer: "per month"
                },
                {
                  name: "101 - 200 unpaid invoices",
                  price: "+S$600",
                  pricePer: "per month"
                },
                {
                  name: "201 - 400 unpaid invoices",
                  price: "+S$750",
                  pricePer: "per month"
                }
              ],
              boxList: [
                [
                  "Weekly reconciliation of paid invoices",
                  "Weekly receivables chasing and reminder",
                  "5x automated email reminders + 2x phone call chaser per overdue invoice",
                  "Monthly aged receivables report"
                ],
              ]
            },
            {
              id: 6,
              name: "Payroll",
              isAddon: true,
              price: "S$250",
              pricePer: "per month",
              priceStartingFrom: true,
              rangeSlider: true,
              boxList: [
                [
                  "Monthly payroll computation",
                  "Bank GIRO file creation + CPF submission"
                ],
                [
                  "Electronic leave management system",
                  "Annual IRA8 or AIS submission. IR21 submission when required",
                  "Staff expense claims included if paired with Accounts Payable service"
                ]
              ]
            },
            {
              id: 7,
              name: "Cabin assistant",
              isAddon: true,
              price: "S$125",
              pricePer: "per month",
              priceStartingFrom: true,
              pricingOptions: [
                {
                  name: "<25 documents",
                  price: "+S$125",
                  pricePer: "per month"
                },
                {
                  name: "25-75 documents",
                  price: "+S$200",
                  pricePer: "per month"
                },
                {
                  name: "76 - 150 documents",
                  price: "+S$300",
                  pricePer: "per month"
                },
                {
                  name: "151 - 250 documents",
                  price: "+S$450",
                  pricePer: "per month"
                },
                {
                  name: "251 - 400 documents",
                  price: "+S$650",
                  pricePer: "per month"
                }
              ],
              boxList: [
                [
                  "Consolidate all finance source documents (bills and invoices) into a box ",
                  "Box will be collected by Cabin at the end of the month",
                  "Documents will be scanned, filed, and entered into our accounting system"
                ],
              ]
            }
          ]}

        />

        <PricingBuilderSection
          sectionIndex={4}
          headerStep="Step 3"
          headerName="Complex accounting requirements"
          headerDesc="If your business has complex requirements, we will tailor a plan for you"
          boxes={[
            {
              id: 8,
              name: "Profit center tracking",
              isAddon: true,
              isQuoteRequired: true,
              price: "Get a quote",
              pricePer: "",
              priceStartingFrom: false,
              boxList: [
                [
                  "Multiple outlets or product lines sales and cost tracking",
                ]
              ]
            },
            {
              id: 9,
              name: "Complex revenue recognition",
              isAddon: true,
              isQuoteRequired: true,
              price: "Get a quote",
              pricePer: "",
              priceStartingFrom: false,
              boxList: [
                [
                  "Detailed unearned revenue tracking or unconventional revenue recognition",
                ]
              ]
            },
            {
              id: 10,
              name: "Projections and budget tracking",
              isAddon: true,
              isQuoteRequired: true,
              price: "Get a quote",
              pricePer: "",
              priceStartingFrom: false,
              boxList: [
                [
                  "Projections and budgeting model building",
                  "Monthly updates to compare actuals vs. budget/projection"
                ]
              ]
            },
            {
              id: 11,
              name: "Finance team management",
              isAddon: true,
              isQuoteRequired: true,
              price: "Get a quote",
              pricePer: "",
              priceStartingFrom: false,
              boxList: [
                [
                  "Paired with your in-house finance executive(s)",
                  "Finance operations process building and management"
                ]
              ]
            },
          ]}

        />

        <PricingFloatNav planName="Customised Finance Team" heroHeight={this.state.heroHeight} />

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
