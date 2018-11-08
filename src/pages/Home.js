import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS, SET_FOOTER_CLASS} from 'store/ActionTypes';

import GetStartedBottom from 'components/GetStartedBottom';
import HomeHero from 'components/HomeHero';
import HomeLogos from 'components/HomeLogos';
// import HomePromo from 'components/HomePromo';
import HomeBenefits from 'components/HomeBenefits';
import HomeFeatures from 'components/HomeFeatures';

class Home extends Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
  };

  componentDidMount(){
    this.props.aosInst.refreshHard()
    this.props.setHeaderClass('');
    this.props.setFooterClass('');
  }

  render() {
    return (
      <div className="home">
        <HomeHero />
        <HomeLogos />
        {/* <HomePromo /> */}
        <HomeBenefits aosInst={this.props.aosInst}/>
        <HomeFeatures />

        <GetStartedBottom />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data }),
    setFooterClass: (data) => dispatch({ type: SET_FOOTER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
