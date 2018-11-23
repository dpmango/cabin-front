import React, { Component } from "react";

export default class Loader extends Component {
  // constructor(){
  //   super();
  //
  //   this.state = {
  //     shouldShow: false // to prevent showing loader on intial load
  //   }
  // }
  //
  // componentDidMount() {
  //   console.log('loader component mount', window.history)
  //   this.setState({
  //     shouldShow: true
  //   })
  // }
  //
  // componentDidUpdate(){
  //   console.log('loader component',  this.state, window.history)
  // }

  componentWillUnmount(){
    // set a short delay for illustration animation render
    if ( window.location.pathname === "/" ){
      setTimeout(this.bodyLoaded, 300)
    } else {
      this.bodyLoaded()
    }
  }

  bodyLoaded = () => {
    const initialLoaderDom = document.getElementById("initial-loader")
    if ( initialLoaderDom !== null ){
      initialLoaderDom.parentNode.removeChild(initialLoaderDom);
      document.getElementById("root").classList.add("app-loaded")
    }
  }

  descriptionBlock = () => {
    const { timedOut, error, pastDelay, retry } = this.props;

    if (error) {
      // When the loader has errored
      return (
        <div className="loader__desc">
          Something wrong. <br/> Would you like to <a onClick={ retry }>Retry</a>?
        </div>
      );
    } else if (timedOut) {
      // When the loader has taken longer than the timeout
      return (
        <div className="loader__desc">
          Loading is slower than normal... <br/> Would you like to <a onClick={ retry }>Retry</a>?
        </div>
      )
    } else if (pastDelay) {
      // When the loader has taken longer than the delay
      return null;
      // return (
      //   <div className="loader__desc">Loading...</div>
      // );
    } else {
      // When the loader has just started
      return null;
    }

  }

  render(){
    const { timedOut, error, pastDelay } = this.props;
    // !this.state.shoudldShow ||
    if ( ( !error && !timedOut && !pastDelay) ){
      return null
    } else {
      return(
        <div className="loader">
          <div className='preloader-dots'>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
          </div>
          { this.descriptionBlock() }
        </div>
      )
    }

  }
}
