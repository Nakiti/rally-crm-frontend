"use client"
import React from "react"
import { useGetCampaignById } from "@/hooks/crm/useCampaign"
import CampaignDetails from "@/components/crm/SingleCampaignView/CampaignDetails"
import QuickActions from "@/components/crm/SingleCampaignView/QuickActions"
import { CampaignType } from "@/components/crm/CampaignHeaderBar/types"

interface CampaignPageProps {
  params: {
    id: string;
  };
}

/*
   Component: Campaign Page
   Description: Renders campaign page with proper separation of concerns
*/
const CampaignPage: React.FC<CampaignPageProps> = ({ params }) => {
  const { id } = params;
  
  // Use existing hook for data fetching
  const { data: campaign, isLoading, error } = useGetCampaignById(id);
  
  // TODO: Implement campaign type detection logic
  // This should be determined from campaign data or a separate API call
  const campaignType: CampaignType | null = null; // Placeholder

  // TODO: Implement deactivate campaign functionality using existing hooks
  const handleDeactivate = async () => {
    // TODO: Use existing mutation hook for deactivating campaign
    console.log('Deactivate campaign functionality to be implemented');
  };

  if (isLoading) {
    return (
      <div className="w-full p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading campaign: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Campaign Details Section */}
        <CampaignDetails 
          campaign={campaign || null} 
          campaignId={id} 
        />

        {/* Quick Actions Section */}
        <QuickActions
          campaign={campaign || null}
          campaignType={campaignType}
          campaignId={id}
          onDeactivate={handleDeactivate}
        />
      </div>
    </div>
  );
};

export default CampaignPage