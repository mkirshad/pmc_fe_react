// MISDirectoryPage.jsx
import React from 'react';
import HeaderTemplate from './HeaderTemplate'; // Adjust the path as necessary
import MISDirectory from '@/views/demo/MISDirectory'; // Adjust the path as necessary

/**
 * MISDirectoryPage Component
 * 
 * This component wraps the MISDirectory with the HeaderTemplate.
 * It ensures that MISDirectory is displayed within the consistent header and footer layout.
 */
const MISDirectoryPage = () => {
    const headerText =<h6 className="header-text">
        <span className="font-bold">Management Information System</span>
        <span className="text-sm ml-2">Public Directory</span>
      </h6>
  
    return (
    <HeaderTemplate 
        headerText={headerText}
    >
      <MISDirectory />
    </HeaderTemplate>
  );
};

export default MISDirectoryPage;
