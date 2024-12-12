import React from "react";
import { motion } from "framer-motion";
import { FaRecycle, FaLeaf } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  const linkVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  const movingLinksVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [50, 0, 0, 50],
      transition: { duration: 4, repeat: Infinity },
    },
  };

  const iconAnimationVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1, 1, 0.8],
      transition: { duration: 4, repeat: Infinity },
    },
  };

  return (
    <motion.div
      className="banner-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="banner-header">
        <div className="logo-section">
          <img src="/img/logo/epa_logo-removebg-preview.png" alt="GOP Logo" className="header-logo" />
          <img src="/img/logo/epccd.png" alt="EPCCD Logo" className="header-logo" />
          <img src="/img/logo/gop.png" alt="GOP Logo" className="header-logo" />
          
          <span className="header-text">PLMIS</span>
        </div>
        <nav className="banner-nav">
          <Link to="/sign-in" className="nav-link">Staff Login</Link>
        </nav>
      </header>

      <div className="banner-content">
        <motion.div className="banner-icons" variants={iconAnimationVariants} initial="initial" animate="animate">
          {/* <FaRecycle className="banner-icon" /> */}
          {/* <FaLeaf className="banner-icon" /> */}
        </motion.div>
        <motion.div className="banner-text" variants={textVariants}>
          <h1>
           Plastic License Management Information System
          </h1>
        </motion.div>
        <div className="banner-links">
          <Link to="/sign-up?redirectUrl=/spuid-signup" className="nav-link">
            Apply New License
          </Link>
          <Link to="/sign-in" className="nav-link">
            My Applications
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
