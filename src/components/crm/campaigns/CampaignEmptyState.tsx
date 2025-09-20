"use client";

import { Plus, Target } from "lucide-react";
import { Button } from "@/components/ui";

interface CampaignEmptyStateProps {
  onCreateCampaign: () => void;
}

const CampaignEmptyState: React.FC<CampaignEmptyStateProps> = ({ onCreateCampaign }) => {
  return (
    <div className="text-center py-16 px-6">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-6">
        <Target className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        No campaigns yet
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        Get started by creating your first fundraising campaign. You can set goals, 
        track donations, and manage your fundraising efforts all in one place.
      </p>
      <Button 
        onClick={onCreateCampaign}
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors duration-200"
      >
        <Plus className="w-4 h-4" />
        Create Your First Campaign
      </Button>
    </div>
  );
};

export default CampaignEmptyState;
