import React, { useEffect, useState } from 'react';
import './Profile.css';
import profileImg from './profile.png'; // Importing the image directly
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const navigate = useNavigate();
  // Retrieve user data from local storage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleBack = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    // Clear cookies and local storage
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('user');
    navigate('/login');
    alert('Logged out successfully!');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Back button */}
        <div className="profile-navigation">
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
        </div>

        {/* User Avatar Section */}
        <div className="profile-avatar-section">
          <img src={profileImg} alt="User Avatar" className="profile-avatar" />
        </div>

        {/* User Details Section */}
        <div className="profile-details-section">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-phone">+1 (234) 567-890</p>
        </div>

        {/* Logout Button */}
        <div className="profile-logout-section">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
