// src/components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/main">
            Job Tracker
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/main">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-applications">
              My Applications
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
