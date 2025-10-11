// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import FormInput from './FormInput';
import Button from './Button';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    gymName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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
        setFormData(prev => ({ ...prev, profilePic: response.data.secure_url }));
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
    
    if (!formData.gymName.trim()) {
      newErrors.gymName = 'Gym name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
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
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: formData.email,
        // userName: formData.email.split('@')[0], // Generate username from email
        password: formData.password,
        gymName: formData.gymName,
        profilePic: formData.profilePic,
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      onSwitchToLogin(); // Switch to login form after successful registration
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    const errMsg = error.message ||"Something went wrong. Please try again later.";
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }
    toast.error(errMsg);
    setErrors({ password: 'Failed to register. Please try again.' });
    console.error('Register error:', error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Create Admin Account</h2>
        <p className="text-gray-300">Start managing your gym with powerful tools</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden border-2 border-gray-500">
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
          <p className="text-xs text-gray-400 mt-2">Upload profile picture</p>
          {errors.profilePic && <p className="text-red-400 text-xs mt-1">{errors.profilePic}</p>}
        </div>

        <FormInput
          label="Gym Name"
          type="text"
          name="gymName"
          value={formData.gymName}
          onChange={handleChange}
          error={errors.gymName}
          placeholder="Enter your gym name"
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Create a password"
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
        />

        <div className="flex items-start">
          <input type="checkbox" className="mt-1 mr-3" required />
          <span className="text-sm text-gray-300">
            I agree to the{' '}
            <button type="button" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </button>
          </span>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full">
          Create Admin Account
        </Button>

        <div className="text-center pt-4">
          <span className="text-gray-300">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
