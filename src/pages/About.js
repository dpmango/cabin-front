import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

import GetStartedBottom from '../containers/GetStartedBottom';
import Professionals from '../components/Professionals';

class About extends Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
  };

  componentDidMount(){
    this.props.setHeaderClass('');
  }

  render() {
    return (
      <div className="text-page">
        <Helmet>
          <title>About || CABIN</title>
        </Helmet>

        <div className="hero">
          <div className="hero__bg">
            <img src={require('../images/aboutHeroImg.png')} srcSet={require('../images/aboutHeroImg@2x.png')  + ' 2x'} alt=""/>
          </div>
          <div className="container container--narrow">
            <div className="hero__wrapper">
              <span className="t-small">About us</span>
              <h2>Powered by thoughtful humans</h2>
              <p className="t-paragraph">Founded by an experienced team that understands your business</p>
            </div>
          </div>
        </div>

        <div className="title-section">
          <div className="container">
            <div className="title-section__wrapper">
              <h2>Our Mission</h2>
              <p className="t-paragraph">We make office operations simple and fuss-free for small and medium businesses. We bring clarity to the numbers and help business owners make better decisions. </p>
            </div>
          </div>
        </div>

        <div className="people">
          <div className="people__wrapper">
            <div className="people__left">
              <div className="people__image">
                <img src={require('../images/aboutPeople.jpg')} srcSet={require('../images/aboutPeople@2x.jpg')  + ' 2x'} alt=""/>
              </div>
            </div>
            <div className="people__right">
              <div className="people__content">
                <span className="t-small">People</span>
                <h2>Cabin is founded by an experienced team that understands your business.</h2>
                <div className="people__person">
                  <div className="people__person-title"><span>Rifeng Gao,</span> Co-Founder</div>
                  <div className="people__person-description">
                    CFO and Co-Founder, Grain<br/>
                    Associate Consultant, Bain & Company <br/>
                    BSc (Hons), London School of Economics <br/>
                    Forbes 30 under 30
                  </div>
                </div>
                <div className="people__person">
                  <div className="people__person-title"><span>Isaac Loh,</span> Co-Founder</div>
                  <div className="people__person-description">
                    Senior Business Analyst, Vance Group<br/>
                    MSc. Cambridge University, Fitzwilliam<br/>
                    College Honorary Cambridge <br/>
                    Commonwealth Trust Scholar
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
