import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';
import api from '../services/Api';

class Blog extends Component {
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
        <h1> About </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
