import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../services/Api'

// import sprite from '../images/sprite.svg';

export default class Pricing extends Component {
  constructor() {
    super();
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="home">
        <h1> Pricing </h1>
      </div>
    );
  }
}
