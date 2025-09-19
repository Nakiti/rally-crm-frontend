"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useGetCampaignById } from "@/hooks/crm/useCampaign"
import CampaignEditorNavbar from "@/components/crm/CampaignEditorNavbar"
import ErrorModal from "@/components/ui/ErrorModal"
import LoadingOverlay from "@/components/ui/LoadingOverlay"
import { EditorLoadingSkeleton } from "@/components/ui/LoadingSkeleton"

interface EditLayoutProps {
  params: {
    id: string;
    organizationId: string;
  };
  children: React.ReactNode;
}

const EditLayout: React.FC<EditLayoutProps> = ({ params, children }) => {
  const { id: campaignId, organizationId } = params;
  const router = useRouter();
  
  // Use existing hook for campaign data
  const { data: campaign, isLoading, error: campaignError } = useGetCampaignById(campaignId);
  
  // Local state for UI
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionLabel, setActionLabel] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // TODO: Implement campaign type detection logic
  const campaignType = "crowdfunding"; // Placeholder

  // TODO: Implement campaign status detection
  const campaignStatus = campaign?.isActive ? "active" : "draft";

  const detailsLink = `/campaigns/${campaignId}/editor/details/about`;
   
   const pageLinks = [
    // TODO: Implement campaign type specific page links
      {path: `/campaigns/${campaignId}/editor/landing-page/`, title: "Landing Page", link: `/campaigns/${campaignId}/editordonation-page/`},
      {path: `/campaigns/${campaignId}/editor/donation-form/`, title: "Donation Form", link: `/campaigns/${campaignId}/editordonation-form/`},
      {path: `/campaigns/${campaignId}/editor/thank-you-page/`, title: "Thank You Page", link: `/campaigns/${campaignId}/editor/thank-you-page/`}
  ];

  const handlePublish = async () => {
    // TODO: Implement publish campaign functionality
    setActionLabel("Publishing...");
    setActionLoading(true);
    
    try {
      // TODO: Add campaign validation logic
      // TODO: Add page section validation logic
      // TODO: Use existing mutation hooks for campaign updates
      // TODO: Handle page updates
      // TODO: Handle success/error states
      
      console.log("Publish campaign functionality to be implemented");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasUnsavedChanges(false);
      // TODO: Navigate to campaigns list or show success message
      } catch (err) {
      setError(true);
      setErrorMessage("Failed to publish campaign");
      } finally {
      setActionLoading(false);
    }
  };

  const handleSave = async () => {
    // TODO: Implement save draft functionality
    setActionLabel("Saving...");
    setActionLoading(true);
    
    try {
      // TODO: Use existing mutation hooks for saving campaign as draft
      // TODO: Handle page updates
      // TODO: Handle success/error states
      
      console.log("Save draft functionality to be implemented");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasUnsavedChanges(false);
      // TODO: Navigate to campaigns list or show success message
      } catch (err) {
      setError(true);
      setErrorMessage("Failed to save campaign");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeactivate = async () => {
    // TODO: Implement deactivate campaign functionality
    setActionLabel("Deactivating...");
    setActionLoading(true);
    
    try {
      // TODO: Use existing mutation hooks for deactivating campaign
      // TODO: Handle success/error states
      
      console.log("Deactivate campaign functionality to be implemented");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Navigate to campaigns list
      } catch (err) {
      setError(true);
      setErrorMessage("Failed to deactivate campaign");
    } finally {
      setActionLoading(false);
    }
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return <EditorLoadingSkeleton />;
  }

  // Show error state if campaign failed to load
  if (campaignError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Campaign</h2>
          <p className="text-gray-600 mb-4">{campaignError.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CampaignEditorNavbar
        campaignId={campaignId}
        organizationId={organizationId}
        detailsLink={detailsLink}
        pageLinks={pageLinks}
        onPublish={handlePublish}
        onSave={handleSave}
        onDeactivate={handleDeactivate}
        status={campaignStatus}
        hasUnsavedChanges={hasUnsavedChanges}
        isPublishing={actionLoading && actionLabel === "Publishing..."}
        isSaving={actionLoading && actionLabel === "Saving..."}
        campaignType={campaignType}
        campaignDetails={campaign}
      />
      
      {error && (
        <ErrorModal 
          message={errorMessage} 
          onClose={() => setError(false)} 
        />
      )}
      
      <LoadingOverlay 
        isVisible={actionLoading} 
        message={actionLabel} 
      />
      
      <div className="py-0">
        {/* TODO: Add context providers when they are implemented */}
        {children}
      </div>
    </div>
  );
};

export default EditLayout