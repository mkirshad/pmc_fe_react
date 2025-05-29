import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Divider } from '@mui/material';
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Input from '@/components/ui/Input';
import AxiosBase from '../../../services/axios/AxiosBase';
import { useSearchParams } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Banner = () => {
  const [searchParams] = useSearchParams();
  const paramSuper = searchParams.get("super"); // Replace 'key' with the actual query parameter name

    const [trackingPopupOpen, setTrackingPopupOpen] = useState(false); // New state for Thank You popup
    const [trackingPopupType, setTankYouPopupType ] = useState("info");
    const [trackingNumber, setTrackingNumber] = useState('');
    const [dialogContent, setDialogContent] = useState(null)
    const [competitionPopupOpen, setCompetitionPopupOpen] = useState(false); // Default true on page load

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
    "Plastic shopping/carry bags (having thickness less than 75 micron or size less than 12 x 16 inch)",
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

          <span className="header-text">PMIS</span>
        </div>
        <nav className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-end gap-3">
        <Link
          to="/sign-in"
          className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-sm md:text-base font-semibold w-full md:w-auto text-center"
        >
          Login
        </Link>

        </nav>
      </header>

      <div className="banner-content">
        <motion.div className="banner-text" variants={textVariants}>
          <h1>Plastic Management Information System</h1>
        </motion.div>

        <div className="banner-links flex flex-col md:flex-row flex-wrap items-center md:items-start justify-center md:justify-start gap-3 md:gap-4">
            {[
              { label: "Apply New License", to: "/sign-up?redirectUrl=/spuid-signup" },
              { label: "My Applications", to: "/sign-in" },
              { label: "Track Application", to: "", action: true },
              { label: "MIS - Public Directory", to: "/mis/directory" },
              { label: "MIS - Educational Environmental Club Directory", to: "/mis/clubs/directory" }
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                onClick={
                  link.action
                    ? () => {
                        setTrackingPopupOpen(true);
                        setDialogContent(null);
                        setTankYouPopupType("info");
                      }
                    : undefined
                }
                className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-sm md:text-base font-semibold w-full md:w-auto text-center"
              >
                {link.label}
              </Link>
            ))}


          </div>

          {/* <motion.div
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, -5, 0], boxShadow: "0 0 8px #22c55e" }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-10"
          >
            <Link
              to="/sign-up?redirectUrl=/register-competition"
              className="relative text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-sm md:text-base font-semibold w-full md:w-auto text-center"
              // onClick={() => alert("🚧 Coming Soon 🚧\nThis feature will be available shortly.")}

            >
              Register for Competition
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                New
              </span>
            </Link>
          </motion.div> */}



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

      <Modal
        open={competitionPopupOpen}
        onClose={() => setCompetitionPopupOpen(false)}
        aria-labelledby="competition-announcement"
        aria-describedby="competition-description"
      >
        <Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  }}
>
<button
  onClick={() => setCompetitionPopupOpen(false)}
  className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
  aria-label="Close Modal"
>
  &times;
</button>
          <h2 className="text-lg font-bold mb-2 text-center">🎨 Competition Announcement</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <img src="/img/flyers/a.jpg" alt="3D Model Competition" className="w-full rounded" />
            <img src="/img/flyers/b.jpg" alt="Poster Painting Competition" className="w-full rounded" />
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/sign-up?redirectUrl=/register-competition"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Register for Competition
            </Link>
          </div>
          <div className="text-center mt-2">
            <button
              onClick={() => setCompetitionPopupOpen(false)}
              className="text-sm text-gray-600 hover:underline mt-2"
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>

      <div className="mb-0">
                <Divider textAlign="left">
                </Divider>
      </div>
      <footer className="footer-container">
        <span className="footer-text">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">PMIS</span> All rights reserved. <br />
          Plastic Management Cell, Strategic Planning & Implementation Unit,
          Environmental Protection Agency, and Environment Protection & Climate
          Change Department, Government of the Punjab.
        </span>
      </footer>
    </motion.div>
  );
};

export default Banner;
