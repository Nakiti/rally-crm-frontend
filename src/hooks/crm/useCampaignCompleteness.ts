import { useMemo } from 'react';
import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { campaignSectionValidation } from '@/config/campaignSectionValidation.config';

/**
 * A custom hook that calculates the "completeness" of the CAMPAIGN
 * currently being edited in the useCampaignEditorStore.
 */
export const useCampaignCompleteness = () => {
  // It subscribes to the CAMPAIGN store
  const campaign = useCampaignEditorStore((state) => state.campaign);

  const completenessState = useMemo(() => {
    if (!campaign || !campaign.pageConfig) {
      return { isComplete: false, incompletePages: [] };
    }

    const incompletePages: string[] = [];

    // Loop over each page in the campaign's pageConfig (e.g., 'landing-page', 'donation-form')
    for (const [pageSlug, pageData] of Object.entries(campaign.pageConfig)) {
      if (!pageData?.sections) continue;

      // Filter for only the sections that are enabled on this page
      const enabledSections = pageData.sections.filter(s => s.enabled);
      let isPageComplete = true;

      for (const section of enabledSections) {
        // Get the validation rules for this section type
        const rules = campaignSectionValidation[section.type];
        if (!rules) continue;

        // Check if all required fields are filled for this section
        for (const field of rules.requiredFields) {
          const value = section.props?.[field];
          if (!value || (Array.isArray(value) && value.length === 0)) {
            isPageComplete = false;
            break; // No need to check other fields in this section
          }
        }
        if (!isPageComplete) break; // No need to check other sections on this page
      }
      
      if (!isPageComplete) {
        incompletePages.push(pageSlug);
      }
    }

    return {
      isComplete: incompletePages.length === 0,
      incompletePages, // e.g., ['landing-page', 'thank-you-page']
    };
  }, [campaign]);

  return completenessState;
};