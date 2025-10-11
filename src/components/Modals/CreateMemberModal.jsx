// src/components/Modals/CreateMemberModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { memberService } from '../../services/memberService';
import { membershipService } from '../../services/membershipService';

const CreateMemberModal = ({ isOpen, onClose, onSubmit}) => {
  
  const [formData, setFormData] = useState({
    memberId: '',
    name: '',
    mobile: '',
    email: '',
    membershipId: '',
    lastPayment: new Date().toISOString().split('T')[0],
    status: 'active',
    profilePic: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchMemberships();
    }
  }, [isOpen]);

// fetchMemberships function:
const fetchMemberships = async () => {
  setLoading(true);
  try {
    const data = await membershipService.getAllMemberships();
    if (data.success) {
      setMemberships(data.memberships);
    }
  } catch (error) {
    console.error("Error fetching memberships:", error);
  } finally {
    setLoading(false);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
          setFormData(prev => ({ ...prev, profilePic: response.data.secure_url }))

          if (errors.profilePic) {
            setErrors(prev => ({ ...prev, profilePic: '' }));
          }
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          setErrors(prev => ({ ...prev, profilePic: 'Upload failed' }));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.memberId.trim()) newErrors.memberId = 'Member ID is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.membershipId) newErrors.membershipId = 'Membership type is required';
    if (!formData.lastPayment) newErrors.lastPayment = 'Last payment date is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await memberService.registerMember(formData);
      
      if (response.success) {
        toast.success(response.message || 'Member registered successfully');
        if (onSubmit) {
          onSubmit(response.data);
        }
        onClose();
        setFormData({
          memberId: '',
          name: '',
          mobile: '',
          email: '',
          membershipId: '',
          lastPayment: new Date().toISOString().split('T')[0],
          status: 'active',
          profilePic: ''
        });
        setErrors({});
        setPreviewImage(null);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to register member');
    } finally {
      setIsLoading(false);
    }
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Member ID *</label>
          <input
            type="text"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.memberId ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter member ID (e.g., GYM0131)"
          />
          {errors.memberId && <p className="text-red-500 text-sm mt-1">{errors.memberId}</p>}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter mobile number"
          />
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
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
            name="membershipId"
            value={formData.membershipId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.membershipId ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
          >
            <option value="">
              {loading ? "Loading memberships..." : "Select membership type"}
            </option>
            {memberships.map(membership => (
              <option key={membership._id} value={membership._id}>
                {membership.name} - {membership.months} month(s) - ${membership.price}
              </option>
            ))}
          </select>
          {errors.membershipId && <p className="text-red-500 text-sm mt-1">{errors.membershipId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Payment Date *</label>
          <input
            type="date"
            name="lastPayment"
            value={formData.lastPayment}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastPayment ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastPayment && <p className="text-red-500 text-sm mt-1">{errors.lastPayment}</p>}
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
