// src/components/Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar'; // Import your SearchBar component

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSearchBar = ['/signin', '/signup', '/admin'].includes(location.pathname);

  return (
    <div>
      {!hideSearchBar && <SearchBar />} {/* Conditionally render search bar */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;