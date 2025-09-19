import { create } from 'zustand';
import { produce } from 'immer'; // Immer is a great library for safely updating nested state
import { Campaign } from '@/lib/types';
// Define the shape of the campaign page configuration
interface PageConfig {
  // Using a flexible structure for the example
  [key: string]: any; 
}

type EditableCampaign = Partial<Campaign> | null

// Define the shape of the store's state
interface CampaignEditorState {
  isDirty: boolean; // Has the data been changed since the last save?
  campaign: EditableCampaign; // The actual page config data
  
  // Actions
  initialize: (initialCampaign: Campaign) => void;
  updateCampaignField: (fieldName: keyof Campaign, value: any) => void;
  updatePageSectionField: (pageSlug: string, sectionIndex: number, fieldPath: string, value: any) => void;
  markAsSaved: () => void;
}

export const useCampaignEditorStore = create<CampaignEditorState>((set) => ({
  isDirty: false,
  campaign: null,

  /**
   * Initializes the store with data fetched from the backend.
   */
  initialize: (initialCampaign) => set({ campaign: initialCampaign, isDirty: false }),

  /**
   * Updates a top-level field on the campaign object (e.g., title, goalAmount).
   */
  updateCampaignField: (fieldName, value) => set(produce((draft) => {
    if (draft.campaign) {
      draft.campaign[fieldName] = value;
      draft.isDirty = true;
    }
  })),

  /**
   * Updates a deeply nested field within the pageConfig JSON.
   * e.g., updatePageSectionField('landingPage', 0, 'props.headline', 'New Headline')
   */
  updatePageSectionField: (pageSlug, sectionIndex, fieldPath, value) => set(produce((draft) => {
    if (draft.campaign?.pageConfig) {
      // This logic safely navigates and updates a nested property.
      let current = draft.campaign.pageConfig[pageSlug].sections[sectionIndex];
      const keys = fieldPath.split('.');
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      draft.isDirty = true;
    }
  })),
  
  /**
   * Resets the dirty flag after a successful save operation.
   */
  markAsSaved: () => set({ isDirty: false }),
}));