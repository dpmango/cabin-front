import React, { Component } from 'react';
import { connect } from 'react-redux';

import FaqPanel from '../components/FaqPanel';
import PricingBuilderSection from '../containers/PricingBuilderSection';
import PricingFloatNav from '../containers/PricingFloatNav';

class PricingMonthly extends Component {
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
              <h2>Monthly Reporting</h2>
              <p className="t-paragraph">Standard plan to provide monthly management reports for decision making</p>
              <div className="hero__info">This is a pricing calculator to help you understand our pricing structure. Don’t worry about getting it right, our sales team will spend time understanding your business needs and propose a plan that is right for you. </div>
            </div>
          </div>
        </div>

        <PricingBuilderSection
          sectionIndex={1}
          headerStep=""
          headerName=""
          headerDesc="Pick a plan base on the scale of your business"
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


        <PricingFloatNav planName="Monthly Reporting" heroHeight={this.state.heroHeight} />

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

export default connect(mapStateToProps, mapDispatchToProps)(PricingMonthly);
