import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

class Home extends Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
  };

  componentDidMount(){
    this.props.aosInst.refreshHard()
    this.props.setHeaderClass('');
  }

  render() {
    return (
      <div className="home">
        <Helmet>
          <title>404 - Page not found || CABIN</title>
        </Helmet>

        <div className="not-found">
          <div className="container container--narrow">
            <div className="not-found__wrapper">
              <div className="not-found__title">4<span>0</span>4</div>
              <div className="not-found__desc t-paragraph">Page does not exist</div>
              <div className="not-found__action"><Link to="/">Navigate to Homepage</Link> </div>
            </div>
          </div>
        </div>

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
