import { useMemo } from 'react';
import { useWebsiteEditorStore } from '@/stores/crm/useWebsiteEditorStore';
import { websiteSectionValidation } from '@/config/websiteSectionValidation.config';

/**
 * A custom hook that calculates the "completeness" of the page currently
 * being edited in the useSiteEditorStore.
 *
 * @returns An object with `isComplete` (boolean) and a list of `incompleteSections`.
 */
export const usePageCompleteness = () => {
  // We subscribe to the entire contentConfig because we need to check all sections.
  const contentConfig = useWebsiteEditorStore((state) => state.contentConfig);

  // useMemo ensures this complex calculation only re-runs when the contentConfig changes.
  const completenessState = useMemo(() => {
    if (!contentConfig || !contentConfig.sections) {
      return { isComplete: false, incompleteSections: [] };
    }

    const incompleteSections: string[] = [];

    // Filter for only the sections that the user has enabled.
    const enabledSections = contentConfig.sections.filter(s => s.enabled);

    for (const section of enabledSections) {
      // Get the validation rules for this section type.
      const rules = websiteSectionValidation[section.type];
      if (!rules) continue; // No rules for this section, so it's considered complete.

      let isSectionComplete = true;
      for (const field of rules.requiredFields) {
        // Check if the required field exists and has a non-empty value.
        const value = section.props?.[field];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          isSectionComplete = false;
          break; // No need to check other fields in this section
        }
      }

      if (!isSectionComplete) {
        incompleteSections.push(section.type);
      }
    }

    return {
      isComplete: incompleteSections.length === 0,
      incompleteSections,
    };
  }, [contentConfig]);

  return completenessState;
};