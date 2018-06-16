import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import debounce from 'lodash/debounce';
import Swiper from 'react-id-swiper';

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
        <Tabs className="tabs-pane" defaultIndex={1} onSelect={this.refreshAOS}>
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
      <div className="home-benefits">
        <div className="container container--narrow">
          <span className="t-small" data-aos="fade-up">How businesses are using Cabin</span>
          <h2 data-aos="fade-up" data-aos-delay="150">Whichever stage of growth you are at, we have something for you.</h2>
          <div className="home-benefits__tabs" data-aos="fade-up" data-aos-delay="300">
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
          <h3 className="for-mobile" data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations
          </h3>
          <HomeBenefitsList activeIndex="1" />
        </div>
        <div className="home-benefits__content-right">
          <h3 data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations
          </h3>
          <Testimonial
            content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
            authorName="John Tan"
            authorTitle="CEO at Acme Pte. Ltd."
            authorImage="avatar-1"
          />
          <div className="home-benefits__content-cta" data-aos="fade-up" data-aos-delay="500">
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
          <h3 className="for-mobile" data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations <span>+</span> Cabin <br/> handles compliance
          </h3>
          <HomeBenefitsList activeIndex="3" />
        </div>
        <div className="home-benefits__content-right">
          <h3 data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations <br/>
            <span>+</span> Cabin handles compliance
          </h3>
          <Testimonial
            content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
            authorName="John Tan"
            authorTitle="CEO at Acme Pte. Ltd."
            authorImage="avatar-1"
          />
          <div className="home-benefits__content-cta" data-aos="fade-up" data-aos-delay="500">
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
          <h3 className="for-mobile" data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations <span>+</span> Cabin <br/> handles compliance
          </h3>
          <HomeBenefitsList activeIndex="5" />
        </div>
        <div className="home-benefits__content-right">
          <h3 data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations <br/>
            <span>+</span> Cabin handles compliance
          </h3>
          <Testimonial
            content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
            authorName="John Tan"
            authorTitle="CEO at Acme Pte. Ltd."
            authorImage="avatar-1"
          />
          <div className="home-benefits__content-cta" data-aos="fade-up" data-aos-delay="500">
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
          <h3 className="for-mobile" data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations <span>+</span> Cabin <br/> handles compliance
          </h3>
          <HomeBenefitsList activeIndex="7" />
        </div>
        <div className="home-benefits__content-right">
          <h3 data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations <br/>
            <span>+</span> Cabin handles compliance
          </h3>
          <Testimonial
            content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
            authorName="John Tan"
            authorTitle="CEO at Acme Pte. Ltd."
            authorImage="avatar-1"
          />
          <div className="home-benefits__content-cta" data-aos="fade-up" data-aos-delay="500">
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
          <h3 className="for-mobile" data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations <span>+</span> Cabin <br/> handles compliance
          </h3>
          <HomeBenefitsList activeIndex="8" />
        </div>
        <div className="home-benefits__content-right">
          <h3 data-aos="fade-up" data-aos-delay="250">
            Business owners handle back office operations <br/>
            <span>+</span> Cabin handles compliance
          </h3>
          <Testimonial
            content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
            authorName="John Tan"
            authorTitle="CEO at Acme Pte. Ltd."
            authorImage="avatar-1"
          />
          <div className="home-benefits__content-cta" data-aos="fade-up" data-aos-delay="500">
            <Link to="/pricing" className="btn btn--mega btn--block">Check out Cabin’s <span>Compliance</span> Plan</Link>
          </div>
        </div>
      </div>
    )
  }
}
