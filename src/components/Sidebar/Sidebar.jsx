// src/components/Sidebar/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  UsersIcon, 
  ChartBarIcon, 
  // CogIcon, 
  LogoutIcon
} from './SidebarIcons';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = ({ userData, onLogout, isOpen, setIsOpen }) => {
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };
    
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/dashboard' },
    { icon: UsersIcon, label: 'Members', path: '/members' },
    { icon: ChartBarIcon, label: 'Analytics', path: '/analytics' },
    // { icon: CogIcon, label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path) => {
    if (path === '/members') {
      return location.pathname.startsWith('/members');
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col shadow-2xl
      `}>
        
        {/* Gym Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div> */}
            <div className="relative w-11 h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
          {/* Dumbbell Icon */}
          <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
          </svg>
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-xl font-black text-white tracking-tighter">FZ</span>
          </div>
        </div>
            <div>
              <h1 className="text-xl font-bold text-white">FitZone Pro</h1>
              <p className="text-sm text-gray-400">{userData?.gymName}</p>
            </div>
          </div>
        </div>

        {/* Admin Profile */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={userData?.profilePic?.url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
                alt="Admin"
                className="w-16 h-16 rounded-full border-3 border-blue-500/30 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              {/* <p className="text-sm font-medium text-white truncate">{userData?.gymName}</p> */}
              <p className="text-sm font-bold text-gray-400">Gym Administrator</p>
              <p className="text-base text-blue-400 mt-1">{greeting}! <div className='text-base text-gray-400'>{userData?.email?.split('@')[0]}👋</div></p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                transition-all duration-200 group
                ${isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'}`} />
              <span className="font-medium">{item.label}</span>
              {isActive(item.path) && (
                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700/50">

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to logout?')) {
              onLogout();
              setIsOpen(false);
              toast.success('Logged out successfully!');
            }
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                  text-red-400 hover:bg-red-500/10 hover:text-red-300
                  transition-all duration-200 group"
        >
          <LogoutIcon className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>

        </div>

        {/* Footer */}
        <div className="p-4 text-center">
          <p className="text-xs text-gray-500">© 2025 FitZone Pro</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
