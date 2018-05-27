import React, { Component } from 'react';

export default class GetStartedBottom extends Component {
  render(){
    return(
      <div className="bottom-cta">
        <div className="container">
          <div className="bottom-cta__wrapper">
            <h1>Get Started Today</h1>
            <p className="t-paragraph">Focus on running your business. Let us handle the rest.</p>
            <form className="signup-email bottom-cta__form">
              <input type="email" placeholder="Email address"/>
              <button type="submit" className="btn btn--huge">Get started</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
