import React from 'react';
import { Link } from 'react-router-dom';
import './Components.css';
import logo from '../imgs/nloq-logo-main.png';

const Navbar = () => (
  <div className='navbar-container'>
  <nav>
    <Link to="/">
      <img src={logo} alt="Logo" className="logo" />
    </Link>
    <ul>
      <li>
        <Link to="/nba" className='nav-item'>NBA</Link>
      </li>
      <li>
        <Link to="/mlb" className='nav-item'>MLB</Link>
      </li>
      <li className="dropdown">
        <div className='nav-item'>Resources</div>
        <div className="dropdown-content">
          <Link to="/resources1">How to read our data</Link>
          <Link to="/resources2">What is sport betting</Link>
          <Link to="/resources3">Additional resources</Link>
        </div>
      </li>
    </ul>
  </nav>
  </div>
);

export default Navbar;
