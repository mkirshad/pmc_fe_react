// MISDirectoryPage.jsx
import React from 'react';
import HeaderTemplate from './HeaderTemplate2'; // Adjust the path as necessary
import ClubDirectory from '@/views/demo/ClubDirectory'; // Adjust the path as necessary

/**
 * MISDirectoryPage Component
 * 
 * This component wraps the MISDirectory with the HeaderTemplate.
 * It ensures that MISDirectory is displayed within the consistent header and footer layout.
 */
const ClubDirectoryPage = () => {
    const headerText = <h6 className="header-text">
        <span className="font-bold">Management Information System</span>
        <span className="text-sm ml-2">Educational Environmental Club Directory</span>
      </h6>
  
    return (
    <HeaderTemplate 
        headerText={headerText}
    >
      <ClubDirectory />
    </HeaderTemplate>
  );
};

export default ClubDirectoryPage;
