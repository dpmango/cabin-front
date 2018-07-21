import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SET_PRICING_PLAN } from '../store/ActionTypes';
import { Tooltip } from 'react-tippy';
import { GetStarted } from '../routes';
import 'airbnb-js-shims';
import Select from 'react-select';
import pluralize from 'pluralize';
import ScrollTo from '../services/ScrollTo';
import FaqPanel from '../components/FaqPanel';
import PricingOption from '../components/PricingOption';
import PricingScopeList from '../components/PricingScopeList';

import SvgIcon from '../components/SvgIcon';

class PricingSecretary extends Component {

  constructor(props){
    super(props);
    this.state = {
      selected_year: { value: '600', label: '2 years' },
      price_base: 350,
      price: 600,
      price_save: 100
    }
  }

  handleSelectChange = (e) => {
    console.log(e)
    this.setState({
      selected_year: e,
      price: e.value,
      price_save: this.calcSave(e)
    });
  }

  calcSave = (select) => {
    const year = parseInt(select.label.substring(0,1), 10);
    const basePrice = this.state.price_base;
    const calcSave = (year * basePrice) - parseInt(select.value, 10)

    return calcSave > 0 ? calcSave : null
  }

  getYearPlural = () => {
    const { selected_year } = this.state;
    const year = parseInt(selected_year.label.substring(0,1), 10)

    return year + " " + pluralize('year', year)

  }
  onSelectPlanClick = (pricingName) => {
    this.props.setPricingPlan(pricingName);
  }

  preloaderOnHover = (component) => {
    component.preload();
  };

  render(){

    const { selected_year, price, price_save } = this.state;

    const yearsSelect = [
      { value: '350', label: '1 year' },
      { value: '600', label: '2 years' },
      { value: '900', label: '3 years' }
    ]

    const faqContent = [
      {
        name: 'Do I need a corporate secretary? ',
        content: 'All companies are required to appoint a company secretary within 6 months of incorporation. It is important to appoint a professional secretary familiar with the Singapore Companies Act as the job covers a few specialised and mandatory duties. Being compliant will help avoid some of the fines and penalties commonly faced by companies.',
        isDefaultOpened: true
      },
      {
        name: 'Are government fees included?',
        content: 'Our fees exclude all Out-of-Pocket expenses paid to third parties, including ACRA filing fees and fines. For most businesses, you will expect an additional S$60 payable to ACRA annually for your Annual Return filing. '
      }
    ]

    const PricingScopePrice = (
      <React.Fragment>
        <div className="pricing-scope__price-main">S${price}</div>
        <div className="pricing-scope__price-for">{price_save ? "save S$" + price_save : ""}</div>
        <Select
          name="selected_year"
          className="Select--small"
          searchable={false}
          autosize={false}
          value={selected_year}
          onChange={this.handleSelectChange}
          placeholder="Select a plan"
          options={yearsSelect}
        />
      </React.Fragment>
    )

    return(
      <div data-aos="fade">
        <div className="pricing-scope" >
          <div className="container container--narrow">
            <div className="pricing-scope__holder">
              <div className="pricing-scope__box">
                <div className="pricing-scope__head">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-dormant" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Corporate Secretary</div>
                    <div className="pricing-scope__description">Stay on top of all your ACRA filings and deadlines</div>
                  </div>
                  <div className="pricing-scope__price">
                    { PricingScopePrice }
                  </div>
                </div>
                <PricingScopeList
                  list={[
                    [
                      "Provision of a qualified person as your company secretary ",
                      "Safekeeping and updates to Company Registers",
                      "Preparation of Annual General Meeting (AGM) documents"
                    ],
                    [
                      "Filing of Annual Return to ACRA",
                      "WhatsApp group chat for advisory on corporate secretarial matters"
                    ]
                  ]}
                />
                <div className="pricing-scope__price pricing-scope__price--mobile">
                  { PricingScopePrice }
                </div>
                <div className="pricing-scope__promo">Get an <span>additional S$100 off</span> per year when bundled together with any <span>Accounting and tax plan</span></div>
              </div>
              <div className="pricing-scope__cta">
                <Link to="/get-started"
                  onClick={this.onSelectPlanClick.bind(this, 'Corporate Secretary')}
                  onMouseOver={this.preloaderOnHover.bind(this, GetStarted)}
                  className="btn btn--mega btn--block">
                  Select <span>Corporate Secretary</span> Plan ({this.getYearPlural()} plan)
                </Link>
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

            <div className="pricing-options__grid pricing-options__grid--no-heading">
              <div className="pricing-options__col">
                {/* <div className="pricing-options__section-name">Corporate Secretary</div> */}
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
                </div>
              </div>
              <div className="pricing-options__col">
                {/* <div className="pricing-options__section-name">Accounting and Tax</div> */}
                <div className="pricing-options__section">
                  <PricingOption
                    name="More than 5 directors/shareholders"
                    tooltipContent="Additional administrative and recording keeping processes required"
                    price="S$25"
                    pricePer="per individual<br>per year"
                  />
                  <PricingOption
                    name="Provision of registered address"
                    tooltipContent="Mail forwarding service will be provided upon request (S$10 per package + courier fees)"
                    price="S$200"
                    pricePer="per year"
                  />
                  <PricingOption
                    name="Company closure"
                    tooltipContent="Striking off of company, assuming undisputed application. We will require the company to complete all outstanding AGM and AR filings, zero the balance sheet, and obtain tax clearance from IRAS before we can proceed with the striking off application."
                    price="S$600"
                    withoutPlus={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(PricingSecretary);
