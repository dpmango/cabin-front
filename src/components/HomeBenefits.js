import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SvgIcon from '../components/SvgIcon';
import debounce from 'lodash/debounce';
import Swiper from 'react-id-swiper';

import HomeBenefitsList from '../components/HomeBenefitsList';

export default class HomeBenefits extends Component {
  constructor(props){
    super(props);

    this.resizeWithDebounce = debounce(this.handleResize, 200);

    this.state = {
      isMobile: false
    }

  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.resizeWithDebounce, false);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWithDebounce, false);
  };

  handleResize = () => {
    let wWidth = window.innerWidth;

    if (wWidth < 768) {
      this.setState({ isMobile: true })
    } else {
      this.setState({ isMobile: false })
    }
  };

  renderContent = () => {
    if (this.state.isMobile) {
      const swiperParams = {
        containerClass: 'home-benefits__slider',
        direction: 'horizontal',
        loop: false,
        watchOverflow: false,
        slidesPerView: 1,
        normalizeSlideIndex: true,
        freeMode: false,
        slidesOffsetBefore: 0,
        autoHeight: true,
        navigation: {
          nextEl: '.home-benefits__slider-next',
          prevEl: '.home-benefits__slider-prev'
        },
      }
      return (
        <Swiper {...swiperParams}>
          <div className="home-benefits__slide">
            <div className="home-benefits__slide-name">Incorporation</div>
            <div className="tabs-pane__panel">
              <TabContent1 />
            </div>
          </div>
          <div className="home-benefits__slide">
            <div className="home-benefits__slide-name">Starting up</div>
            <div className="tabs-pane__panel">
              <TabContent2 />
            </div>
          </div>
          <div className="home-benefits__slide">
            <div className="home-benefits__slide-name">Early Stage</div>
            <div className="tabs-pane__panel">
              <TabContent3 />
            </div>
          </div>
          <div className="home-benefits__slide">
            <div className="home-benefits__slide-name">Scaling Up</div>
            <div className="tabs-pane__panel">
              <TabContent4 />
            </div>
          </div>
          <div className="home-benefits__slide">
            <div className="home-benefits__slide-name">Mature</div>
            <div className="tabs-pane__panel">
              <TabContent5 />
            </div>
          </div>
        </Swiper>
      )
    } else {
      return (
        <Tabs className="tabs-pane" defaultIndex={1}>
          <TabList className="tabs-pane__list">
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Incorporation</Tab>
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Starting up</Tab>
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Early Stage</Tab>
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Scaling Up</Tab>
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Mature</Tab>
          </TabList>

          <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
            <TabContent1 />
          </TabPanel>
          <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
            <TabContent2 />
          </TabPanel>
          <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
            <TabContent3 />
          </TabPanel>
          <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
            <TabContent4 />
          </TabPanel>
          <TabPanel className="tabs-pane__panel" selectedClassName="is-active">
            <TabContent5 />
          </TabPanel>
        </Tabs>
      )
    }
  }
  render(){
    return(
      <div className="home-benefits" data-aos="fade-up">
        <div className="container container--narrow">
          <span className="t-small">How businesses are using Cabin</span>
          <h2>Whichever stage of growth you are at, we have something for you.</h2>
          <div className="home-benefits__tabs">
            { this.renderContent() }
          </div>
        </div>
      </div>
    )
  }
}

class TabContent1 extends React.Component {
  render(){
    return(
      <div className="home-benefits__content">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Business owners handle back office operations
          </h3>
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
    )
  }
}

class TabContent2 extends React.Component {
  render(){
    return(
      <div className="home-benefits__content">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Business owners handle back office operations <span>+</span> Cabin <br/> handles compliance
          </h3>
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
    )
  }
}

class TabContent3 extends React.Component {
  render(){
    return(
      <div className="home-benefits__content">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Business owners handle back office operations <span>+</span> Cabin <br/> handles compliance
          </h3>
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
    )
  }
}

class TabContent4 extends React.Component {
  render(){
    return(
      <div className="home-benefits__content">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Business owners handle back office operations <span>+</span> Cabin <br/> handles compliance
          </h3>
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
    )
  }
}

class TabContent5 extends React.Component {
  render(){
    return(
      <div className="home-benefits__content">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Business owners handle back office operations <span>+</span> Cabin <br/> handles compliance
          </h3>
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
    )
  }
}
