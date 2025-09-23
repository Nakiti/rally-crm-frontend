'use client';

import { useState } from 'react';
import { Heart, UserPlus, DollarSign, BarChart3 } from 'lucide-react';
import DashboardHeader from '@/components/crm/home/DashboardHeader';
import QuickStatsGrid from '@/components/crm/home/QuickStatsGrid';
import RecentActivity from '@/components/crm/home/RecentActivity';
import TimeFilter from '@/components/crm/home/TimeFilter';
import TopCampaigns from '@/components/crm/home/TopCampaigns';
import { useGetStatsSummary } from '@/hooks/crm/useStats';
import { useGetRecentDonations } from '@/hooks/crm/useDonation';
import { useGetTopCampaigns } from '@/hooks/crm/useCampaign';
import { useAuth } from '@/providers/AuthProvider';

export default function HomePage() {
  const [activeTimeFilter, setActiveTimeFilter] = useState<'week' | 'month' | 'year'>('month');
  const [showModal, setShowModal] = useState(false);
  const { session } = useAuth();

  // Get organization ID from session
  const organizationId = session?.organizationId;

  // Fetch data using hooks
  const { data: statsData, isLoading: statsLoading, error: statsError } = useGetStatsSummary(activeTimeFilter);
  const { data: recentDonationsData, isLoading: donationsLoading, error: donationsError } = useGetRecentDonations(5);
  const { data: topCampaignsData, isLoading: campaignsLoading, error: campaignsError } = useGetTopCampaigns(activeTimeFilter, 3);

  // Check if any data is loading
  const loading = statsLoading || donationsLoading || campaignsLoading;

  // Check if there are any errors
  const hasError = statsError || donationsError || campaignsError;

  // Transform stats data for the QuickStatsGrid component
  const quickStats = statsData ? [
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      trend: statsData.activeCampaigns.change >= 0 ? 'up' as const : 'down' as const,
      change: `${statsData.activeCampaigns.change >= 0 ? '+' : ''}${(statsData.activeCampaigns.change * 100).toFixed(1)}%`,
      value: statsData.activeCampaigns.value.toString(),
      label: 'Active Campaigns',
      subtitle: `${activeTimeFilter} period`
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      trend: statsData.totalDonations.change >= 0 ? 'up' as const : 'down' as const,
      change: `${statsData.totalDonations.change >= 0 ? '+' : ''}${(statsData.totalDonations.change * 100).toFixed(1)}%`,
      value: `$${statsData.totalDonations.value.toLocaleString()}`,
      label: 'Total Donations',
      subtitle: `${activeTimeFilter} period`
    },
    {
      icon: <UserPlus className="w-6 h-6 text-purple-600" />,
      trend: statsData.activeDonors.change >= 0 ? 'up' as const : 'down' as const,
      change: `${statsData.activeDonors.change >= 0 ? '+' : ''}${(statsData.activeDonors.change * 100).toFixed(1)}%`,
      value: statsData.activeDonors.value.toLocaleString(),
      label: 'Active Donors',
      subtitle: `${activeTimeFilter} period`
    },
    {
      icon: <Heart className="w-6 h-6 text-red-600" />,
      trend: statsData.retentionRate.change >= 0 ? 'up' as const : 'down' as const,
      change: `${statsData.retentionRate.change >= 0 ? '+' : ''}${(statsData.retentionRate.change * 100).toFixed(1)}%`,
      value: `${(statsData.retentionRate.value * 100).toFixed(0)}%`,
      label: 'Retention Rate',
      subtitle: `${activeTimeFilter} period`
    }
  ] : [];

  // Transform recent donations data for the RecentActivity component
  const recentDonations = recentDonationsData ? recentDonationsData.map(donation => ({
    id: donation.id,
    name: donation.donorName,
    campaign: donation.campaignName,
    amount: donation.amount.toFixed(2),
    time: donation.donatedAt,
    avatar: donation.donorName.split(' ').map(n => n[0]).join('').toUpperCase()
  })) : [];

  // Transform top campaigns data for the TopCampaigns component
  const topCampaigns = topCampaignsData ? topCampaignsData.map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    raised: campaign.raised,
    goal: campaign.goal || 0,
    percentageFunded: campaign.goal ? Math.round((campaign.raised / campaign.goal) * 100) : 0,
    donors: campaign.donors,
    trend: '+0%' // We don't have trend data from the API yet
  })) : [];

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
    // React Query will handle refetching automatically
    window.location.reload();
  };

  const handleTimeFilterClick = (period: string) => {
    setActiveTimeFilter(period as 'week' | 'month' | 'year');
    // React Query will automatically refetch data when the period changes
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load dashboard data</h3>
          <p className="text-gray-600 mb-6">There was an error loading your dashboard. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show error if no organization ID
  if (!organizationId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load organization data</h3>
          <p className="text-gray-600">Please check your authentication and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-8">
      {/* Dashboard Header */}
      <DashboardHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your organization."
        onRefresh={handleRefresh}
        loading={loading}
        showModal={showModal}
        setShowModal={setShowModal}
        organizationId={organizationId}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
          organizationId={organizationId}
        />
      </div>
    </div>
  );
}
