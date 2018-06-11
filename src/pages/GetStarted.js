import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

import SignupStep1 from '../containers/SignupStep1'
import SignupStep2 from '../containers/SignupStep2'
import SignupStep3 from '../containers/SignupStep3'
import SignupStep4 from '../containers/SignupStep4'
import SignupStep5 from '../containers/SignupStep5'

class Profile extends React.Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
    signupStep: PropTypes.number
  };

  componentDidMount(){
    this.props.aosInst.refreshHard();
    this.props.setHeaderClass('header--logo-only');
  }

  componentDidUpdate(){
    this.props.aosInst.refreshHard();
  }

  renderStep = () => {
    const { signupStep } = this.props;

    switch (signupStep) {
      case 1:
        return <SignupStep1 />
      case 2:
        return <SignupStep2 />
      case 3:
        return <SignupStep3 />
      case 4:
        return <SignupStep4 />
      case 5:
        return <SignupStep5 />
      default:
        return <SignupStep1 />
    }

  }
  render() {
    return (
      <div className="signup">
        <Helmet>
          <title>Get Started || CABIN</title>
        </Helmet>

        {this.renderStep()}

      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    signupStep: state.signup.signupStep
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
