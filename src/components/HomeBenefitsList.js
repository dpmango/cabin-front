import React, { Component } from 'react';
import SvgIcon from '../components/SvgIcon';

export default class HomeBenefitsList extends Component {
  render(){
    const { activeIndex } = this.props

    const listNames = [
      "Annual financial statements",
      "Corporate secretary",
      "Tax filings",
      "Book-keeping",
      "Monthly reports",
      "Payroll & expense claims",
      "Accounts payable",
      "Accounts receivable",
      "People operations (HR)"
    ]

    return (
      <ul className="home-benefits__list">
        {listNames.map((el, i) => {
          const aosDelay = i * 50
          return (
            <li key={i} className={i+1 > activeIndex ? 'is-disabled' : ''}>
              <div className="home-benefits__list-icon" data-aos="zoom-in" data-aos-delay={aosDelay}>
                <SvgIcon name="check" />
              </div>
              <span data-aos="fade-right" data-aos-delay={aosDelay}>{el}</span>
            </li>
          )
        })}
      </ul>
    )
  }
}
