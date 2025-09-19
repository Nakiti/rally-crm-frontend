'use client';

import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { useParams } from 'next/navigation';
import { pageEditorConfig } from '@/config/pageEditor.config'; // Your configuration file

// Import all of your small, specialized section editor components
import { HeroSectionEditor } from './sections/HeroSectionEditor';
// import { StorySectionEditor } from './sections/StorySectionEditor';
// import { FAQSectionEditor } from './sections/FAQSectionEditor';
// import { DonationFieldsEditor } from './sections/DonationFieldsEditor';
// ... import other section editors as you create them

import { Button } from '@/components/ui/Button'; // Your shared UI component

/**
 * The main container for the content editing experience.
 * It dynamically renders the appropriate section editors based on the
 * current page's configuration.
 */
export function ContentEditorForm() {
  // Get the current page slug from the URL (e.g., 'donation-form')
  const params = useParams();
  const pageSlug = params.pageSlug as string;

  // Subscribe to the central editor state in Zustand
  const { config } = useCampaignEditorStore();

  // Look up the rules for this specific page slug from our config file
  const editorRules = (pageEditorConfig)[pageSlug];
  const pageSections = config?.sections || [];

  if (!editorRules) {
    return <div>Error: No editor configuration found for this page type.</div>;
  }

  return (
    <div className="p-6 bg-white h-full overflow-y-auto space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Editing: {editorRules.title}</h2>
        <p className="text-gray-500">Add, remove, and reorder sections for your page.</p>
      </div>

      {/* This is the core of the dynamic system. We map over the sections array
        from our Zustand store and render the correct editor component for each one.
      */}
      {pageSections.map((section, index) => {
        // We pass the section data and its index down as props.
        // The index is crucial for the section editor to know which part of the state to update.
        switch (section.type) {
          case 'hero':
            return <HeroSectionEditor key={index} sectionData={section} sectionIndex={index} />;
        //   case 'story':
        //     return <StorySectionEditor key={index} sectionData={section} sectionIndex={index} />;
        //   case 'faq':
        //     return <FAQSectionEditor key={index} sectionData={section} sectionIndex={index} />;
        //   case 'donationFields':
        //     return <DonationFieldsEditor key={index} sectionData={section} sectionIndex={index} />;
        //   // Add cases for all other section types...
          default:
            return <div key={index}>Unknown section type: {section.type}</div>;
        }
      })}

      {/* <div className="pt-4 border-t">
        <h3 className="font-semibold mb-2">Add a New Section</h3>
        <div className="flex flex-wrap gap-2">

          {editorRules.availableSections.map((sectionType) => (
            <Button
              key={sectionType}
              variant="secondary"
              onClick={() => addSection(sectionType)} // `addSection` would be a new action in your Zustand store
            >
              + Add {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}
            </Button>
          ))}
        </div>
      </div> */}
    </div>
  );
}
