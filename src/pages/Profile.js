import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';
import { SIGN_OUT, SET_HEADER_CLASS } from '../store/ActionTypes';

class Profile extends React.Component {
  static propTypes = {
    setHeaderClass: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    username: PropTypes.string
  };

  componentDidMount(){
    this.props.setHeaderClass('header--logo-only');
  }

  signOut = () => {
    this.props.signOut();
  };

  render() {
    return (
      <div className="signup">
        <Helmet>
          <title>Get Started || CABIN</title>
        </Helmet>
        <div className="container">
          <div className="signup__box">
            <div className="singup__intro">
              <div className="signup__wrapper">
                <div className="signup__left">
                  <div className="singup__avatar signup__avatar--big">
                    <img src={require('../images/rifeng-avatar.png')} srcSet={require('../images/rifeng-avatar@2x.png')  + ' 2x'} alt=""/>
                  </div>
                </div>
                <div className="signup__right">
                  <h2>Hello!</h2>
                  <p className="t-paragraph">My name is Rifeng and I am here to help you get started. If you are stuck or have any questions along the way, feel free to give me a call at +65 3158 5495.</p>
                  <i className="icon icon-rifeng-sign" />
                </div>
              </div>

              <div className="signup__cta">
                <a href="#" className="btn btn--huge btn--block">
                  <span>Let’s get Started</span>
                </a>
              </div>
            </div>

          </div>
        </div>
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
    username: state.auth.username
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    signOut: () => dispatch({ type: SIGN_OUT }),
    setHeaderClass: (data) => dispatch({ type: SET_HEADER_CLASS, payload: data })
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
