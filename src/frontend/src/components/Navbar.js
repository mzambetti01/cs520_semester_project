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
        <Link to="/" className='nav-item'>Home</Link>
      </li>
      <li>
        <Link to="/nba" className='nav-item'>NBA</Link>
      </li>
      <li>
        <Link to="/nfl" className='nav-item'>NFL</Link>
      </li>
      <li>
        <Link to="/nhl" className='nav-item'>NHL</Link>
      </li>
      <li>
        <Link to="/resources" className='nav-item'>Resources</Link>
      </li>
    </ul>
  </nav>
  </div>
);

export default Navbar;
