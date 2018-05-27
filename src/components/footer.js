import React, { Component } from 'react';
import SvgIcon from '../components/SvgIcon';

export default class Footer extends Component {
  render(){
    return(
      <footer className="footer">
        <div className="container container--narrow">
          <div className="footer__wrapper">
            <div className="footer__logo">
              <SvgIcon name="logo-small" />
            </div>
            <div className="footer__info">
              <span>Cabin Pte. Ltd.</span>
              <span>UEN: 201714875M</span>
              <span>Filing Agent Number: FA20170616</span>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
