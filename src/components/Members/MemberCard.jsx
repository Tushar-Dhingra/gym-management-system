// src/components/Members/MemberCard.jsx
import React from 'react';

const MemberCard = ({ member, onView, onEdit }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-gray-800',
    expired: 'bg-red-100 text-red-800',
    expiring: 'bg-yellow-100 text-yellow-800'
  };

    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const planColors = {
    Monthly: 'bg-gray-100 text-gray-800',
    Quarterly: 'bg-blue-100 text-blue-800',
    Annual: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[member.status]}`}>
          {member.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Phone:</span>
          <span className="text-gray-900">{member.phone}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Plan:</span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${planColors[member.plan] || 'bg-gray-100 text-gray-800'}`}>
            {member.plan}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Expires:</span>
          <span className="text-gray-900">{formatDate(member.expiryDate)}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={onView}
          className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          View Details
        </button>
        <button 
          onClick={onEdit}
          className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default MemberCard;
