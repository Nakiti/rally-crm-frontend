"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

interface CampaignHeaderProps {
  onCreateCampaign: () => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ onCreateCampaign }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Campaigns
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your fundraising campaigns and track their performance
        </p>
      </div>
      <div className="flex-shrink-0">
        <Button 
          onClick={onCreateCampaign}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>
    </div>
  );
};

export default CampaignHeader;
