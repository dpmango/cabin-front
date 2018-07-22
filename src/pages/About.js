import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

import GetStartedBottom from '../components/GetStartedBottom';
import Professionals from '../components/Professionals';

class About extends Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
  };

  componentDidMount(){
    this.props.aosInst.refreshHard();
    this.props.setHeaderClass('');
  }

  render() {
    return (
      <div className="text-page">
        <div className="hero">
          <div className="hero__bg">
            <img src={require('../images/aboutHeroImg.png')} srcSet={require('../images/aboutHeroImg@2x.png')  + ' 2x'} alt=""/>
          </div>
          <div className="container container--narrow">
            <div className="hero__wrapper">
              <span className="t-small">About us</span>
              <h2>Modern online accounting firm</h2>
              <p className="t-paragraph">Powered by thoughtful humans and technology</p>
            </div>
          </div>
        </div>

        <div className="title-section">
          <div className="container">
            <div className="title-section__wrapper">
              <h2>Our mission</h2>
              <p className="t-paragraph">We use <strong>technology and thoughtful processes</strong> to make back-office operations <strong>simple, efficient, and fuss-free</strong> for businesses. We give <strong>clarity and meaning to the numbers</strong> to help business owners make <strong>better decisions.</strong> </p>
            </div>
          </div>
        </div>

        <div className="people">
          <div className="people__wrapper">
            <div className="people__left">
              <div className="people__image">
                <div className="people__hover-tooltip people__hover-tooltip--isaac">
                  <div className="people__hover-wrapper">
                    Hi, I’m <span>Isaac</span>
                  </div>
                </div>
                <div className="people__hover-tooltip people__hover-tooltip--rifeng">
                  <div className="people__hover-wrapper">
                    Hi, I’m <span>Rifeng</span>
                  </div>
                </div>
                <img src={require('../images/aboutPeople.png')} srcSet={require('../images/aboutPeople@2x.png')  + ' 2x'} alt=""/>
              </div>
            </div>
            <div className="people__right">
              <div className="people__content">
                <span className="t-small">Founders</span>
                <h2 data-aos-delay="150">Cabin is founded by an experienced team that understands your business</h2>
                <div className="people__list">
                  <div className="people__person" data-aos-delay="250">
                    <div className="people__person-title"><span>Rifeng Gao,</span> Co-Founder</div>
                    <div className="people__person-description">
                      CFO and Co-Founder, Grain<br/>
                      Associate Consultant, Bain & Company <br/>
                      BSc (Hons), London School of Economics <br/>
                      Forbes 30 under 30
                    </div>
                  </div>
                  <div className="people__person" data-aos-delay="350">
                    <div className="people__person-title"><span>Isaac Loh,</span> Co-Founder</div>
                    <div className="people__person-description">
                      Senior Business Analyst, Vance Group<br/>
                      MSc. Cambridge University, Fitzwilliam College <br/>
                      Honorary Cambridge Commonwealth Trust Scholar
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Professionals />

        <GetStartedBottom />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(About);
