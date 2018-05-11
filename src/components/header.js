import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { openMenu, closeMenu } from '../actions/HeaderActions';

class Header extends React.Component {
  static propTypes = {
    routes: PropTypes.array,
    hamburgerActive: PropTypes.bool,
    menuOpened: PropTypes.bool,
    openMenu: PropTypes.func,
  };

  toggleHamburger = () => {
    this.props.hamburgerActive ? this.props.closeMenu() : this.props.openMenu()
  }

  render(){
    console.log(this.props);

    return(
      <header className='header'>
        <div className="container">
          <div className="header__wrapper">
            <div className="header_logo">
              logo
            </div>
            <ul className="header__menu">
              {this.props.routes.map(route =>
                <li>
                  <NavLink exact={route.isExact} activeClassName='is-active' key={route.path} to={route.path}>{route.name}</NavLink>
                </li>
              )}
            </ul>
            <div className="header__hamburger">
              {this.props.hamburgerActive ? "Opened" : "Closed" }
              <span onClick={this.toggleHamburger}>toggle</span>
            </div>
          </div>
        </div>
      </header>
    )
  }
};


const mapStateToProps = (state) => ({
  hamburgerActive: state.header.hamburgerActive,
  menuOpened: state.header.menuOpened
});

const mapDispatchToProps = (dispatch) => ({
  openMenu: () => dispatch(openMenu()),
  closeMenu: () => dispatch(closeMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
