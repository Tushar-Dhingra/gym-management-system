// src/components/Modal/ViewMemberModal.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import { memberService } from '../../services/memberService';
import { toast } from 'react-toastify';

const ViewMemberModal = ({ isOpen, onClose, member, onMemberDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

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
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const confirmDelete = () => {
    const deleteMember = async () => {
      try {
        setIsDeleting(true);
        const response = await memberService.deleteMember(member._id);
        
        if (response.success) {
          toast.success(response.message);
          onMemberDeleted?.();
          onClose();
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsDeleting(false);
      }
    };

    toast(
      ({ closeToast }) => (
        <div className="flex flex-col space-y-3">
          <p className="text-gray-800">Delete member <strong>{member.name}</strong>?</p>
          <div className="flex space-x-2">
            <button
              onClick={() => { deleteMember(); closeToast(); }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Delete
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeButton: false }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Member Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={member.profilePic?.url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=150'}
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
              <label className="block text-sm font-medium text-gray-500">Member ID</label>
              <p className="text-gray-900">#{member.memberId}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-gray-900">{member.mobile}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{member.email || 'Not provided'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Membership Plan</label>
              <p className="text-gray-900">{member.membership?.name} - ₹{member.membership?.price}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Last Payment</label>
              <p className="text-gray-900">{formatDate(member.lastPayment)}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500">Next Bill Date</label>
              <p className="text-gray-900">{formatDate(member.nextBillDate)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={confirmDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Member'}
          </button>
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
