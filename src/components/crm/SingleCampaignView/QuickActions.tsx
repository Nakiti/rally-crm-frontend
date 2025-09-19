import React from 'react';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Campaign } from '@/lib/types';
import { CampaignType } from '../CampaignHeaderBar';

interface QuickActionsProps {
  campaign: Campaign | null;
  campaignType: CampaignType | null;
  campaignId: string;
  onDeactivate?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  campaign, 
  campaignType, 
  campaignId, 
  onDeactivate 
}) => {
  const getCampaignPageUrl = (type: CampaignType | null) => {
    if (!type) return '#';
    
    switch (type) {
      case 'crowdfunding':
        return `/campaigns/${campaignId}/donation-page/`;
      case 'peer-to-peer':
        return `/campaigns/${campaignId}/peer-landing/`;
      case 'general':
        return `/campaigns/${campaignId}/donation-form/`;
      case 'ticketed-event':
        return `/campaigns/${campaignId}/ticket/`;
      default:
        return '#';
    }
  };

  const getPreviewUrl = (type: CampaignType | null) => {
    if (!type) return '#';
    
    switch (type) {
      case 'crowdfunding':
        return `/campaigns/${campaignId}/donation-page/preview`;
      case 'peer-to-peer':
        return `/campaigns/${campaignId}/peer-landing-page/preview`;
      case 'general':
        return `/campaigns/${campaignId}/donation-form/preview`;
      case 'ticketed-event':
        return `/campaigns/${campaignId}/ticket/preview`;
      default:
        return '#';
    }
  };

  return (
    <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
      </div>
      <div className="p-6 space-y-4">
        <Link 
          href={getCampaignPageUrl(campaignType)}
          className="flex items-center justify-between p-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
        >                     
          <span>Open Campaign Page</span>
          <SquareArrowOutUpRight className="w-4 h-4" />
        </Link>
        
        <Link 
          href={getPreviewUrl(campaignType)}
          className="flex items-center justify-between p-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
        >
          <span>Preview Campaign</span>
          <SquareArrowOutUpRight className="w-4 h-4" />
        </Link>
        
        {/* TODO: Implement deactivate campaign functionality */}
        {campaign && campaign.isActive && onDeactivate && (
          <button 
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all duration-200"
            onClick={onDeactivate}
          >
            Deactivate Campaign
          </button>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
