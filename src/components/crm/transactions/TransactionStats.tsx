"use client";

import { DollarSign, CreditCard, TrendingUp, Clock } from "lucide-react";
import { Donation } from "@/lib/types";

interface TransactionStatsProps {
  donations: Donation[];
}

const TransactionStats: React.FC<TransactionStatsProps> = ({ donations }) => {
  // Calculate stats from donations data
  const totalTransactions = donations.length;
  const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const averageDonation = totalTransactions > 0 ? totalAmount / totalTransactions : 0;
  const completedTransactions = donations.filter(d => d.status === 'completed').length;
  const pendingTransactions = donations.filter(d => d.status === 'pending').length;
  
  // Calculate recent activity (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentTransactions = donations.filter(d => 
    new Date(d.createdAt) >= sevenDaysAgo
  ).length;

  const stats = [
    {
      title: "Total Transactions",
      value: totalTransactions.toLocaleString(),
      icon: CreditCard,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: `+${recentTransactions}`,
      changeType: "positive" as const,
      changeLabel: "this week"
    },
    {
      title: "Total Amount",
      value: `$${totalAmount.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12.5%",
      changeType: "positive" as const,
      changeLabel: "vs last month"
    },
    {
      title: "Average Donation",
      value: `$${averageDonation.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+8.2%",
      changeType: "positive" as const,
      changeLabel: "vs last month"
    },
    {
      title: "Pending",
      value: pendingTransactions.toLocaleString(),
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: `${completedTransactions} completed`,
      changeType: "neutral" as const,
      changeLabel: "total completed"
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
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">{stat.changeLabel}</span>
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

export default TransactionStats;
