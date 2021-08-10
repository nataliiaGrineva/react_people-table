import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => (
  <nav className="header_nav_container">
    <NavLink
      to="/"
      exact
      className="header_nav_link"
      activeClassName="header_nav_link__active"
    >
      Home page
    </NavLink>
    <NavLink
      to="/people"
      className="header_nav_link"
      activeClassName="header_nav_link__active"
    >
      Peope page
    </NavLink>
  </nav>
);

export default Header;
