// src/components/Dashboard/RecentMembers.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecentMembers = () => {
  const navigate = useNavigate();
  const recentMembers = [
    { id: 1, name: 'Alex Thompson', joinDate: '2024-01-10', plan: 'Premium', status: 'active' },
    { id: 2, name: 'Lisa Chen', joinDate: '2024-01-09', plan: 'Basic', status: 'active' },
    { id: 3, name: 'David Brown', joinDate: '2024-01-08', plan: 'Premium', status: 'active' },
    { id: 4, name: 'Maria Garcia', joinDate: '2024-01-07', plan: 'Standard', status: 'active' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Joins</h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          This week
        </span>
      </div>

      <div className="space-y-3">
        {recentMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.plan} Plan</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-900">{member.joinDate}</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/members/all')}
        className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        View All Members
      </button>
    </div>
  );
};

export default RecentMembers;
