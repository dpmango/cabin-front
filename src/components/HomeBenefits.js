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
        initialSlide: 3,
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
            <div className="home-benefits__slide-name">Scaling up</div>
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
        <Tabs className="tabs-pane" defaultIndex={3} onSelect={this.refreshAOS}>
          <TabList className="tabs-pane__list">
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Incorporation</Tab>
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">First 6 months</Tab>
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Financial year end</Tab>
            <Tab className="tabs-pane__tab" selectedClassName="is-selected">Scaling up</Tab>
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
      <div className="home-benefits__content" data-aos="fade" data-aos-delay="250" data-aos-offset="-2000">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Incorporate your company within 24 hours
          </h3>
          <p className="t-paragraph for-mobile">Do so remotely and fully guided by one of our thoughtful staff</p>
          <HomeBenefitsList activeIndex="1" />
        </div>
        <div className="home-benefits__content-right">
          <h3>
            Incorporate your company within 24 hours
          </h3>
          <p className="t-paragraph">Do so remotely and fully guided by one of our thoughtful staff</p>
          <Testimonial
            content="Setting up a business in Singapore was simple with Cabin! They <strong>answered all my additional questions,</strong> while keeping things <strong>simple, speedy, easy and fuss free</strong> while ensuring personalised service."
            authorName="Meera Jane"
            authorTitle="Founder, Asia Photo Collective"
            authorImage="avatar-1"
          />
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
      <div className="home-benefits__content" data-aos="fade" data-aos-delay="250" data-aos-offset="-2000">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Appoint a corporate secretary
          </h3>
          <p className="t-paragraph for-mobile">All companies are required to appoint a company secretary within 6 months of incorporation</p>
          <HomeBenefitsList activeIndex="1" />
        </div>
        <div className="home-benefits__content-right">
          <h3>
            Appoint a corporate secretary
          </h3>
          <p className="t-paragraph">All companies are required to appoint a company secretary within 6 months of incorporation</p>
          <Testimonial
            content="Cabin makes everything <strong>super streamlined</strong>, is <strong>priced fairly</strong> and is probably the <strong>most modern corporate services provider</strong> ever. A breath of fresh air in an industry as old as the Company Act and where most other providers don't feel like they belong in the 21st century. Cabin's service has got us totally covered so we can focus our efforts on growth instead."
            authorName="CJ Leow"
            authorTitle="Co-Founder, pslove"
            authorImage="avatar-2"
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
      <div className="home-benefits__content" data-aos="fade" data-aos-delay="250" data-aos-offset="-2000">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Stay on top of your annual filings
          </h3>
          <p className="t-paragraph for-mobile">Have all your accounting and tax compliance covered</p>
          <HomeBenefitsList activeIndex="4" />
        </div>
        <div className="home-benefits__content-right">
          <h3>
            Stay on top of your annual filings
          </h3>
          <p className="t-paragraph">Have all your accounting and tax compliance covered</p>
          <Testimonial
            content="Our entire business group relies on Cabin to do our financial reporting and taxes. We have multiple financial year ends and varied businesses. Now, we <strong>never have to worry about missing deadlines or errors in filings.</strong> Cabin has been right on track and even provided <strong>useful insights</strong> which never saw previously."
            authorName="Lucy Chng"
            authorTitle="Director, Elements Wellness Group"
            authorImage="avatar-3"
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
      <div className="home-benefits__content" data-aos="fade" data-aos-delay="250" data-aos-offset="-2000">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Monthly pulse check on your business
          </h3>
          <p className="t-paragraph for-mobile">Turn messy documents into useful monthly reports</p>
          <HomeBenefitsList activeIndex="5" />
        </div>
        <div className="home-benefits__content-right">
          <h3>
            Monthly pulse check on your business
          </h3>
          <p className="t-paragraph">Turn messy documents into useful monthly reports</p>
          <Testimonial
            content="Cabin has been a great help to all our accounting needs. They <strong>respond fast</strong>, truly care for our needs, and put <strong>meaning behind the numbers.</strong> If you are looking for a team that can not only <strong>take the headache out of your accounts,</strong> but also give guidance on what the numbers mean, work with Cabin."
            authorName="Shane Yuen"
            authorTitle="Managing Director, Canny Digital"
            authorImage="avatar-4"
          />
          <div className="home-benefits__content-cta">
            <Link to="/pricing" className="btn btn--mega btn--block">Check out Cabin’s <span>Monthly Reporting</span> Plan</Link>
          </div>
        </div>
      </div>
    )
  }
}

class TabContent5 extends React.Component {
  render(){
    return(
      <div className="home-benefits__content" data-aos="fade" data-aos-delay="250" data-aos-offset="-2000">
        <div className="home-benefits__content-left">
          <h3 className="for-mobile">
            Have all your finance operations covered
          </h3>
          <p className="t-paragraph for-mobile">Full-fledged and professional finance team, customised to your needs</p>
          <HomeBenefitsList activeIndex={10} />
        </div>
        <div className="home-benefits__content-right">
          <h3>
            Have all your finance operations covered
          </h3>
          <p className="t-paragraph">Full-fledged and professional finance team, customised to your needs</p>
          <Testimonial
            content="Cabin has been a great finance partner for us. Their <strong>strong understanding of the fundamentals</strong> allowed them to <strong>easily adapt to tax and accounting complexities</strong> of a unique business like ours. They always encourage deep discussions about our business to find process improvement opportunities whenever possible. The <strong>collaboration with our internal Jakarta-based finance team has been seamless</strong> and we consider them as our smart and reliable finance partner for Singapore."
            authorName="Chris Halim"
            authorTitle="Co-Founder and CEO, Style Theory"
            authorImage="avatar-5"
          />
          <div className="home-benefits__content-cta">
            <Link to="/pricing/custom" className="btn btn--mega btn--block">Check out Cabin’s <span>Customised Finance Team</span> Plan</Link>
          </div>
        </div>
      </div>
    )
  }
}
