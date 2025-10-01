// src/components/Layout/ProtectedLayout.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Members from '../../pages/Members/Members';
import MembersList from '../../pages/Members/MembersList';
import MemberDetail from '../../pages/MemberDetail/MemberDetail';
import Home from '../../pages/Home/Home';
import NotFound from '../../pages/NotFound/NotFound';

const ProtectedLayout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        onLogout={onLogout} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <Navbar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="flex-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/:type" element={<MembersList />} />
            <Route path="/member/:id" element={<MemberDetail />} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
