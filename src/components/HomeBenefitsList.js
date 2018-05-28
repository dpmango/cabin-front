import React, { Component } from 'react';

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
          return (
            <li key={i} className={i+1 > activeIndex ? 'is-disabled' : ''}>
              <i className="icon" />
              <span>{el}</span>
            </li>
          )
        })}
      </ul>
    )
  }
}
