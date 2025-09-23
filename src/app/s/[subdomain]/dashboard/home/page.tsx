
'use client';

import React from 'react';
import { StatCard, RecentTransactionsTable, UpcomingEventsTable } from '@/components/public/dashboard';
import { dashboardStats, recentTransactions, upcomingEvents } from '@/lib/data/dashboardData';
import { DollarSign, Users, TrendingUp, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your organization.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Donations"
          value={`$${dashboardStats.totalDonations.toLocaleString()}`}
          subtitle="All time"
          icon={<DollarSign className="w-8 h-8 text-green-600" />}
          trend={{ value: dashboardStats.monthlyGrowth, isPositive: true }}
        />
        <StatCard
          title="Total Donors"
          value={dashboardStats.totalDonors.toLocaleString()}
          subtitle="Active supporters"
          icon={<Users className="w-8 h-8 text-blue-600" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Average Donation"
          value={`$${dashboardStats.averageDonation.toFixed(0)}`}
          subtitle="Per donation"
          icon={<TrendingUp className="w-8 h-8 text-purple-600" />}
          trend={{ value: 5.1, isPositive: true }}
        />
        <StatCard
          title="Impact Score"
          value="94%"
          subtitle="Donor satisfaction"
          icon={<Heart className="w-8 h-8 text-red-600" />}
          trend={{ value: 2.3, isPositive: true }}
        />
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentTransactionsTable
          transactions={recentTransactions}
          className="lg:col-span-1"
        />
        <UpcomingEventsTable
          events={upcomingEvents}
          className="lg:col-span-1"
        />
      </div>
    </div>
  );
}