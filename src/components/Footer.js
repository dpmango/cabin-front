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
              <span>Cabin Pte. Ltd.</span>
            </div>
            <div className="footer__info">
              <div className="footer__col">
                <span>Filing Agent Number: FA20170616</span>
                <span>UEN: 201714875M</span>
                <span>Email: <a href="mailto:hello@cabin.com.sg">hello@cabin.com.sg</a></span>
              </div>
              <div className="footer__col">
                <span>115A Commonwealth Drive</span>
                <span>#05-17 Tanglin Halt Industrial Estate</span>
                <span>Singapore 149596</span>
              </div>

            </div>
          </div>
        </div>
      </footer>
    )
  }
}
