// src/components/Dashboard/ExpiringMembers.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExpiringMembers = () => {
  const navigate = useNavigate();
  const expiringMembers = [
    { id: 1, name: 'John Doe', email: 'john@email.com', expiryDate: '2024-01-15', daysLeft: 2 },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@email.com', expiryDate: '2024-01-16', daysLeft: 3 },
    { id: 3, name: 'Mike Johnson', email: 'mike@email.com', expiryDate: '2024-01-17', daysLeft: 4 },
    { id: 4, name: 'Emma Davis', email: 'emma@email.com', expiryDate: '2024-01-18', daysLeft: 5 }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Expiring Soon</h3>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {expiringMembers.length} members
        </span>
      </div>

      <div className="space-y-3">
        {expiringMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
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
              <p className="text-sm font-medium text-yellow-800">{member.daysLeft} days</p>
              <p className="text-xs text-gray-500">{member.expiryDate}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate('/members/expiring')}
        className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        View All Expiring Members
      </button>
    </div>
  );
};

export default ExpiringMembers;
