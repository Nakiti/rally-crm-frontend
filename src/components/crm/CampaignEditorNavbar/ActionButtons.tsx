import React from 'react';
import { useCampaignCompleteness } from '@/hooks/crm/useCampaignCompleteness';
import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUpdateCampaign, usePublishCampaign } from '@/hooks/crm/useCampaign';
import { Button } from '@/components/ui';

interface ActionButtonsProps {
  status?: string;
  hasUnsavedChanges: boolean;
  isPublishing: boolean;
  isSaving: boolean;
  onSave: () => void;
  onPublish: () => void;
  onDeactivate: () => void;
}
 
const ActionButtons: React.FC<ActionButtonsProps> = () => {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;

  // 3. --- Connect to all state sources ---
  const { campaign, isDirty, markAsSaved } = useCampaignEditorStore();
  const updateCampaignMutation = useUpdateCampaign(campaignId);
  const publishCampaignMutation = usePublishCampaign(campaignId)
  const { isComplete, incompletePages } = useCampaignCompleteness(); // The validation hook

  // 4. --- Manage Local UI State ---
  // We track the loading state for each action independently to avoid UI bugs.
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  // 5. --- Internal Action Handlers ---
  const handleSave = () => {
    if (!campaign || !isDirty) return;
    setIsSaving(true);
    updateCampaignMutation.mutate(
      { ...campaign, isActive: false },
      {
        onSuccess: () => markAsSaved(),
        onSettled: () => setIsSaving(false), // Runs after success or error
      }
    );
  };

  const handlePublish = () => {
    if (!campaign || !isDirty || !isComplete) return;
    setIsPublishing(true);
    publishCampaignMutation.mutate(
      campaign,
      {
        onSuccess: () => markAsSaved(),
        onSettled: () => setIsPublishing(false),
      }
    );
  };

  const handleDeactivate = () => {
    if (!campaign) return;
    setIsDeactivating(true);
    updateCampaignMutation.mutate(
      { ...campaign, isActive: false },
      {
        onSuccess: () => {
          markAsSaved();
          router.push('/campaigns'); // Redirect after deactivating
        },
        onSettled: () => setIsDeactivating(false),
      }
    );
  };

  const isMutating = updateCampaignMutation.isPending;
  const isPublished = campaign?.isActive === true;


  return (
    <div className="flex items-center space-x-3">
      {/* Save Draft Button */}
      {!isPublished && (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleSave}
          disabled={!isDirty || isMutating}
          loading={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Draft'}
        </Button>
      )}
      
      {/* Publish Button */}
      <Button
        variant="primary"
        size="sm"
        onClick={handlePublish}
        // 6. --- The disabled logic now includes the completeness check ---
        disabled={!isDirty || !isComplete || isMutating}
        loading={isPublishing}
        // Add a helpful tooltip to explain why the button is disabled
        title={!isComplete ? `Cannot publish: please complete required fields on pages: ${incompletePages.join(', ')}` : ''}
      >
        {isPublishing ? 'Publishing...' : (isPublished ? 'Republish' : 'Publish')}
      </Button>

      {/* Deactivate Button */}
      {isPublished && (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDeactivate}
          disabled={isMutating}
          loading={isDeactivating}
        >
          {isDeactivating ? 'Deactivating...' : 'Deactivate'}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
