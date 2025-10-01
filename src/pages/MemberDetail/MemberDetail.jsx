// src/pages/MemberDetail/MemberDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRenewalOptions, setShowRenewalOptions] = useState(false);
  const [selectedMembershipType, setSelectedMembershipType] = useState('');

  const membershipTypes = [
    { value: 'basic', label: 'Basic - $29/month' },
    { value: 'premium', label: 'Premium - $49/month' },
    { value: 'vip', label: 'VIP - $79/month' }
  ];

  // Mock member data - replace with API call
  useEffect(() => {
    const mockMember = {
      id: parseInt(id),
      name: "John Doe",
      email: "john@email.com",
      phone: "+1234567890",
      address: "123 Main St, City, State 12345",
      plan: "Premium",
      status: "active",
      joinDate: "2024-01-15",
      nextBillDate: "2024-07-15",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    };
    
    setTimeout(() => {
      setMember(mockMember);
      setLoading(false);
    }, 500);
  }, [id]);

  const toggleStatus = () => {
    setMember(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'inactive' : 'active'
    }));
    setShowRenewalOptions(false);
  };

  const handleRenew = () => {
    if (member.status === 'active') {
      setShowRenewalOptions(true);
    }
  };

  const handleSaveRenewal = async () => {
    if (!selectedMembershipType) return;
    
    try {
      const response = await fetch(`/api/members/${id}/renew`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipType: selectedMembershipType })
      });
      
      if (response.ok) {
        alert('Membership renewed successfully!');
        setShowRenewalOptions(false);
        setSelectedMembershipType('');
      }
    } catch (error) {
      alert('Failed to renew membership');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Member Not Found</h2>
        <button 
          onClick={() => navigate('/members')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Back to Members
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Member Profile</h1>
              <p className="text-gray-600">View and manage member details</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left Column - Image */}
            <div className="lg:col-span-1 bg-gray-50 p-8 flex flex-col items-center justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-lg">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center">{member.name}</h2>
              <p className="text-gray-600 text-center mt-1">{member.plan} Member</p>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 p-8">
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-900 font-medium">{member.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Mobile</label>
                      <p className="text-gray-900 font-medium">{member.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-gray-900 font-medium">{member.email}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                      <p className="text-gray-900 font-medium">{member.address}</p>
                    </div>
                  </div>
                </div>

                {/* Membership Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Join Date</label>
                      <p className="text-gray-900 font-medium">{member.joinDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Next Bill Date</label>
                      <p className="text-gray-900 font-medium">{member.nextBillDate}</p>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Status & Actions</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <label className="text-sm font-medium text-gray-500">Status:</label>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          member.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                        <button
                          onClick={toggleStatus}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            member.status === 'active' ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              member.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleRenew}
                      className={`${ member.status === 'active' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400' }  text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 `}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Renew Membership</span>
                    </button>
                  </div>

                  {/* Membership Type Dropdown - Only visible after clicking Renew and status is active */}
                  {showRenewalOptions && member.status === 'active' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Membership Type
                      </label>
                      <select
                        value={selectedMembershipType}
                        onChange={(e) => setSelectedMembershipType(e.target.value)}
                        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Choose membership type...</option>
                        {membershipTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleSaveRenewal}
                        disabled={!selectedMembershipType}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Save Renewal
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
