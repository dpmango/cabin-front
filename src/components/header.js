import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  static propTypes = {
    routes: PropTypes.array,
    hamburgerActive: PropTypes.bool,
    menuOpened: PropTypes.bool,
    openMenu: PropTypes.func,
    stateClass: PropTypes.string
  };

  toggleHamburger = () => {
    this.props.hamburgerActive ? this.props.closeMenu() : this.props.openMenu()
  }

  render(){
    return(
      <header className={'header ' + this.props.stateClass}>
        <div className="container">
          <div className="header__wrapper">
            <NavLink to='/' className="header__logo">
              <i className="icon icon-cabin-logo" />
            </NavLink>
            <ul className="header__menu">
              {this.props.routes.map(route =>
                <li key={route.path}>
                  <NavLink exact={route.isExact} className={route.navBarClass} activeClassName='is-active' to={route.path}>{route.name}</NavLink>
                </li>
              )}
            </ul>
            {/* <div className="header__hamburger">
              {this.props.hamburgerActive ? "Opened" : "Closed" }
              <span onClick={this.toggleHamburger}>toggle</span>
            </div> */}
          </div>
        </div>
      </header>
    )
  }
};


const mapStateToProps = (state) => ({
  hamburgerActive: state.header.hamburgerActive,
  menuOpened: state.header.menuOpened,
  stateClass: state.header.stateClass
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(Header);
