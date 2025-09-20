import { create } from 'zustand';
import { produce } from 'immer';

// Define the shape of a single page's content configuration.
// This matches the `content_config` JSON in your `organization_pages` table.
interface ContentConfig {
  sections: any[]; // You can create a more specific type for your sections later
}

// Define the shape of the store's state
interface WebsiteSiteEditorState {
  pageSlug: string | null;      // The slug of the page being edited (e.g., 'landing')
  isDirty: boolean;           // Tracks if there are unsaved changes
  contentConfig: ContentConfig | null; // The actual content data for the page

  // Actions
  initialize: (slug: string, initialConfig: ContentConfig) => void;
  updateSectionField: (sectionIndex: number, fieldPath: string, value: any) => void;
  toggleSection: (sectionIndex: number, isEnabled: boolean) => void;
  markAsSaved: () => void;
}

/**
 * A Zustand store to manage the client-side state of the organization's website editor.
 * It holds the configuration for a single page at a time.
 */
export const useWebsiteEditorStore = create<WebsiteSiteEditorState>((set) => ({
  pageSlug: null,
  isDirty: false,
  contentConfig: null,

  /**
   * Initializes the store with the content for a specific page fetched from the backend.
   */
  initialize: (slug, initialConfig) => set({
    pageSlug: slug,
    contentConfig: initialConfig,
    isDirty: false,
  }),

  /**
   * Updates a deeply nested field within a specific section's props.
   * e.g., updateSectionField(0, 'props.headline', 'New Headline')
   */
  updateSectionField: (sectionIndex, fieldPath, value) => set(produce((draft) => {
    if (draft.contentConfig?.sections?.[sectionIndex]) {
      let current = draft.contentConfig.sections[sectionIndex];
      const keys = fieldPath.split('.');
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      draft.isDirty = true;
    }
  })),

  /**
   * Toggles the 'enabled' flag for a specific section.
   */
  toggleSection: (sectionIndex, isEnabled) => set(produce((draft) => {
    if (draft.contentConfig?.sections?.[sectionIndex]) {
      draft.contentConfig.sections[sectionIndex].enabled = isEnabled;
      draft.isDirty = true;
    }
  })),

  /**
   * Resets the dirty flag after a successful save operation.
   */
  markAsSaved: () => set({ isDirty: false }),
}));
