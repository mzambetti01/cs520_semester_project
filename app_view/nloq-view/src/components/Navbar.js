import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../imgs/nloq-logo-main.png';

const Navbar = () => (
  <nav>
    <Link to="/">
      <img src={logo} alt="Logo" className="logo" />
    </Link>
    <ul>
      <li>
        <Link to="/nba">Home</Link>
      </li>
      <li className="dropdown">
        <div>Resources</div>
        <div className="dropdown-content">
          <Link to="/resources1">How to read our data</Link>
          <Link to="/resources2">What is sport betting</Link>
          <Link to="/resources3">Additional resources</Link>
        </div>
      </li>
    </ul>
  </nav>
);

export default Navbar;
