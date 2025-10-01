// src/components/Modal/CreateMembershipModal.jsx
import React, { useState } from 'react';
import Modal from './Modal';

const CreateMembershipModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    months: '',
    price: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.months || formData.months <= 0) newErrors.months = 'Valid months required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price required';
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
      ...formData,
      months: parseInt(formData.months),
      price: parseFloat(formData.price)
    });
    
    setFormData({ name: '', months: '', price: '' });
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Membership Type">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Membership Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g., Premium, Basic, VIP"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Months) *</label>
          <input
            type="number"
            name="months"
            value={formData.months}
            onChange={handleChange}
            min="1"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.months ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter number of months"
          />
          {errors.months && <p className="text-red-500 text-sm mt-1">{errors.months}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter price"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
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
            Create Membership
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMembershipModal;
