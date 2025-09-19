import React from 'react';
import { Campaign } from '@/lib/types';

interface CampaignDetailsProps {
  campaign: Campaign | null;
  campaignId: string;
} 

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, campaignId }) => {
  console.log(campaign)
  if (!campaign) {
    return (
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">Campaign Details</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500">Loading campaign details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900">Campaign Details</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Campaign ID</label>
            <p className="text-lg font-semibold text-gray-900">#{campaignId}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Status</label>
            <div>
              <span 
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                  campaign.isActive 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}
              >
                {campaign.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Last Updated</label>
            <p className="text-lg text-gray-900">
              {new Date(campaign.updatedAt).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Created</label>
            <p className="text-lg text-gray-900">
              {new Date(campaign.createdAt).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Goal Amount</label>
            <p className="text-lg text-gray-900">
              ${campaign.goalAmount.toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Amount Raised</label>
            <p className="text-lg text-gray-900">
              ${campaign.amountRaised.toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Donations</label>
            <p className="text-lg text-gray-900">
              {campaign.donations}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Title</label>
            <p className="text-lg text-gray-900">
              {campaign.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
