"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGetCampaignById, useUpdateCampaign } from "@/hooks/crm/useCampaign"
import CampaignEditorNavbar from "@/components/crm/CampaignEditorNavbar"
import { ErrorModal } from "@/components/ui"
import LoadingOverlay from "@/components/ui/LoadingOverlay"
import { EditorLoadingSkeleton } from "@/components/ui/LoadingSkeleton"
import { useCampaignEditorStore } from "@/stores/crm/useCampaignEditorStore"

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
  
  const { data: initialCampaign, isLoading: isInitialLoading, isError: isFetchError } = useGetCampaignById(campaignId);
  // Use existing hook for campaign data
  const {campaign, isDirty, markAsSaved, initialize} = useCampaignEditorStore()
  const updateCampaignMutation = useUpdateCampaign(campaignId)
  
  // State for error handling and loading
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionLabel, setActionLabel] = useState("");
  
  useEffect(() => {
    if (initialCampaign) {
      initialize(initialCampaign);
    }
  }, [initialCampaign, initialize]);

  // TODO: Implement campaign type detection logic
  const campaignType = "crowdfunding"; // Placeholder

  // TODO: Implement campaign status detection
  const campaignStatus = campaign?.isActive ? "active" : "draft";

  const detailsLink = `/campaigns/${campaignId}/editor/details/about`;
   
   const pageLinks = [
    // TODO: Implement campaign type specific page links
      {path: `/campaigns/${campaignId}/editor/landing-page/`, title: "Landing Page", link: `/campaigns/${campaignId}/editor/landing-page/`},
      {path: `/campaigns/${campaignId}/editor/donation-form/`, title: "Donation Form", link: `/campaigns/${campaignId}/editor/donation-form/`},
      {path: `/campaigns/${campaignId}/editor/thank-you-page/`, title: "Thank You Page", link: `/campaigns/${campaignId}/editor/thank-you-page/`}
  ];

  const handlePublish = async () => {
    if (!campaignId) return

    setActionLoading(true);
    setActionLabel("Publishing...");

    updateCampaignMutation.mutate(
      {...campaign, isActive: true},
      {
        onSuccess: () => {
          markAsSaved();
          setActionLoading(false);
        },
        onError: (error: any) => {
          setErrorMessage("Failed to publish campaign. Please try again.");
          setError(true);
          setActionLoading(false);
        }
      }
    )
  };

  const handleSave = () => {
    if (!campaign) return;

    setActionLoading(true);
    setActionLabel("Saving...");

    updateCampaignMutation.mutate(
      { ...campaign, isActive: false },
      {
        onSuccess: () => {
          markAsSaved();
          setActionLoading(false);
        },
        onError: (error: any) => {
          setErrorMessage("Failed to save campaign. Please try again.");
          setError(true);
          setActionLoading(false);
        }
      }
    );
  };

  const handleDeactivate = () => {
    if (!campaign) return;
    
    setActionLoading(true);
    setActionLabel("Deactivating...");
    
    updateCampaignMutation.mutate(
      { ...campaign, isActive: false },
      { 
        onSuccess: () => {
          markAsSaved();
          setActionLoading(false);
          router.push('/campaigns');
        },
        onError: (error: any) => {
          setErrorMessage("Failed to deactivate campaign. Please try again.");
          setError(true);
          setActionLoading(false);
        }
      }
    );
  };

  if (isInitialLoading) {
    return <EditorLoadingSkeleton />;
  }

  if (isFetchError) {
    return <ErrorModal message="Failed to load campaign data." onClose={() => router.push('/campaigns')} />;
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
        campaignType={campaignType}
        hasUnsavedChanges={isDirty}
        isPublishing={updateCampaignMutation.isPending && actionLabel === "Publishing..."}
        isSaving={updateCampaignMutation.isPending && actionLabel === "Saving..."}
        campaignDetails={{
          internalName: campaign?.internalName || "Untitled Campaign"
        }}
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