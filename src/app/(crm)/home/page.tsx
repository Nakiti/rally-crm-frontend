'use client';

import { useState } from 'react';
import { Heart, UserPlus, DollarSign, BarChart3 } from 'lucide-react';
import DashboardHeader from '@/components/crm/home/DashboardHeader';
import QuickStatsGrid from '@/components/crm/home/QuickStatsGrid';
import RecentActivity from '@/components/crm/home/RecentActivity';
import TimeFilter from '@/components/crm/home/TimeFilter';
import TopCampaigns from '@/components/crm/home/TopCampaigns';

export default function HomePage() {
  const [activeTimeFilter, setActiveTimeFilter] = useState('month');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dummy data for quick stats
  const quickStats = [
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      trend: 'up' as const,
      change: '+12%',
      value: '12',
      label: 'Active Campaigns',
      subtitle: '2 new this month'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      trend: 'up' as const,
      change: '+18%',
      value: '$45,230',
      label: 'Total Donations',
      subtitle: 'This month'
    },
    {
      icon: <UserPlus className="w-6 h-6 text-purple-600" />,
      trend: 'up' as const,
      change: '+8%',
      value: '1,234',
      label: 'Active Donors',
      subtitle: 'New this month'
    },
    {
      icon: <Heart className="w-6 h-6 text-red-600" />,
      trend: 'down' as const,
      change: '-3%',
      value: '89%',
      label: 'Retention Rate',
      subtitle: 'Last 30 days'
    }
  ];

  // Dummy data for recent donations
  const recentDonations = [
    {
      id: 'don_001',
      name: 'John Smith',
      campaign: 'Spring Fundraiser',
      amount: '500.00',
      time: '2024-01-15T10:30:00Z',
      avatar: 'JS'
    },
    {
      id: 'don_002',
      name: 'Sarah Johnson',
      campaign: 'Education Fund',
      amount: '250.00',
      time: '2024-01-15T09:15:00Z',
      avatar: 'SJ'
    },
    {
      id: 'don_003',
      name: 'Mike Wilson',
      campaign: 'Community Garden',
      amount: '100.00',
      time: '2024-01-14T16:45:00Z',
      avatar: 'MW'
    },
    {
      id: 'don_004',
      name: 'Emily Davis',
      campaign: 'Spring Fundraiser',
      amount: '750.00',
      time: '2024-01-14T14:20:00Z',
      avatar: 'ED'
    }
  ];

  // Dummy data for top campaigns
  const topCampaigns = [
    {
      id: 'camp_001',
      name: 'Spring Fundraiser',
      raised: 12500,
      goal: 20000,
      percentageFunded: 62,
      donors: 45,
      trend: '+15%'
    },
    {
      id: 'camp_002',
      name: 'Education Fund',
      raised: 8750,
      goal: 15000,
      percentageFunded: 58,
      donors: 32,
      trend: '+8%'
    },
    {
      id: 'camp_003',
      name: 'Community Garden',
      raised: 3200,
      goal: 5000,
      percentageFunded: 64,
      donors: 18,
      trend: '+22%'
    }
  ];

  // Helper function to format time ago
  const formatTimeAgo = (timeString: string): string => {
    const now = new Date();
    const time = new Date(timeString);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleTimeFilterClick = (period: string) => {
    setActiveTimeFilter(period);
    // In a real app, this would trigger data refetch
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <DashboardHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your organization."
        onRefresh={handleRefresh}
        loading={loading}
        showModal={showModal}
        setShowModal={setShowModal}
        organizationId="org_123"
      />

      {/* Time Filter */}
      <TimeFilter
        active={activeTimeFilter}
        onFilterClick={handleTimeFilterClick}
      />

      {/* Quick Stats Grid */}
      <QuickStatsGrid
        quickStats={quickStats}
        loading={loading}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns on large screens */}
        <RecentActivity
          recentDonations={recentDonations}
          loading={loading}
          formatTimeAgo={formatTimeAgo}
        />

        {/* Top Campaigns - Takes 1 column on large screens */}
        <TopCampaigns
          topCampaigns={topCampaigns}
          loading={loading}
          organizationId="org_123"
        />
      </div>
    </div>
  );
}
