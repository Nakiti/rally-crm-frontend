import { useEffect, useMemo } from 'react';
import { useWebsiteEditorStore } from '@/stores/crm/useWebsiteEditorStore';
import { websitePageEditorConfig } from '@/config/websitePageEditor.config';
import { websiteSectionDefaults } from '@/config/websiteSectionDefaults.config';
import { useGetOrganizationPageByType } from './useOrganizationPage';

/**
 * A custom hook responsible for the entire logic of fetching, merging,
 * and initializing the campaign editor's Zustand store.
 * @param organizationId The ID of the campaign to edit.
 * @param pageSlug The specific page slug being edited.
 */
export const useInitializeWebsiteEditorStore = (pageSlug: string) => {
  const { data: initialPageContent, isLoading, isError } = useGetOrganizationPageByType(pageSlug);
  const { initialize } = useWebsiteEditorStore();

  // 2. Perform the complex merging logic
  const completePageConfig = useMemo(() => {
    // The blueprint for this page type
    const editorRules = websitePageEditorConfig[pageSlug];
    console.log("editor rules", editorRules)
    if (!editorRules) return null;

    // The saved sections for this page, or an empty array if none exist
    const savedSections = initialPageContent?.contentConfig?.sections || [];
    
    // Assemble the full list of sections, merging saved data with defaults
    const completeSections = editorRules.availableSections.map(sectionType => {
      const savedSection = savedSections.find(s => s.type === sectionType);
      
      return savedSection || websiteSectionDefaults[sectionType];
    });

    return { sections: completeSections };
  }, [initialPageContent, pageSlug]);

  // 3. Initialize the store
  useEffect(() => {
    console.log("config", completePageConfig)
    if (completePageConfig) {
      initialize(pageSlug, completePageConfig);
    }
  }, [completePageConfig, initialize, pageSlug]);

  // 4. Return the loading and error states for the UI to use
  return { isLoading, isError }; 
};
