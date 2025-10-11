// src/pages/MemberDetail/MemberDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { memberService } from '../../services/memberService';
import { membershipService } from '../../services/membershipService';
import { toast } from 'react-toastify';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRenewalOptions, setShowRenewalOptions] = useState(false);
  const [selectedMembershipType, setSelectedMembershipType] = useState('');
  const [currentBillDate, setCurrentBillDate] = useState('');
  const [memberships, setMemberships] = useState([]);
  const [loadingMemberships, setLoadingMemberships] = useState(false);

useEffect(() => {
  const fetchMemberDetails = async () => {
    try {
      setLoading(true);
      const response = await memberService.getMemberById(id);
      setMember(response.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch member details');
    } finally {
      setLoading(false);
    }
  };

  fetchMemberDetails();
}, [id]);

  const fetchMemberships = async () => {
    try {
      setLoadingMemberships(true);
      const response = await membershipService.getAllMemberships();
      setMemberships(response.memberships || []);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch memberships');
    } finally {
      setLoadingMemberships(false);
    }
  };

  const toggleStatus = async () => {
    try {
      const newStatus = member.status === 'active' ? 'inactive' : 'active';
      const response = await memberService.updateMemberStatus(id, newStatus);
      setMember(response.data);
      toast.success('Member status updated successfully');
      setShowRenewalOptions(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update member status');
    }
  };

  const handleRenew = async () => {
    if (member.status === 'active') {
      setShowRenewalOptions(true);
      setCurrentBillDate(new Date().toISOString().split('T')[0]);
      // Fetch memberships when renewal options are shown
      await fetchMemberships();
    }
  };

  const handleSaveRenewal = async () => {
    if (!selectedMembershipType || !currentBillDate) {
      toast.error('Please select membership type and bill date');
      return;
    }
    
    try {
      const response = await memberService.renewMembership(id, selectedMembershipType, currentBillDate);
      setMember(response.data);
      toast.success('Member plan renewed successfully');
      setShowRenewalOptions(false);
      setSelectedMembershipType('');
      setCurrentBillDate('');
      setMemberships([]);
    } catch (error) {
      toast.error(error.message || 'Failed to renew membership');
    }
  };

  const handleCancelRenewal = () => {
    setShowRenewalOptions(false);
    setSelectedMembershipType('');
    setCurrentBillDate('');
    setMemberships([]);
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
                  src={member.profilePic?.url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center">{member.name}</h2>
              <p className="text-gray-600 text-center mt-1">{member.membership?.name} Member</p>
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
                      <label className="block text-sm font-medium text-gray-500 mb-1">Member ID</label>
                      <p className="text-gray-900 font-medium">{member.memberId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Mobile</label>
                      <p className="text-gray-900 font-medium">{member.mobile}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-gray-900 font-medium">{member.email}</p>
                    </div>
                  </div>
                </div>

                {/* Membership Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Plan</label>
                      <p className="text-gray-900 font-medium">{member.membership?.name} - ${member.membership?.price}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Duration</label>
                      <p className="text-gray-900 font-medium">{member.membership?.months} month(s)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Last Payment</label>
                      <p className="text-gray-900 font-medium">{new Date(member.lastPayment).toDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Next Bill Date</label>
                      <p className="text-gray-900 font-medium">{new Date(member.nextBillDate).toDateString()}</p>
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
                      className={`${member.status === 'active' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'} text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2`}
                      disabled={member.status !== 'active'}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Renew Membership</span>
                    </button>
                  </div>
                </div>

                {/* Renewal Options */}
                {showRenewalOptions && (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Renew Membership</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Membership Type</label>
                        <select
                          value={selectedMembershipType}
                          onChange={(e) => setSelectedMembershipType(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={loadingMemberships}
                        >
                          <option value="">
                            {loadingMemberships ? 'Loading memberships...' : 'Select membership type'}
                          </option>
                          {memberships.map((membership) => (
                            <option key={membership._id} value={membership._id}>
                              {membership.name} - ${membership.price} ({membership.months} month{membership.months > 1 ? 's' : ''})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Bill Date</label>
                        <input
                          type="date"
                          value={currentBillDate}
                          onChange={(e) => setCurrentBillDate(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSaveRenewal}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Save Renewal
                        </button>
                        <button
                          onClick={handleCancelRenewal}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;