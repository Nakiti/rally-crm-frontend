'use client';

import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { useParams } from 'next/navigation';

// Import all your small, specialized PREVIEW components
import { HeroSectionPreview } from './sections/previews/HeroSectionPreview';
// import { StorySectionPreview } from './sections/previews/StorySectionPreview';
// import { FAQSectionPreview } from './sections/previews/FAQSectionPreview';
// import { DonationFieldsPreview } from './sections/previews/DonationFieldsPreview';
// ... import other section previews as you create them

/**
 * The main container for the live preview experience.
 * It reads from the central Zustand store and dynamically renders the
 * appropriate section preview components.
 */
export function LivePreview() {
  // Subscribe to the central editor state in Zustand
  const { config } = useCampaignEditorStore();

  if (!config || !config.sections) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-500">Make a change to see your preview.</p>
      </div>
    );
  }

  const pageSections = config.sections;

  return (
    <div className="bg-white h-full overflow-y-auto border-l">
      {/* We map over the sections array from the store */}
      {pageSections.map((section, index) => {
        // We only render the section if its 'enabled' flag is true
        if (!section.enabled) {
          return null;
        }
        
        // Dynamically render the correct PREVIEW component based on the section's type
        switch (section.type) {
          case 'hero':
            // We pass the section's 'props' object down to the preview component
            return <HeroSectionPreview key={index} {...section.props} />;
        //   case 'story':
        //     return <StorySectionPreview key={index} {...section.props} />;
        //   case 'faq':
        //     return <FAQSectionPreview key={index} {...section.props} />;
        //   case 'donationFields':
        //     return <DonationFieldsPreview key={index} {...section.props} />;
        //   // Add cases for all other section types...
          default:
            return <div key={index} className="p-4 text-red-500">Unknown section type: {section.type}</div>;
        }
      })}
    </div>
  );
}
