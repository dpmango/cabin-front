import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
import { SIGN_OUT, SET_HEADER_CLASS } from '../store/ActionTypes';

import SignupStep1 from '../components/SignupStep1'
import SignupStep2 from '../components/SignupStep2'
import SignupStep3 from '../components/SignupStep3'
import SignupStep4 from '../components/SignupStep4'
import SignupStep5 from '../components/SignupStep5'

class Profile extends React.Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    username: PropTypes.string,
    signupStep: PropTypes.number
  };

  componentDidMount(){
    this.props.setHeaderClass('header--logo-only');
  }

  signOut = () => {
    this.props.signOut();
  };

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

        {/* <div className='profile-info'>
          <div className='group'>
            <label>Username:</label>
            <span>{this.props.username}</span>
          </div>
          <button onClick={this.signOut}>Sign out</button>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    username: state.auth.username,
    signupStep: state.signup.signupStep
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    signOut: () => dispatch({ type: SIGN_OUT }),
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
