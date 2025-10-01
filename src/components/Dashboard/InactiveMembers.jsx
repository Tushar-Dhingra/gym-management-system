// src/components/Dashboard/InactiveMembers.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const InactiveMembers = () => {
  const navigate = useNavigate();
  const inactiveMembers = [
    { id: 1, name: 'Robert Smith', email: 'robert@email.com', lastVisit: '2023-12-15', plan: 'Premium' },
    { id: 2, name: 'Jennifer Lee', email: 'jennifer@email.com', lastVisit: '2023-12-10', plan: 'Basic' },
    { id: 3, name: 'Michael Brown', email: 'michael@email.com', lastVisit: '2023-12-08', plan: 'Standard' },
    { id: 4, name: 'Amanda Wilson', email: 'amanda@email.com', lastVisit: '2023-12-05', plan: 'Premium' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Inactive Members</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {inactiveMembers.length} members
        </span>
      </div>

      <div className="space-y-3">
        {inactiveMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-red-800">Last visit</p>
              <p className="text-xs text-gray-500">{member.lastVisit}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/members/inactive')}
        className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        View All Inactive Members
      </button>
    </div>
  );
};

export default InactiveMembers;
