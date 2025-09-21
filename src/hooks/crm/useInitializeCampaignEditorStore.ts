import { useEffect, useMemo } from 'react';
import { useGetCampaignById } from './useCampaign';
import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { campaignPageEditorConfig, CampaignPageType } from '@/config/campaignPageEditor.config';
import { campaignSectionDefaults, CampaignSectionType } from '@/config/campaignSectionDefaults.config';

/**
 * A custom hook responsible for the entire logic of fetching, merging,
 * and initializing the campaign editor's Zustand store.
 * @param campaignId The ID of the campaign to edit.
 * @param pageSlug The specific page slug being edited.
 */
export const useInitializeCampaignEditorStore = (campaignId: string, pageSlug: CampaignPageType) => {
  // 1. Fetch the raw data from the server
  const { data: initialCampaign, isLoading, isError } = useGetCampaignById(campaignId);
  const { initialize } = useCampaignEditorStore();

  // 2. Perform the complex merging logic
  const completeCampaignConfig = useMemo(() => {
    if (!initialCampaign) return null;

    const editorRules = campaignPageEditorConfig[pageSlug];
    if (!editorRules) return initialCampaign;

    const savedPageConfig = (initialCampaign.pageConfig as any)?.[pageSlug];
    const savedSections = savedPageConfig?.sections || [];

    console.log("editor rules ", editorRules)
    console.log("saved sections ", savedSections)

    const completeSections = editorRules.availableSections.map((sectionType: CampaignSectionType) => {
      const savedSection = savedSections.find((s: any) => s.type === sectionType);
      const defaultSection = campaignSectionDefaults[sectionType];
      
      if (savedSection) {
        // Merge saved section with defaults, ensuring all required props exist
        return {
          ...defaultSection,
          ...savedSection,
          props: {
            ...defaultSection?.props,
            ...savedSection.props,
          },
        };
      } else {
        // Use default section with enabled set to false for new sections
        return {
          ...defaultSection,
          enabled: true,
        };
      }
    });

    console.log("complete campaign sections ", completeSections)

    return {
      ...initialCampaign,
      pageConfig: {
        ...initialCampaign.pageConfig,
        [pageSlug]: {
          ...savedPageConfig,
          sections: completeSections,
        },
      },
    };
  }, [initialCampaign, pageSlug]);

  // 3. Initialize the store
  useEffect(() => {
    if (completeCampaignConfig) {
      initialize(completeCampaignConfig);
    }
  }, [completeCampaignConfig, initialize]);

  // 4. Return the loading and error states for the UI to use
  return { isLoading, isError };
};
