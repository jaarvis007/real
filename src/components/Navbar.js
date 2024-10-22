import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile'); // Navigates to the profile page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Real Estate</h1>
        <ul className="navbar-menu">
          {/* Add any additional menu items here */}
        </ul>
        {/* Profile Link */}
        <div className="navbar-profile">
          <button className="profile-button" onClick={goToProfile}>
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
