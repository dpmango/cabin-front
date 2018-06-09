import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SET_LOADING } from '../store/ActionTypes';

class Loader extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    setLoading: PropTypes.func
  };

  refresh = () =>{
    this.props.setLoading(false)
    window.location.reload();
  }

  descriptionBlock = () => {
    const { isTimeout, isError } = this.props;

    if ( isTimeout ){
      return(
        <div className="loader__desc">
          Loading is slower than normal... <br/> Would you like to <a onClick={this.refresh}>refresh this page</a>?
        </div>
      )
    }

    if ( isError ){
      return (
        <div className="loader__desc">
          Something wrong. {isError} <br/> Would you like to <a onClick={this.refresh}>refresh this page</a>?
        </div>
      )
    }

    return (
      <div className="loader__desc">Loading...</div>
    )
  }


  render(){
    return(
      <div className={"loader " + ( this.props.isLoading ? "is-active" : "" ) }>
        <div className='preloader-squares'>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
          <div className='square'></div>
        </div>
        { this.descriptionBlock() }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (data) => dispatch({ type: SET_LOADING, payload: data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
