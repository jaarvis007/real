import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Logins';
import Signup from './components/Signup';
import Home from './components/Home';
import ProfilePage from './components/Profile';

function App() {
  return (
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
      </div>
   
  
  );
}

export default App;
