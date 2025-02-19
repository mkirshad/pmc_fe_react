import React, { useState } from 'react';
import 'ol/ol.css';
import { Link } from 'react-router-dom';
import { Divider} from '@mui/material';

const HeaderTemplate = ({ headerText = <></>, children }) => { 
  // Render
  return (
    <div className="banner-container2 grid">
      <header className="banner-header">
        <Link
          to="/pub"
          className="transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="logo-section">
            <img
              src="/img/logo/epa_logo-removebg-preview.png"
              alt="GOP Logo"
              className="header-logo"
            />
            <img
              src="/img/logo/epccd.png"
              alt="EPCCD Logo"
              className="header-logo"
            />
            <img src="/img/logo/gop.png" alt="GOP Logo" className="header-logo" />
            <span className="header-text">PMIS</span>
          </div>
        </Link>
        {headerText}
        <nav className="banner-nav">
          <Link
            to="/sign-in"
            className="nav-link transition-all duration-300 ease-in-out transform hover:scale-105"
            style={{ paddingLeft: 300 }}
          >
            Login
          </Link>
        </nav>
      </header>

         {/* Main Content */}
        {React.Children.map(children, child => {
            // Ensure the child is a valid React element before cloning
            if (React.isValidElement(child)) {
            return React.cloneElement(child);
            }
            return child;
        })}
        
      <Divider textAlign="left" />

      <footer className="footer-container">
        <span className="footer-text">
          Copyright &copy; {new Date().getFullYear()}
          {" "}
          <span className="font-semibold">PMIS</span> All rights reserved.
          <br />
          Plastic Management Cell, Strategic Planning &amp; Implementation Unit,
          Environmental Protection Agency, and Environment Protection &amp;
          Climate Change Department, Government of the Punjab.
        </span>
      </footer>
    </div>
  );
};


export default HeaderTemplate;
