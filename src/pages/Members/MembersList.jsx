// src/pages/Members/MembersList.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MembersList = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  // Mock data - replace with API calls
  const mockData = {
    all: {
      title: 'All Members',
      subtitle: 'Manage all gym members',
      members: [
        { id: 1, name: 'Alex Thompson', email: 'alex@email.com', plan: 'Premium', status: 'active', joinDate: '2024-01-10' },
        { id: 2, name: 'Robert Smith', email: 'robert@email.com', plan: 'Premium', status: 'inactive', lastVisit: '2023-12-15' }
      ]
    },
    expiring: {
      title: 'Expiring Members',
      subtitle: 'Members with expiring memberships',
      members: [
        { id: 1, name: 'John Doe', email: 'john@email.com', plan: 'Premium', expiryDate: '2024-01-15', daysLeft: 2 },
        { id: 2, name: 'Sarah Wilson', email: 'sarah@email.com', plan: 'Basic', expiryDate: '2024-01-16', daysLeft: 3 }
      ]
    },
    inactive: {
      title: 'Inactive Members',
      subtitle: "Members who haven't visited recently",
      members: [
        { id: 1, name: 'Robert Smith', email: 'robert@email.com', plan: 'Premium', lastVisit: '2023-12-15', daysSince: 30 },
        { id: 2, name: 'Jennifer Lee', email: 'jennifer@email.com', plan: 'Basic', lastVisit: '2023-12-10', daysSince: 35 }
      ]
    }
  };

  const data = mockData[type] || mockData.all;
  
  const getCardStyle = () => {
    switch(type) {
      case 'expiring': return 'border-yellow-200';
      case 'inactive': return 'border-red-200';
      default: return '';
    }
  };

  const getAvatarColor = (member) => {
    if (type === 'expiring') return 'bg-yellow-500';
    if (type === 'inactive') return 'bg-red-500';
    return member.status === 'active' ? 'bg-green-500' : 'bg-red-500';
  };

  const renderMemberDetails = (member) => {
    if (type === 'expiring') {
      return (
        <>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Plan:</span>
            <span className="text-sm font-medium">{member.plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Expires:</span>
            <span className="text-sm font-medium text-yellow-800">{member.expiryDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Days Left:</span>
            <span className="text-sm font-bold text-yellow-800">{member.daysLeft} days</span>
          </div>
        </>
      );
    }
    
    if (type === 'inactive') {
      return (
        <>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Plan:</span>
            <span className="text-sm font-medium">{member.plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Last Visit:</span>
            <span className="text-sm font-medium text-red-800">{member.lastVisit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Days Since:</span>
            <span className="text-sm font-bold text-red-800">{member.daysSince} days</span>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Plan:</span>
          <span className="text-sm font-medium">{member.plan}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <span className={`text-sm font-medium ${member.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
            {member.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">
            {member.status === 'active' ? 'Joined:' : 'Last Visit:'}
          </span>
          <span className="text-sm text-gray-900">
            {member.status === 'active' ? member.joinDate : member.lastVisit}
          </span>
        </div>
      </>
    );
  };

  const renderActionButton = (member) => {
    return (
      <button className={`w-full mt-4 bg-${type === 'expiring' ? 'yellow-500' : type === 'inactive' ? 'red-500' : 'blue-500'} text-white py-2 rounded-lg text-sm font-medium`} onClick={() => navigate(`/member/${member.id}`)}>
        View Profile
      </button>
    );
  };

  // ----------------------------uncommented the logic if want to show renew membership button only for expiring members-----------------
  // const renderActionButton = (member) => {
  //   if (type === 'expiring') {
  //     return (
  //       <button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium">
  //         Renew Membership
  //       </button>
  //     );
  //   }
    
  //   if (type === 'inactive') {
  //     return (
  //       <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium">
  //         Send Reminder
  //       </button>
  //     );
  //   }
    
  //   return null;
  // };


  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
            <p className="text-gray-600">{data.subtitle}</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.members.map((member) => (
            <div key={member.id} className={`bg-white p-6 rounded-xl shadow-sm border ${getCardStyle()}`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getAvatarColor(member)}`}>
                  <span className="text-white font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {renderMemberDetails(member)}
              </div>
              
              {renderActionButton(member)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersList;
