"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CampaignsTable from "@/components/crm/SingleCampaignView/CampaignsTable";
import NewCampaignModal from "@/components/crm/NewCampaignModal";
import { useGetCampaigns } from "@/hooks/crm/useCampaign";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui";

const CampaignsPage = () => {
    const { session } = useAuth();
    const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
    
    // Fetch campaigns data
    const { data: campaignsData, isLoading, error } = useGetCampaigns();
    
    // Get organization ID from session
    const organizationId = session?.organizationId;
    
    if (!organizationId) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Unable to load organization data</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading campaigns...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Failed to load campaigns</p>
                    <Button 
                        onClick={() => window.location.reload()} 
                        variant="outline"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    const campaigns = campaignsData || [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
                    <p className="text-gray-600 mt-1">
                        Manage your fundraising campaigns
                    </p>
                </div>
                <Button 
                    onClick={() => setShowNewCampaignModal(true)}
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Campaign
                </Button>
            </div>

            {/* Campaigns Table */}
            {campaigns.length > 0 ? (
                <CampaignsTable 
                    allCampaigns={campaigns} 
                    organizationId={organizationId} 
                />
            ) : (
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
                    <p className="text-gray-500 mb-6">
                        Get started by creating your first fundraising campaign
                    </p>
                    <Button 
                        onClick={() => setShowNewCampaignModal(true)}
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create Your First Campaign
                    </Button>
                </div>
            )}

            {/* New Campaign Modal */}
            {showNewCampaignModal && (
                <NewCampaignModal 
                    setShow={setShowNewCampaignModal}
                    organizationId={organizationId}
                />
            )}
        </div>
    );
};

export default CampaignsPage;