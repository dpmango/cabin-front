import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import debounce from 'lodash/debounce';
import Swiper from 'react-id-swiper';
import { Tooltip } from 'react-tippy';
import SvgIcon from '../components/SvgIcon';

import HomeBenefitsList from '../components/HomeBenefitsList';
import Testimonial from '../components/Testimonial';

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

    this.refreshAOS()
  };

  refreshAOS = (index, lastIndex, event) => {
    this.props.aosInst.refreshHard();
    setTimeout( () => {
      this.props.aosInst.refreshHard();
    }, 100)
  }

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
            <div className="home-benefits__slide-name">First 6 months</div>
            <div className="tabs-pane__panel">
              <TabContent2 />
            </div>
          </div>
          <div className="home-benefits__slide">
            <div className="home-benefits__slide-name">Financial year end</div>
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
        <Tabs className="tabs-pane" defaultIndex={1} onSelect={this.refreshAOS}>
          <TabList className="tabs-pane__list">
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Incorporation</Tab>
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">First 6 months</Tab>
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Financial year end</Tab>
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
      <div className="home-benefits">
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
            Incorporate your company in less than 24 hours
          </h3>
          <p className="t-paragraph for-mobile">Do so remotely and fully guided by one of our thoughtful staff</p>
          <HomeBenefitsList activeIndex="1" />
        </div>
        <div className="home-benefits__content-right" data-aos="fade" data-aos-delay="250">
          <h3>
            Incorporate your company in less than 24 hours
          </h3>
          <p className="t-paragraph">Do so remotely and fully guided by one of our thoughtful staff</p>
          {/* <Testimonial
            hidden={true}
            content="TBD"
            authorName="Meera Jane"
            authorTitle="Co-Founder, Asia Photo Collective"
            authorImage="avatar-1"
          /> */}
          <div className="home-benefits__content-cta">
            <Link to="/pricing/incorporation" className="btn btn--mega btn--block">Check out Cabin’s <span>Incorporation</span> Plan</Link>
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
            Appoint a corporate secretary to meet your ACRA requirement
            <Tooltip
              title="All companies are required to appoint a company secretary within 6 months of incorporation"
              position="top"
              distance="10"
              arrow="true">
              <SvgIcon name="question-circle" />
            </Tooltip>
          </h3>
          <p className="t-paragraph for-mobile">We will do a thorough sweep to make sure all the required statutory documents are in place</p>
          <HomeBenefitsList activeIndex="1" />
        </div>
        <div className="home-benefits__content-right" data-aos="fade" data-aos-delay="250">
          <h3>
            Appoint a corporate secretary to meet your ACRA requirement
            <Tooltip
              title="All companies are required to appoint a company secretary within 6 months of incorporation"
              position="top"
              distance="10"
              arrow="true">
              <SvgIcon name="question-circle" />
            </Tooltip>
          </h3>
          <p className="t-paragraph">We will do a thorough sweep to make sure all the required statutory documents are in place</p>
          <Testimonial
            content="Cabin makes everything <strong>super streamlined</strong>, is <strong>priced fairly</strong> and is probably the <strong>most modern corporate services provider</strong> ever. A breath of fresh air in an industry as old as the Company Act and where most other providers don't feel like they belong in the 21st century. Cabin's service has got us totally covered so we can focus our efforts on growth instead."
            authorName="CJ Leow"
            authorTitle="Co-Founder, pslove"
            authorImage="avatar-1"
          />
          <div className="home-benefits__content-cta">
            <Link to="/pricing" className="btn btn--mega btn--block">Check out Cabin’s <span>Corporate secretary</span> Plan</Link>
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
            Stay on top of your accounting and tax filings
          </h3>
          <p className="t-paragraph for-mobile">We will comb through all your transactions to optimise your tax savings and ensure that you comply with statutory standards
            <Tooltip
              title="Singapore Financial Reporting Standard"
              position="top"
              distance="10"
              arrow="true">
              <SvgIcon name="question-circle" />
            </Tooltip>
          </p>
          <HomeBenefitsList activeIndex="4" />
        </div>
        <div className="home-benefits__content-right" data-aos="fade" data-aos-delay="250">
          <h3>
            Stay on top of your accounting and tax filings
          </h3>
          <p className="t-paragraph">We will comb through all your transactions to optimise your tax savings and ensure that you comply with statutory standards
            <Tooltip
              title="Singapore Financial Reporting Standard"
              position="top"
              distance="10"
              arrow="true">
              <SvgIcon name="question-circle" />
            </Tooltip>
          </p>
          <Testimonial
            content="Our entire business group relies on Cabin to do our financial reporting and taxes. We have multiple financial year ends and varied businesses. Now, we <strong>never have to worry about missing deadlines or errors in filings.</strong> Cabin has been right on track and even provided <strong>useful insights</strong> which never saw previously."
            authorName="Lucy Chng"
            authorTitle="Director, Elements Wellness Group"
            authorImage="avatar-1"
          />
          <div className="home-benefits__content-cta">
            <Link to="/pricing" className="btn btn--mega btn--block">Check out Cabin’s <span>Annual Reporting</span> Plan</Link>
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
            Have all your finance operations covered
          </h3>
          <p className="t-paragraph for-mobile">Gain access to a full-fledged and professional finance team at a fraction of the costs of hiring in-house</p>
          <HomeBenefitsList activeIndex="8" />
        </div>
        <div className="home-benefits__content-right" data-aos="fade" data-aos-delay="250">
          <h3>
            Have all your finance operations covered
          </h3>
          <p className="t-paragraph">Gain access to a full-fledged and professional finance team at a fraction of the costs of hiring in-house</p>
          <Testimonial
            content="Outsourcing our finance operations (including accounts payable and expense claims) to Cabin <strong>freed us up from administrative work.</strong> We love how Cabin is proactive in <strong>extrapolating insights on our financial performance</strong> and suggesting ways to improve our workflow so we can run our business more efficiently!"
            authorName="Diana Teo"
            authorTitle="Director, Waa Cow"
            authorImage="avatar-1"
          />
          <div className="home-benefits__content-cta">
            <Link to="/pricing/custom" className="btn btn--mega btn--block">Check out Cabin’s <span>Customised Finance Team</span> Plan</Link>
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
            Pair your finance executive with Cabin
          </h3>
          <p className="t-paragraph for-mobile">When it is time to bring your finance operations in-house, we will pair with your finance executive to build the right finance processes</p>
          <HomeBenefitsList activeIndexes={[
            1,2,3,5,9,10
          ]} />
        </div>
        <div className="home-benefits__content-right" data-aos="fade" data-aos-delay="250">
          <h3>
            Pair your finance executive with Cabin
          </h3>
          <p className="t-paragraph">When it is time to bring your finance operations in-house, we will pair with your finance executive to build the right finance processes</p>
          {/* <Testimonial
            content="TBD"
            authorName="Chris Halim"
            authorTitle="Co-Founder, Style Theory"
            authorImage="avatar-1"
          /> */}
          <div className="home-benefits__content-cta">
            <Link to="/pricing/custom" className="btn btn--mega btn--block">Check out Cabin’s <span>Customised Finance Team</span> Plan</Link>
          </div>
        </div>
      </div>
    )
  }
}
