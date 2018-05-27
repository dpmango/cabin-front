import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';
import api from '../services/Api';

import GetStartedBottom from '../components/GetStartedBottom';

class About extends Component {
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
      <div className="text-page">
        <div className="hero">
          <div className="container">
            <div className="hero__wrapper">
              <span className="t-small">About us</span>
              <h2>Powered by thoughtful humans</h2>
            </div>

          </div>
        </div>

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
