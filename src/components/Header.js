import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { OPEN_MENU, CLOSE_MENU } from '../store/ActionTypes';

class Header extends React.Component {
  static propTypes = {
    routes: PropTypes.array,
    menuOpened: PropTypes.bool,
    stateClass: PropTypes.string,
    openMenu: PropTypes.func,
    closeMenu: PropTypes.func
  };

  toggleHamburger = () => {
    this.props.menuOpened ? this.props.closeMenu() : this.props.openMenu()
  }

  render(){

    const { routes, menuOpened } = this.props;

    return(
      <React.Fragment>
        <header className={'header ' + this.props.stateClass}>
          <div className="container">
            <div className="header__wrapper">
              <NavLink to='/' className="header__logo">
                <i className="icon icon-cabin-logo" />
              </NavLink>
              <a href="tel:+65 3158 5495" className="header__phone">
                <span>Call us at <span className="header__phone-tel">+65 3158 5495</span></span>
              </a>
              <ul className="header__menu">
                {routes.map(route =>
                  <li key={route.path}>
                    <NavLink exact={route.isExact} className={route.navBarClass} activeClassName='is-active' to={route.path}>{route.name}</NavLink>
                  </li>
                )}
              </ul>
              <div className="header__hamburger">
                <div
                  className={"hamburger hamburger--squeeze " + (menuOpened ? "is-active" : "" ) }
                  onClick={this.toggleHamburger}>
                  <div className="hamburger-box">
                    <div className="hamburger-inner">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className={"mobile-navi " + (menuOpened ? "is-active" : "" ) }>
          <div className="container">
            <div className="mobile-navi__wrapper">
              <ul className="mobile-navi__menu">
                {routes.map(route =>
                  <li key={route.path}>
                    <NavLink exact={route.isExact} className={route.navBarClass} activeClassName='is-active' to={route.path}>{route.name}</NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </React.Fragment>
    )
  }
};


const mapStateToProps = (state) => ({
  menuOpened: state.header.menuOpened,
  stateClass: state.header.stateClass
});

const mapDispatchToProps = (dispatch) => ({
  openMenu: () => dispatch({ type: OPEN_MENU }),
  closeMenu: () => dispatch({ type: CLOSE_MENU })
});

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(Header);
