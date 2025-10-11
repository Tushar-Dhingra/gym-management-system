// src/components/Navbar/Navbar.jsx
import React from 'react';

const Navbar = ({ isOpen, setIsOpen, userData }) => {
  return (
    <nav className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Left side - Menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

{/* Center - Logo */}
      <div className="flex items-center space-x-2">
        <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
          {/* Dumbbell Icon */}
          <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
          </svg>
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-xl font-black text-white tracking-tighter">FZ</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-purple-600 leading-none">{userData?.gymName}</span>
          {/* <span className="text-lg font-semibold text-gray-900 leading-tight">{userData?.gymName}</span> */}
        </div>
      </div>

      {/* Right side - Profile */}
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img
          src={userData?.profilePic?.url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
