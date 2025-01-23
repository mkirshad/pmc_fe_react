import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Divider } from '@mui/material';
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Input from '@/components/ui/Input';
import AxiosBase from '../../../services/axios/AxiosBase';

const Banner = () => {

    const [trackingPopupOpen, setTrackingPopupOpen] = useState(false); // New state for Thank You popup
    const [trackingPopupType, setTankYouPopupType ] = useState("info");
    const [trackingNumber, setTrackingNumber] = useState('');
    const [dialogContent, setDialogContent] = useState(null)
    const closeTrackingPopup = () => {
      setTrackingPopupOpen(false);
  };

  const fetchTrackingInfo = async () => {
    try {
      const response = await AxiosBase.get(`/pmc/track-application/`, {
          headers: {
              'Content-Type': 'application/json',
          },
          params: {
            tracking_number: trackingNumber, // Pass the tracking number as a query parameter
          },
      });
      setDialogContent(response.data.message);
      setTankYouPopupType('success');
    } catch (error) {
        console.error('Error fetching user groups:', error);
        // Set user groups to an empty array if an error occurs
        setDialogContent(error.response.data.message);
        setTankYouPopupType('danger');
    }
  }


  
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
        setTrackingNumber(formatTrackingNumber(trackingNumber, true));
    }
};

const formatTrackingNumber = (value, isBackspace) => {
    // Remove any invalid characters for each segment
    let rawValue = value.replace(/[^a-zA-Z0-9]/g, ''); // Allow only alphanumeric characters

    // Split the rawValue into segments
    let segment1 = rawValue.slice(0, 3).toUpperCase().replace(/[^A-Z]/g, ''); // First 3 letters (Uppercase only)
    let segment2 = rawValue.slice(3, 6).toUpperCase().replace(/[^A-Z]/g, ''); // Next 3 letters (Uppercase only)
    let segment3 = rawValue.slice(6).replace(/[^0-9]/g, ''); // Numbers only from 6th character onward

    // If backspace is detected, allow the deletion without auto-adding new dashes
    if (isBackspace) {
        return [segment1, segment2, segment3].filter(Boolean).join('-');
    }

    // Auto-format: Add dashes dynamically
    let formattedValue = '';
    if (segment1) formattedValue += segment1 + (segment1.length === 3 ? '-' : '');
    if (segment2) formattedValue += segment2  + (segment2.length === 3 ? '-' : '');
    if (segment3) formattedValue += segment3

    return formattedValue;
};


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  const bannedItems = [
    "Plastic shopping/carry bags (having thickness less than 75 micron)",
        "Disposal Food Boxes made from polystyrene (Styrofoam)",
    "Cutlery such as Forks, Spoons, Knives, Straw, Trays, Stirrers, etc.",
    "Candy sticks",
    "Ice-cream sticks",
    "Cigarette Packets",
    "Plates",
"Plastic or PVC banners less than 80 microns",
    "Wrapping or Packing Films around sweet boxes",
"Plastic sticks for balloons",

    "Disposable Cups & Glasses made from polystyrene (Styrofoam)",
"Plastic flags",
    
    "Invitation Cards",  
    "Ear buds with plastic sticks", 
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
          <Link to="/sign-in" className="nav-link transition-all duration-300 ease-in-out transform hover:scale-105">
            Staff Login
          </Link>
        </nav>
      </header>

      <div className="banner-content">
        <motion.div className="banner-text" variants={textVariants}>
          <h1>Plastic License Management Information System</h1>
        </motion.div>
        <div className="banner-links">
          <Link to="/sign-up?redirectUrl=/spuid-signup" className="nav-link transition-all duration-300 ease-in-out transform hover:scale-105">
            Apply New License
          </Link>
          <Link to="/sign-in" className="nav-link transition-all duration-300 ease-in-out transform hover:scale-105">
            My Applications
          </Link>
          <Link onClick={()=>{setTrackingPopupOpen(true); setDialogContent(null); setTankYouPopupType('info');}} to="" className="nav-link transition-all duration-300 ease-in-out transform hover:scale-105">
            Track Application
          </Link>
          <Link to="/mis-directory" className="nav-link transition-all duration-300 ease-in-out transform hover:scale-105">
            MIS-Directory
          </Link>
        </div>

        <ConfirmDialog
            isOpen={trackingPopupOpen}
            title="Track Application"
            type={trackingPopupType} //{trackingNumber.length>3?"success":"danger"}
            onClose={closeTrackingPopup}
            onRequestClose={closeTrackingPopup}
            onConfirm={()=>{if (!dialogContent) fetchTrackingInfo(); else setDialogContent(null);}}
            onCancel={closeTrackingPopup}
            confirmText={ dialogContent? 'Back' : 'Track'}
        >
          {
            dialogContent
          }
          {!dialogContent 
              && 
              <p><p className="mb-1"><strong>Tracking Number*</strong></p>
              <Input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(formatTrackingNumber(e.target.value, false))}
              placeholder="e.g., LHR-PRO-001"
              onKeyDown={handleKeyDown}
              className="mb-2 mr-0"
              title="Tracking Number (e.g., LHR-PRO-001)"
              />
              </p>
              }
        </ConfirmDialog>

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
        <span>In case of any violation found any where, please report at <a style={{fontSize:20}} href="tel:1374"> <b>1373</b> </a></span>
      </div>
      <div className="mb-0">
                <Divider textAlign="left">
                </Divider>
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
