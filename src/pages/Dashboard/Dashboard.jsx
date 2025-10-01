// src/pages/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import StatsCard from '../../components/Dashboard/StatsCard';
import MembershipChart from '../../components/Dashboard/MembershipChart';
import RecentMembers from '../../components/Dashboard/RecentMembers';
import ExpiringMembers from '../../components/Dashboard/ExpiringMembers';
import InactiveMembers from '../../components/Dashboard/InactiveMembers';

export default function Dashboard() {
  const [dashboardData] = useState({
    totalMembers: 1234,
    activeMembers: 987,
    expiredMembers: 147,
    expiringMembers: 23,
    monthlyJoined: 89,
    todayVisits: 156,
    revenue: 45670,
    monthlyRevenue: 12450
  });

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your gym.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Add New Member
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Members"
            value={dashboardData.totalMembers}
            change="+12%"
            changeType="positive"
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
            title="Monthly Revenue"
            value={`$${dashboardData.monthlyRevenue.toLocaleString()}`}
            change="+15%"
            changeType="positive"
            icon="dollar"
            color="purple"
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MembershipChart />
          <div className="space-y-6">
            <ExpiringMembers />
            <RecentMembers />
            <InactiveMembers />
          </div>
        </div>

      </div>
    </div>
  );
}
