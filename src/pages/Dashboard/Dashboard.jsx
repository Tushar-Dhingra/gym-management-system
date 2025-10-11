// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/Dashboard/StatsCard';
import MemberCard from '../../components/Dashboard/MemberCard';
import { memberService } from '../../services/memberService';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalMembers: 0,
    activeMembers: 0,
    expiredMembers: 0,
    expiringMembers: 0,
    newMembersThisMonth: 0,
    newMembersLastMonth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await memberService.getAnalytics();
        if (response.success) {
          setDashboardData({
            totalMembers: response.data.totalMembersThisMonth,
            activeMembers: response.data.activeMembers,
            expiredMembers: response.data.expiredMembers,
            expiringMembers: response.data.expiringSoon,
            newMembersThisMonth: response.data.newMembersThisMonth,
            newMembersLastMonth: response.data.newMembersLastMonth
          });
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const memberCardData = [
    {
      type: 'expiring',
      count: dashboardData.expiringMembers,
      gradient: 'from-purple-600 via-blue-600 to-indigo-700',
      borderGradient: 'from-purple-600 via-blue-500 to-green-400',
      icon: <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: 'Expiring Members',
      subtitle: 'Expiring Soon',
      badgeText: `${dashboardData.expiringMembers} expiring`,
      badgeColor: 'text-yellow-600',
      buttonText: 'View All Expiring',
      navigateTo: '/members/expiring'
    },
    {
      type: 'recent',
      count: dashboardData.newMembersThisMonth,
      gradient: 'from-green-600 via-emerald-600 to-teal-700',
      borderGradient: 'from-green-600 via-emerald-500 to-teal-400',
      icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>,
      title: 'New Members',
      subtitle: 'This Month',
      badgeText: `${dashboardData.newMembersThisMonth} new`,
      badgeColor: 'text-green-600',
      buttonText: 'View All Members',
      navigateTo: '/members/all'
    },
    {
      type: 'expired',
      count: dashboardData.expiredMembers,
      gradient: 'from-red-600 via-rose-600 to-pink-700',
      borderGradient: 'from-red-600 via-rose-500 to-pink-400',
      icon: <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" /></svg>,
      title: 'Expired Members',
      subtitle: 'Need Renewal',
      badgeText: `${dashboardData.expiredMembers} expired`,
      badgeColor: 'text-red-600',
      buttonText: 'View All Expired',
      navigateTo: '/members/expired'
    }
  ];

  // Chart data
  const chartData = [
    { name: 'Active', value: dashboardData.activeMembers, color: '#10B981' },
    { name: 'Expired', value: dashboardData.expiredMembers, color: '#EF4444' },
    { name: 'Expiring', value: dashboardData.expiringMembers, color: '#F59E0B' }
  ];

  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your gym.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Members"
            value={dashboardData.totalMembers}
            change={dashboardData.newMembersThisMonth > dashboardData.newMembersLastMonth ? "+12%" : "-5%"}
            changeType={dashboardData.newMembersThisMonth > dashboardData.newMembersLastMonth ? "positive" : "negative"}
            icon="users"
            color="blue"
          />
          <StatsCard
            title="Active Members"
            value={dashboardData.activeMembers}
            change="+8%"
            changeType="positive"
            icon="userCheck"
            color="green"
          />
          <StatsCard
            title="Expiring Soon"
            value={dashboardData.expiringMembers}
            change="-3%"
            changeType="negative"
            icon="clock"
            color="yellow"
          />
          <StatsCard
            title="New This Month"
            value={dashboardData.newMembersThisMonth}
            change={dashboardData.newMembersThisMonth > dashboardData.newMembersLastMonth ? "+100%" : "0%"}
            changeType={dashboardData.newMembersThisMonth > dashboardData.newMembersLastMonth ? "positive" : "neutral"}
            icon="dollar"
            color="purple"
          />
        </div>

{/* Chart and Member Cards Section */}
<div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
  {/* Member Status Chart */}
  <div className="xl:col-span-1 bg-white p-6 rounded-xl shadow-sm border">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Status</h3>
    
    {/* Mobile Legend */}
    <div className="block xl:hidden mb-4 space-y-2">
      {chartData.map((item, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-700">{item.name}</span>
          </div>
          <span className="font-medium text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>

    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={60}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Desktop Legend */}
    <div className="hidden xl:block mt-4 space-y-2">
      {chartData.map((item, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-700">{item.name}</span>
          </div>
          <span className="font-medium text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Member Cards */}
  <div className="xl:col-span-3">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {memberCardData.map((card) => (
        <MemberCard key={card.type} {...card} />
      ))}
    </div>
  </div>
</div>


      </div>
    </div>
  );
}
