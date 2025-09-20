"use client";

import { TrendingUp, DollarSign, Target, Users } from "lucide-react";
import { Campaign } from "@/lib/types";

interface CampaignStatsProps {
  campaigns: Campaign[];
}

const CampaignStats: React.FC<CampaignStatsProps> = ({ campaigns }) => {
  // Calculate stats from campaigns data
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.isActive).length;
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.amountRaised || 0), 0);
  const totalDonations = campaigns.reduce((sum, c) => sum + (c.donations || 0), 0);

  const stats = [
    {
      title: "Total Campaigns",
      value: totalCampaigns.toLocaleString(),
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Total Raised",
      value: `$${totalRaised.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8.2%",
      changeType: "positive" as const
    },
    {
      title: "Active Campaigns",
      value: activeCampaigns.toLocaleString(),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+3",
      changeType: "positive" as const
    },
    {
      title: "Total Donations",
      value: totalDonations.toLocaleString(),
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+15%",
      changeType: "positive" as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center">
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`${stat.bgColor} rounded-lg p-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CampaignStats;
