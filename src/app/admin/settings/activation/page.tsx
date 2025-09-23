
"use client";

import { useState } from "react";
import { 
  useGetOrganizationCompletenessStatus,
  usePublishSite,
  useCheckOrganizationCompleteness
} from "@/hooks/crm/useOrganizationCompleteness";
import { useGetOrganizationPages } from "@/hooks/crm/useOrganizationPage";
import { useGetCurrentOrganization } from "@/hooks/crm/useOrganization";
import { ErrorModal } from "@/components/ui/ErrorModal";
import {
  SuccessModal,
  SiteStatusCard,
  RequirementsCard,
  MissingRequirementsCard,
  HelpCard,
  ActivationHeader
} from "@/components/crm/settings/activation";

export default function ActivationPage() {
  const { data: organization } = useGetCurrentOrganization();
  const { data: completenessStatus, isLoading: statusLoading, refetch: refetchStatus } = useGetOrganizationCompletenessStatus();
  const { data: organizationPages, isLoading: pagesLoading } = useGetOrganizationPages();
  const publishSiteMutation = usePublishSite();
  const checkCompletenessMutation = useCheckOrganizationCompleteness();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePublishSite = async () => {
    try {
      await publishSiteMutation.mutateAsync();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Failed to publish site:", error);
    }
  };

  const handleRefreshStatus = async () => {
    try {
      await checkCompletenessMutation.mutateAsync();
      refetchStatus();
    } catch (error) {
      console.error("Failed to refresh status:", error);
    }
  };

  const getPageStatus = (pageType: string): boolean => {
    if (!organizationPages) return false;
    const page = organizationPages.find(p => p.pageType === pageType);
    return Boolean(page?.isPublished);
  };

  const isReadyToPublish = completenessStatus?.isPubliclyActive || false;
  const hasStripeAccount = organization?.stripeAccountId && organization.stripeAccountId.trim() !== '';
  const stripeVerified = completenessStatus?.stripeAccountVerified || false;

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50">
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      {publishSiteMutation.error && (
        <ErrorModal 
          message={publishSiteMutation.error instanceof Error ? publishSiteMutation.error.message : 'Failed to publish site'} 
          onClose={() => publishSiteMutation.reset()} 
        />
      )}

      <div className="p-6 max-w-6xl mx-auto">
        <ActivationHeader />

        <SiteStatusCard
          isReadyToPublish={isReadyToPublish}
          isLoading={statusLoading}
          isRefreshing={checkCompletenessMutation.isPending}
          onRefresh={handleRefreshStatus}
          onPublish={handlePublishSite}
          isPublishing={publishSiteMutation.isPending}
        />

        <RequirementsCard
          hasStripeAccount={Boolean(hasStripeAccount)}
          stripeVerified={Boolean(stripeVerified)}
          landingPagePublished={getPageStatus('landing')}
          aboutPagePublished={getPageStatus('about')}
          organizationNameSet={Boolean(organization?.name)}
          subdomainConfigured={Boolean(organization?.subdomain)}
          statusLoading={Boolean(statusLoading)}
          pagesLoading={Boolean(pagesLoading)}
        />

        <MissingRequirementsCard 
          missingRequirements={completenessStatus?.missingRequirements || []}
        />

        <HelpCard />
      </div>
    </div>
  );
}