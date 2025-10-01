// src/components/Modal/ViewMemberModal.jsx
import React from 'react';
import Modal from './Modal';

const ViewMemberModal = ({ isOpen, onClose, member }) => {
  if (!member) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Member Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={member.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
            alt={member.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
              {member.status?.charAt(0).toUpperCase() + member.status?.slice(1)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-gray-900">{member.phone}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{member.email || 'Not provided'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Membership Plan</label>
              <p className="text-gray-900">{member.plan}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Join Date</label>
              <p className="text-gray-900">{formatDate(member.joinDate)}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Expiry Date</label>
              <p className="text-gray-900">{formatDate(member.expiryDate)}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Member ID</label>
              <p className="text-gray-900">#{member.id}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewMemberModal;
