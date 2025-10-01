// src/components/Modal/EditMemberModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const EditMemberModal = ({ isOpen, onClose, member, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    membershipType: '',
    joinDate: '',
    expiryDate: '',
    avatar: ''
  });
  const [errors, setErrors] = useState({});

  const membershipTypes = [
    { name: 'Basic', months: 1, price: 50 },
    { name: 'Standard', months: 3, price: 120 },
    { name: 'Premium', months: 6, price: 200 }
  ];

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        phone: member.phone || '',
        email: member.email || '',
        membershipType: member.plan || '',
        joinDate: member.joinDate || '',
        expiryDate: member.expiryDate || '',
        avatar: member.avatar || ''
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      if (name === 'membershipType' || name === 'joinDate') {
        const selectedType = membershipTypes.find(type => type.name === (name === 'membershipType' ? value : updated.membershipType));
        if (selectedType && updated.joinDate) {
          const joinDate = new Date(updated.joinDate);
          const expiryDate = new Date(joinDate);
          expiryDate.setMonth(expiryDate.getMonth() + selectedType.months);
          updated.expiryDate = expiryDate.toISOString().split('T')[0];
        }
      }
      
      return updated;
    });
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.membershipType) newErrors.membershipType = 'Membership type is required';
    if (!formData.joinDate) newErrors.joinDate = 'Join date is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({
      ...member,
      ...formData,
      plan: formData.membershipType
    });
    
    setErrors({});
  };

  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Member">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter member name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type *</label>
          <select
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.membershipType ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select membership type</option>
            {membershipTypes.map(type => (
              <option key={type.name} value={type.name}>
                {type.name} - {type.months} month(s) - ${type.price}
              </option>
            ))}
          </select>
          {errors.membershipType && <p className="text-red-500 text-sm mt-1">{errors.membershipType}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Join Date *</label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.joinDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.joinDate && <p className="text-red-500 text-sm mt-1">{errors.joinDate}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Member
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditMemberModal;
