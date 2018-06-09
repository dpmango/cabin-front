import React, { Component } from "react";

import Loader from '../components/Loader';

export default function AsyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
        isLoading: false,
        timeoutError: false,
        serverError: false
      };

      // timer loading
      // this.timeLoading = 0
      // this.timerLoading = setInterval(() => {
      //   this.timeLoading += 10
      //
      //   if ( this.timeLoading > 300 ){
      //     this.setState({
      //       isLoading: true
      //     })
      //     clearInterval(this.timerLoading);
      //   }
      // }, 10)
      //
      // // timer timerout
      // this.timeTimeout = 0
      // this.timerTimeout = setInterval(() => {
      //   this.timeTimeout += 100
      //
      //   if ( this.timeTimeout > 10000 ){
      //     this.setState({
      //       timeoutError: true
      //     })
      //     clearInterval(this.timerTimeout);
      //   }
      // }, 100)

    }

    async componentDidMount() {
      try {
        const { default: component } = await importComponent();

        setTimeout( () => {
          this.setState({
            component: component,
            isLoading: false,
            timeoutError: false
          });
        }, 1000 )

        // clearInterval(this.timerLoading);
        // clearInterval(this.timerTimeout);

      } catch (error) {
        this.setState({
          serverError: error
        });
      }

    }

    render() {
      const C = this.state.component;
      // const { serverError, timeoutError, isLoading } = this.state;

      // if ( serverError ){
      //   return <Loader isError={serverError} />
      // }
      //
      // if ( timeoutError ){
      //   return <Loader isTimeout={true} />
      // }
      //
      // if ( isLoading ){
      //   return <Loader />
      // }

      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncComponent;
}
