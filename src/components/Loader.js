import React, { Component } from "react";

export default class Loader extends Component {

  refresh = () =>{
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
      <div className="loader">
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
