import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';
import api from '../services/Api';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tooltip } from 'react-tippy';
import SvgIcon from '../components/SvgIcon';
import GetStartedBottom from '../components/GetStartedBottom';
import FaqPanel from '../components/FaqPanel';

class Pricing extends Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  componentDidMount(){
    this.props.setHeaderClass('');
  }

  render() {
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

    return (
      <div className="pricing">
        <Helmet>
          <title>Pricing || CABIN</title>
        </Helmet>

        <div className="hero">
          <div className="hero__bg">
            <img src={require('../images/pricingHeroImg.png')} srcSet={require('../images/pricingHeroImg@2x.png')  + ' 2x'} alt=""/>
          </div>
          <div className="container container--narrow">
            <div className="hero__wrapper">
              <span className="t-small">Pricing</span>
              <h2>Simple and transparent pricing</h2>
              <p className="t-paragraph">Pick a plan that is best suited to your needs and budget</p>
            </div>
          </div>
          <div className="hero__nav">
            <div className="container container--narrow">
              <div className="hero__nav-wrapper">
                <div className="hero__nav-el">
                  Core plans
                </div>
                <div className="hero__nav-el is-active">
                  Incorporation plans
                </div>
                <div className="hero__nav-el">
                  Dormant plans
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pricing-scope">
          <div className="container container--narrow">
            <div className="pricing-scope__holder">
              <div className="pricing-scope__box">
                <div className="pricing-scope__head">
                  <div className="pricing-scope__icon">
                    <i className="icon icon-pricing-corporate" />
                  </div>
                  <div className="pricing-scope__names">
                    <div className="pricing-scope__name">Incorporation</div>
                    <div className="pricing-scope__description">I want to incorporate a company</div>
                  </div>
                  <div className="pricing-scope__price">
                    <div className="pricing-scope__price-main">S$350</div>
                    <div className="pricing-scope__price-for">per year</div>
                    <div className="pricing-scope__tooltip">
                      <Tooltip
                        title="This plan is very good for startaps"
                        position="left"
                        distance="10"
                        arrow="true">
                          <SvgIcon name="question-circle" />
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <div className="pricing-scope__list">
                  <div className="pricing-scope__list-col">
                    <div className="pricing-scope__list-el">
                      <SvgIcon name="check" />
                      <span>Company name search and reservation</span>
                    </div>
                    <div className="pricing-scope__list-el">
                      <SvgIcon name="check" />
                      <span>Company structure and Constitution advisory</span>
                    </div>
                    <div className="pricing-scope__list-el">
                      <SvgIcon name="check" />
                      <span>Minutes and resolution of First Director’s Meeting</span>
                    </div>
                  </div>
                  <div className="pricing-scope__list-col">
                    <div className="pricing-scope__list-el">
                      <SvgIcon name="check" />
                      <span>Company name search and reservation</span>
                    </div>
                    <div className="pricing-scope__list-el">
                      <SvgIcon name="check" />
                      <span>Company structure and Constitution advisory</span>
                    </div>
                    <div className="pricing-scope__list-el">
                      <SvgIcon name="check" />
                      <span>Minutes and resolution of First Director’s Meeting</span>
                    </div>
                  </div>
                </div>

              </div>
              <div className="pricing-scope__cta">
                <a className="btn btn--mega btn--block">Select <span>Incorporation</span> Plan</a>
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


        <GetStartedBottom />

      </div>
    );
  }
}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
