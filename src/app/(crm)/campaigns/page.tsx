"use client";

import { useState } from "react";
import CampaignsTable from "@/components/crm/SingleCampaignView/CampaignsTable";
import NewCampaignModal from "@/components/crm/NewCampaignModal";
import { CampaignStats, CampaignHeader, CampaignEmptyState } from "@/components/crm/campaigns";
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-lg">Loading campaigns...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load campaigns</h3>
                    <p className="text-gray-600 mb-6">There was an error loading your campaigns. Please try again.</p>
                    <Button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    const campaigns = campaignsData || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <CampaignHeader onCreateCampaign={() => setShowNewCampaignModal(true)} />

                {/* Stats Section */}
                {campaigns.length > 0 && (
                    <CampaignStats campaigns={campaigns} />
                )}

                {/* Main Content */}
                {campaigns.length > 0 ? (
                    <CampaignsTable 
                        allCampaigns={campaigns} 
                        organizationId={organizationId} 
                    />
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <CampaignEmptyState onCreateCampaign={() => setShowNewCampaignModal(true)} />
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
        </div>
    );
};

export default CampaignsPage;