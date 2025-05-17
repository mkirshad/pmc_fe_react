// ComingSoonPage.jsx
import React from 'react';
import HeaderTemplate from './HeaderTemplate2'; // Adjust the path if needed

/**
 * ComingSoonPage Component
 * 
 * This component shows a "Coming Soon" message within the standard header/footer layout.
 */
const ComingSoonPage = () => {
  const headerText = (
    <h6 className="header-text">
      <span className="font-bold">Management Information System</span>
      <span className="text-sm ml-2">Feature Coming Soon</span>
    </h6>
  );

  return (
    <HeaderTemplate headerText={headerText}>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">🚧 Coming Soon 🚧</h2>
        <p className="text-lg text-gray-600 max-w-xl">
          We are working on something exciting! This feature will be available shortly. Stay tuned and check back later.
        </p>
      </div>
    </HeaderTemplate>
  );
};

export default ComingSoonPage;
