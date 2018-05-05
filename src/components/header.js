import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Header = (props) => (
  <header className='header'>
    <div className="container">
      <div className="header__wrapper">
        <div className="header_logo">
          logo
        </div>
        <ul className="header__menu">
          {props.routes.map(route =>
            <li>
              <NavLink exact={route.isExact} activeClassName='is-active' key={route.path} to={route.path}>{route.name}</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  </header>
);

export default Header;

Header.propTypes = {
  routes: PropTypes.array,
};
