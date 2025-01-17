import React from 'react';
import { Link } from 'react-router-dom';
import './BottomTabs.css';

function BottomTabs() {
  return (
    <div className="bottom-tabs">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
    </div>
  );
}

export default BottomTabs;
