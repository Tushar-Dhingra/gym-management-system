// src/components/Dashboard/MembershipChart.jsx
import React from 'react';

const MembershipChart = () => {
  const data = [
    { month: 'Jan', active: 850, expired: 120, joined: 45 },
    { month: 'Feb', active: 920, expired: 110, joined: 78 },
    { month: 'Mar', active: 987, expired: 95, joined: 89 },
    { month: 'Apr', active: 1050, expired: 85, joined: 92 },
    { month: 'May', active: 1120, expired: 75, joined: 105 },
    { month: 'Jun', active: 1234, expired: 65, joined: 134 }
  ];

  const maxValue = Math.max(...data.map(d => d.active));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Membership Overview</h3>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Active</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Expired</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">New Joins</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-8 text-sm text-gray-600 font-medium">{item.month}</div>
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-gray-100 rounded-full h-2 relative overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${(item.active / maxValue) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-12">{item.active}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipChart;
