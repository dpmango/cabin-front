import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';
import api from '../services/Api';

import GetStartedBottom from '../components/GetStartedBottom';
import HomeHero from '../components/HomeHero';
import HomeLogos from '../components/HomeLogos';
import HomePromo from '../components/HomePromo';
import HomeBenefits from '../components/HomeBenefits';
import HomeFeatures from '../components/HomeFeatures';

class Home extends Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  componentDidMount(){
    this.props.setHeaderClass('');
  }

  render() {
    return (
      <div className="home">
        <Helmet>
          <title>Homepage || CABIN</title>
        </Helmet>

        <HomeHero />
        <HomeLogos />
        <HomePromo />
        <HomeBenefits />
        <HomeFeatures />

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
