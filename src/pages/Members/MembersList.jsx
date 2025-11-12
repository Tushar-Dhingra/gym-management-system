// src/pages/Members/MembersList.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { memberService } from '../../services/memberService';

const MembersList = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchMembers = useCallback(async (page = 1, append = false) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const filter = type === 'all' ? 'all' : type;
      const response = await memberService.getAllMembers(page, 6, '', filter);
      
      if (response.success) {
        const newMembers = response.data.members;
        setMembers(prev => append ? [...prev, ...newMembers] : newMembers);
        setPagination(response.data.pagination);
        setHasMore(response.data.pagination.hasNextPage);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [type]);

  const lastMemberElementRef = useCallback(node => {
    if (loading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(prev => prev + 1);
      }
    }, {
      rootMargin: '100px'
    });
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore]);

  useEffect(() => {
    setMembers([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchMembers(1, false);
  }, [type, fetchMembers]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchMembers(currentPage, true);
    }
  }, [currentPage, fetchMembers]);

  const getPageConfig = () => {
    switch(type) {
      case 'expiring':
        return { title: 'Expiring Members', subtitle: 'Members with expiring memberships' };
      case 'expired':
        return { title: 'Expired Members', subtitle: 'Members with expired memberships' };
      case 'inactive':
        return { title: 'Inactive Members', subtitle: "Members who haven't visited recently" };
      default:
        return { title: 'All Members', subtitle: 'Manage all gym members' };
    }
  };

  const getCardStyle = () => {
    switch(type) {
      case 'expiring': return 'border-yellow-200';
      case 'expired': return 'border-red-200';
      case 'inactive': return 'border-red-200';
      default: return '';
    }
  };

  const getAvatarColor = (member) => {
    if (type === 'expiring') return 'bg-yellow-500';
    if (type === 'expired' || type === 'inactive') return 'bg-red-500';
    return member.status === 'active' ? 'bg-green-500' : 'bg-red-500';
  };

    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (nextBillDate) => {
    const today = new Date();
    const expiry = new Date(nextBillDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderMemberDetails = (member) => {
    if (type === 'expiring') {
      const daysLeft = getDaysUntilExpiry(member.nextBillDate);
      return (
        <>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Plan:</span>
            <span className="text-sm font-medium">{member.membership.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Expires:</span>
            <span className="text-sm font-medium text-yellow-800">{formatDate(member.nextBillDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Days Left:</span>
            <span className="text-sm font-bold text-yellow-800">{daysLeft} days</span>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Plan:</span>
          <span className="text-sm font-medium">{member.membership.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <span className={`text-sm font-medium ${member.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
            {member.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Joined:</span>
          <span className="text-sm text-gray-900">{formatDate(member.createdAt)}</span>
        </div>
      </>
    );
  };

  const renderActionButton = (member) => {
    const buttonColor = type === 'expiring' ? 'yellow-500' : type === 'expired' || type === 'inactive' ? 'red-500' : 'blue-500';
    return (
      <button 
        className={`w-full mt-4 bg-${buttonColor} text-white py-2 rounded-lg text-sm font-medium`} 
        onClick={() => navigate(`/member/${member._id}`)}
      >
        View Profile
      </button>
    );
  };

  const MemberCardSkeleton = () => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border ${getCardStyle()} animate-pulse`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-1 w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
      <div className="h-8 bg-gray-300 rounded-lg"></div>
    </div>
  );

  const pageConfig = getPageConfig();

  if (loading && members.length === 0) {
    return (
      <div className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{pageConfig.title}</h1>
              <p className="text-gray-600">{pageConfig.subtitle}</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Back to Dashboard
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <MemberCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pageConfig.title}</h1>
            <p className="text-gray-600">{pageConfig.subtitle}</p>
            <p className="text-sm text-gray-500 mt-1">
              {pagination.totalMembers} member{pagination.totalMembers !== 1 ? 's' : ''} found
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Back to Dashboard
          </button>
        </div>

        {members.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No members found for this category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member, index) => (
                <div 
                  key={member._id} 
                  ref={index === members.length - 1 ? lastMemberElementRef : null}
                  className={`bg-white p-6 rounded-xl shadow-sm border ${getCardStyle()}`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getAvatarColor(member)}`}>
                      <span className="text-white font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.email || member.mobile}</p>
                      <p className="text-xs text-gray-400">ID: {member.memberId}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {renderMemberDetails(member)}
                  </div>
                  
                  {renderActionButton(member)}
                </div>
              ))}

              {loadingMore && Array.from({ length: 3 }).map((_, index) => (
                <MemberCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>

            {!hasMore && members.length > 0 && (
              <div className="text-center mt-8 py-4">
                <p className="text-gray-500">No more members to load</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MembersList;
