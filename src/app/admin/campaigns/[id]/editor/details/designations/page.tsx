'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { useGetOrgDesignations, useUpdateCampaignDesignations, useGetCampaignWithDesignations } from '@/hooks/crm/useDesignations';
import { useGetCurrentUser } from '@/hooks/crm/useUser';
import { 
  OrganizationDesignationsLink, 
  DefaultDesignationSelector, 
  ActiveDesignationsList, 
  AllDesignationsTable 
} from '@/components/crm/designations';
import type { Designation, CampaignAvailableDesignation } from '@/lib/types';

export default function DesignationsPage() {
  const params = useParams();
  const campaignId = params.id as string;

  // 1. --- SERVER STATE (TanStack Query) ---
  // Fetch the master list of ALL available designations for the organization.
  const { data: allOrgDesignations, isLoading: isLoadingDesignations } = useGetOrgDesignations();
  
  // Fetch the campaign with its current available designations
  const { data: campaignWithDesignations, isLoading: isLoadingCampaign } = useGetCampaignWithDesignations(campaignId);
  
  // Get current user for organization link
  const { data: currentUser } = useGetCurrentUser();
  
  // Get the mutation hook for saving the changes.
  const updateMutation = useUpdateCampaignDesignations(campaignId);

  // Get the campaign data and update actions from our central store.
  const { campaign, updateCampaignField, isDirty, markAsSaved } = useCampaignEditorStore();

  // 3. --- LOCAL UI STATE (useState) ---
  // This state holds the user's selections BEFORE they click "Save".
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // This effect syncs the local selection state when the campaign data loads.
  useEffect(() => {
    if (campaignWithDesignations?.availableDesignations) {
      setSelectedIds(new Set(campaignWithDesignations.availableDesignations.map((cad: CampaignAvailableDesignation) => cad.designation.id)));
    }
  }, [campaignWithDesignations?.availableDesignations]);

  const handleCheckboxChange = (designationId: string, isChecked: boolean) => {
    const newSelectedIds = new Set(selectedIds);
    if (isChecked) {
      newSelectedIds.add(designationId);
    } else {
      newSelectedIds.delete(designationId);
    }
    setSelectedIds(newSelectedIds);
  };

  // Helper functions for the new UI
  const handleChange = (item: Designation, isChecked: boolean) => {
    handleCheckboxChange(item.id, isChecked);
  };

  const handleRemove = (designationId: string) => {
    handleCheckboxChange(designationId, false);
  };

  const handleCampaignDetailsChangeWrapper = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateCampaignField('defaultDesignationId', e.target.value || null);
  };

  // Get selected designations for display
  const selectedDesignations = (allOrgDesignations || []).filter((d: Designation) => selectedIds.has(d.id));
  
  // Check if there are changes to save
  const pageChanges = { designations: isDirty || selectedIds.size !== (campaignWithDesignations?.availableDesignations?.length || 0) };

  // 4. --- SIMPLIFIED SAVE LOGIC ---
  const handleSave = () => {
    // Send the final desired state to the backend
    const dataToSave = {
      designationIds: Array.from(selectedIds),
    };
    
    updateMutation.mutate(dataToSave, {
      onSuccess: () => {
        // After saving, we can tell the main store that this part is clean.
        markAsSaved(); // This might need more granular logic in the store.
      },
    });
  };

  const isLoading = isLoadingDesignations || isLoadingCampaign || !campaignWithDesignations;
  if (isLoading) {
    // Return your loading skeleton...
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-4xl font-light text-gray-900 mb-4">Designations</h1>
      <h3 className="text-md text-gray-600 mb-8">Select the designations that users will be able to delegate their donation to:</h3>
      
      <OrganizationDesignationsLink organizationId={currentUser?.organizationId} />

      <DefaultDesignationSelector
        selectedDesignations={selectedDesignations}
        currentDefaultId={campaignWithDesignations?.defaultDesignationId || undefined}
        onDefaultChange={handleCampaignDetailsChangeWrapper}
      />

      <ActiveDesignationsList
        selectedDesignations={selectedDesignations}
        onRemove={handleRemove}
      />

      <AllDesignationsTable
        allDesignations={allOrgDesignations || []}
        selectedIds={selectedIds}
        onDesignationChange={handleChange}
      />
      <div className="w-full flex flex-row mt-6">
        <button 
          className={`ml-auto ${!pageChanges.designations ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"} px-6 py-3 w-40 rounded-md shadow-sm text-md text-white`}
          onClick={handleSave}
          disabled={!pageChanges.designations || updateMutation.isPending}
        >
          {updateMutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}