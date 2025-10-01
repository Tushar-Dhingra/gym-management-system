// src/components/Modals/CreateMemberModal.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';

const CreateMemberModal = ({ isOpen, onClose, onSubmit}) => {
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    membershipType: '',
    joinDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    avatar: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const membershipTypes = [
    { name: 'Basic', months: 1, price: 50 },
    { name: 'Standard', months: 3, price: 120 },
    { name: 'Premium', months: 6, price: 200 }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate expiry date when membership type or join date changes
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);

      try {
        setIsLoading(true);
        
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          uploadData
        );
        
        if (response.data?.secure_url) {
          setFormData(prev => ({ ...prev, avatar: response.data.secure_url }));
          if (errors.avatar) {
            setErrors(prev => ({ ...prev, avatar: '' }));
          }
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          setErrors(prev => ({ ...prev, avatar: 'Upload failed' }));
        }
      } finally {
        setIsLoading(false);
      }
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
    
    const memberData = {
      ...formData,
      status: 'active',
      plan: formData.membershipType,
      avatar: formData.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };

    if (onSubmit) {
      onSubmit(memberData);
    }
    
    setFormData({
      name: '',
      phone: '',
      email: '',
      membershipType: '',
      joinDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      avatar: ''
    });
    setErrors({});
    setPreviewImage(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Member">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-600">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">Upload profile picture</p>
          {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar}</p>}
        </div>

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
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add Member'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMemberModal;
