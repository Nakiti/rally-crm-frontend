'use client';

import React, { useState } from 'react';
import { Button } from '../../ui';
import { ActionButtonsProps } from './types';
import { useGetOrganizationPageByType, useUpdateOrganizationPage } from '@/hooks/crm/useOrganizationPage';
import { useWebsiteEditorStore } from '@/stores/crm/useWebsiteEditorStore';
import { usePageCompleteness } from '@/hooks/crm/usePageCompleteness';

/**
 * A component that renders action buttons for saving, publishing, deactivating, and previewing pages.
 * The visibility and state of buttons depends on the current page status and loading states.
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isPublished,
  pageSlug,
}) => {
  const { data: organizationPage } = useGetOrganizationPageByType(pageSlug);
  const { contentConfig, isDirty, markAsSaved } = useWebsiteEditorStore();
  
  const updatePageMutation = useUpdateOrganizationPage(organizationPage?.id || '');
  const { isComplete, incompleteSections } = usePageCompleteness();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Handler functions
  const handleSave = () => {
    if (!contentConfig) return;
    
    setIsSaving(true)
    updatePageMutation.mutate(
      { isPublished: false, contentConfig },
      { onSuccess: () => markAsSaved(),
        onSettled: () => setIsSaving(false)
      }
    );
  };

  const handlePublish = () => {
    if (!contentConfig || !isComplete) return; // Guard clause

    // The "Publish" action saves the content AND sets the page to be published.
    updatePageMutation.mutate(
      { isPublished: true, contentConfig },
      { onSuccess: () => markAsSaved(),
        onSettled: () => setIsPublishing(false),
      }
    );
  };

  const handlePreview = () => {
    // TODO: Implement preview functionality
    // This could open a new tab with the preview URL or navigate to a preview route
    console.log('Preview functionality to be implemented');
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Save Draft Button - Only show when page is not active */}
      {handleSave && !isPublished && (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          loading={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Draft'}
        </Button>
      )}
      
      {/* Publish Button - Show when page is not active OR when page is active (for republishing) */}
      {handlePublish && (
        <Button
          variant="primary"
          size="sm"
          onClick={handlePublish}
          disabled={!isDirty || !isComplete || isPublishing}
          loading={isPublishing}
          title={!isComplete ? `Cannot publish: please fill out required fields in sections: ${incompleteSections.join(', ')}` : ''}

        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </Button>
      )}

      {/* Deactivate Button - Only show when page is active */}
      {/* {handleDeactivate && status === 'active' && (
        <Button
          variant="primary"
          size="sm"
          onClick={handleDeactivate}
          disabled={isDeactivating}
          loading={isDeactivating}
          className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        >
          {isDeactivating ? 'Deactivating...' : 'Deactivate'}
        </Button>
      )} */}

      {/* Preview Button - Always show */}
      {handlePreview && (
        <Button
          variant="primary"
          size="sm"
          onClick={handlePreview}
          className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
        >
          Preview
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
