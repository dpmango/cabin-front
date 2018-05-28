import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SvgIcon from '../components/SvgIcon';

import HomeBenefitsList from '../components/HomeBenefitsList';

export default class HomeBenefits extends Component {
  render(){
    return(
      <div className="home-benefits">
        <div className="container container--narrow">
          <span className="t-small">How businesses are using Cabin</span>
          <h2>Whichever stage of growth you are at, we have something for you.</h2>
          <div className="home-benefits__tabs">
            <Tabs className="tabs-pane" defaultIndex={1}>
              <TabList className="tabs-pane__list">
                <Tab className="tabs-pane__tab" selectedClassName="is-selected">Incorporation</Tab>
                <Tab className="tabs-pane__tab" selectedClassName="is-selected">Starting up</Tab>
                <Tab className="tabs-pane__tab" selectedClassName="is-selected">Early Stage</Tab>
                <Tab className="tabs-pane__tab" selectedClassName="is-selected">Scaling Up</Tab>
                <Tab className="tabs-pane__tab" selectedClassName="is-selected">Mature</Tab>
              </TabList>

              <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
                <div className="home-benefits__content">
                  <div className="home-benefits__content-left">
                    <HomeBenefitsList activeIndex="1" />
                  </div>
                  <div className="home-benefits__content-right">
                    <h3>
                      Business owners handle back office operations
                    </h3>
                    <div className="testimonial">
                      <div className="testimonial__wrapper">
                        <div className="testimonial__icon">
                          <SvgIcon name="quote" />
                        </div>
                        <div className="testimonial__content">
                          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu</p>
                          <div className="testimonial__author">
                            <div className="testimonial__author-avatar">
                              <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
                            </div>
                            <div className="testimonial__author-text"><span>John Tan,</span> CEO at Acme Pte. Ltd.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-benefits__content-cta">
                      <Link to="/pricing" className="btn btn--mega btn--block">Check out Cabin’s <span>Compliance</span> Plan</Link>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
                <div className="home-benefits__content">
                  <div className="home-benefits__content-left">
                    <HomeBenefitsList activeIndex="3" />
                  </div>
                  <div className="home-benefits__content-right">
                    <h3>
                      Business owners handle back office operations <br/>
                      <span>+</span> Cabin handles compliance
                    </h3>
                    <div className="testimonial">
                      <div className="testimonial__wrapper">
                        <div className="testimonial__icon">
                          <SvgIcon name="quote" />
                        </div>
                        <div className="testimonial__content">
                          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu</p>
                          <div className="testimonial__author">
                            <div className="testimonial__author-avatar">
                              <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
                            </div>
                            <div className="testimonial__author-text"><span>John Tan,</span> CEO at Acme Pte. Ltd.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-benefits__content-cta">
                      <Link to="/pricing" className="btn btn--mega btn--block">Check out Cabin’s <span>Compliance</span> Plan</Link>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
                <div className="home-benefits__content">
                  <div className="home-benefits__content-left">
                    <HomeBenefitsList activeIndex="5" />
                  </div>
                  <div className="home-benefits__content-right">
                    <h3>
                      Business owners handle back office operations <br/>
                      <span>+</span> Cabin handles compliance
                    </h3>
                    <div className="testimonial">
                      <div className="testimonial__wrapper">
                        <div className="testimonial__icon">
                          <SvgIcon name="quote" />
                        </div>
                        <div className="testimonial__content">
                          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu</p>
                          <div className="testimonial__author">
                            <div className="testimonial__author-avatar">
                              <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
                            </div>
                            <div className="testimonial__author-text"><span>John Tan,</span> CEO at Acme Pte. Ltd.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-benefits__content-cta">
                      <Link to="/pricing" className="btn btn--mega btn--block">Check out Cabin’s <span>Compliance</span> Plan</Link>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
                <div className="home-benefits__content">
                  <div className="home-benefits__content-left">
                    <HomeBenefitsList activeIndex="7" />
                  </div>
                  <div className="home-benefits__content-right">
                    <h3>
                      Business owners handle back office operations <br/>
                      <span>+</span> Cabin handles compliance
                    </h3>
                    <div className="testimonial">
                      <div className="testimonial__wrapper">
                        <div className="testimonial__icon">
                          <SvgIcon name="quote" />
                        </div>
                        <div className="testimonial__content">
                          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu</p>
                          <div className="testimonial__author">
                            <div className="testimonial__author-avatar">
                              <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
                            </div>
                            <div className="testimonial__author-text"><span>John Tan,</span> CEO at Acme Pte. Ltd.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-benefits__content-cta">
                      <Link to="/pricing" className="btn btn--mega btn--block">Check out Cabin’s <span>Compliance</span> Plan</Link>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
                <div className="home-benefits__content">
                  <div className="home-benefits__content-left">
                    <HomeBenefitsList activeIndex="8" />
                  </div>
                  <div className="home-benefits__content-right">
                    <h3>
                      Business owners handle back office operations <br/>
                      <span>+</span> Cabin handles compliance
                    </h3>
                    <div className="testimonial">
                      <div className="testimonial__wrapper">
                        <div className="testimonial__icon">
                          <SvgIcon name="quote" />
                        </div>
                        <div className="testimonial__content">
                          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu</p>
                          <div className="testimonial__author">
                            <div className="testimonial__author-avatar">
                              <img src={require('../images/avatar-1.png')} srcSet={require('../images/avatar-1@2x.png')  + ' 2x'} alt=""/>
                            </div>
                            <div className="testimonial__author-text"><span>John Tan,</span> CEO at Acme Pte. Ltd.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-benefits__content-cta">
                      <Link to="/pricing" className="btn btn--mega btn--block">Check out Cabin’s <span>Compliance</span> Plan</Link>
                    </div>
                  </div>
                </div>
              </TabPanel>

            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
