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
export const useInitializeWebsiteEditorStore = (organizationId: string, pageSlug: string) => {
  const { data: initalPageContent, isLoading, isError } = useGetOrganizationPageByType(organizationId);
  const { initialize } = useWebsiteEditorStore();

  // 2. Perform the complex merging logic
  const completePageConfig = useMemo(() => {
    if (!initalPageContent) return null;

    const editorRules = websitePageEditorConfig[pageSlug];
    if (!editorRules) return initalPageContent;

    const savedPageConfig = initalPageContent.pageConfig?.[pageSlug];
    const savedSections = savedPageConfig?.sections || [];

    const completeSections = editorRules.availableSections.map(sectionType => {
      const savedSection = savedSections.find(s => s.type === sectionType);
      if (savedSection) {
        return savedSection;
      } else {
        return {
          type: sectionType,
          enabled: false,
          props: websiteSectionDefaults[sectionType] || {},
        };
      }
    });

    return {
      ...initalPageContent,
      pageConfig: {
        ...initalPageContent.pageConfig,
        [pageSlug]: {
          ...savedPageConfig,
          sections: completeSections,
        },
      },
    };
  }, [initalPageContent, pageSlug]);

  // 3. Initialize the store
  useEffect(() => {
    if (completePageConfig) {
      initialize(pageSlug, completePageConfig);
    }
  }, [completePageConfig, initialize, pageSlug]);

  // 4. Return the loading and error states for the UI to use
  return { isLoading, isError };
};
