import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_HEADER_CLASS } from '../store/ActionTypes';

import SignupStep5 from '../components/SignupStep5'

class GetStartedCompleated extends React.Component {
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

  render() {
    return (
      <div className="signup">
        <SignupStep5 />
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

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedCompleated);
