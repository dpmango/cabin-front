import React, { Component } from 'react';
import SvgIcon from 'components/SvgIcon';

export default class HomeBenefitsList extends Component {
  render(){
    const { activeIndex, activeIndexes } = this.props

    const listNames = [
      "Corporate secretary",
      "Annual financial statements",
      "Tax filings",
      "Bookkeeping",
      "Monthly reports",
      "Payroll & expense claims",
      "Accounts payable",
      "Accounts receivable",
      "Complex accounting requirements",
      "Finance team management"
    ]

    return (
      <ul className="home-benefits__list" data-aos data-aos-offset="-2000" data-active-index={activeIndex}>
        {listNames.map((el, i) => {
          return (
            <li key={i} className={activeIndexes ? activeIndexes.indexOf(i+1) !== -1 ? '' : 'is-disabled' : i+1 > activeIndex ? 'is-disabled' : ''}>
              <div className="home-benefits__list-icon">
                <SvgIcon name="check" />
              </div>
              <span>{el}</span>
            </li>
          )
        })}
      </ul>
    )
  }
}
