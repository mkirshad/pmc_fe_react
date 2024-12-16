import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  const bannedItems = [
    "Ear buds with plastic sticks",
    "Plastic sticks for balloons",
    "Plastic flags",
    "Candy sticks",
    "Ice-cream sticks",
    "Cigarette Packets",
    "Plates",
"Plastic or PVC banners less than 80 microns",
    "Wrapping or Packing Films around sweet boxes",
    "Disposal Food Boxes made from polystyrene (Styrofoam)",

    "Disposable Cups & Glasses made from polystyrene (Styrofoam)",

    "Cutlery such as Forks, Spoons, Knives, Straw, Trays, Stirrers, etc.",
    "Invitation Cards",   
  ];

  return (
    <motion.div
      className="banner-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="banner-header">
        <div className="logo-section">
          <img
            src="/img/logo/epa_logo-removebg-preview.png"
            alt="GOP Logo"
            className="header-logo"
          />
          <img src="/img/logo/epccd.png" alt="EPCCD Logo" className="header-logo" />
          <img src="/img/logo/gop.png" alt="GOP Logo" className="header-logo" />

          <span className="header-text">PLMIS</span>
        </div>
        <nav className="banner-nav">
          <Link to="/sign-in" className="nav-link">
            Staff Login
          </Link>
        </nav>
      </header>

      <div className="banner-content">
        <motion.div className="banner-text" variants={textVariants}>
          <h1>Plastic License Management Information System</h1>
        </motion.div>
        <div className="banner-links">
          <Link to="/sign-up?redirectUrl=/spuid-signup" className="nav-link">
            Apply New License
          </Link>
          <Link to="/sign-in" className="nav-link">
            My Applications
          </Link>
        </div>

        {/* Banned Items Section */}
        <div className="banned-items mb-4">
          <h5 className="mb-4">Banned Single-Use Plastic Products under the Punjab Environmental Protection (Production and Consumption of Single-Use Plastic Product) Regulations 2023

          </h5>
          <ul className="banned-items-list">
            {bannedItems.map((item, index) => (
              <li key={index} className="banned-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <span>In case of any violation found any where, please kindly report at <a style={{fontSize:20}} href="tel:1374"> <b>1373</b> </a></span>
      </div>

      <footer className="footer-container">
        <span className="footer-text">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">PLMIS</span> All rights reserved. <br />
          Plastic Management Cell, Strategic Planning & Implementation Unit,
          Environmental Protection Agency, and Environment Protection & Climate
          Change Department, Government of the Punjab.
        </span>
      </footer>
    </motion.div>
  );
};

export default Banner;
