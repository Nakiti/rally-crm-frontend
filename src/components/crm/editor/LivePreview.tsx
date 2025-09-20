'use client';

import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { useParams } from 'next/navigation';
import LeaderBoardPreview from './sections/previews/landingPage/LeaderBoardPreview';

// Import all your small, specialized PREVIEW components
import { HeroSectionPreview } from './sections/previews/landingPage/HeroSectionPreview';
import { StorySectionPreview } from './sections/previews/landingPage/StorySectionPreview';
import SidebarPreview from './sections/previews/landingPage/SidebarPreview';
import ProgressSectionPreview from './sections/previews/landingPage/ProgressSectionPreview';
import { DonationFormPreview } from './sections/previews/donationForm/DonationFormPreview';
import LandingPagePreview from './sections/previews/landingPage/LandingPagePreview';
import { ThankYouPagePreview } from './sections/previews/thankYouPage/ThankYouPagePreview';
// import { FAQSectionPreview } from './sections/previews/FAQSectionPreview';
// ... import other section previews as you create them

/**
 * The main container for the live preview experience.
 * It reads from the central Zustand store and dynamically renders the
 * appropriate section preview components.
 */
export function LivePreview() {
  const params = useParams();
  const pageSlug = params.pageSlug as string;

  const pageSections = useCampaignEditorStore(
    (state) => state.campaign?.pageConfig?.[pageSlug]?.sections || []
  );

  if (pageSections.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Live Preview</h3>
          <p className="text-gray-600 leading-relaxed">
            Your page sections will appear here as you enable and edit them. Start by toggling on sections in the editor panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white h-full overflow-y-auto">
      {pageSlug === "landing-page" ? (
        <LandingPagePreview pageSections={pageSections}/>
      ) : 
      pageSlug === "donation-form" ? (
        <DonationFormPreview pageSections={pageSections}/>
      ) :
      pageSlug === "thank-you-page" ? (
        <ThankYouPagePreview pageSections={pageSections}/>
      ) :
      (
        // Default layout for other pages: render sections normally
        <>

        </>
      )}
    </div>
  );
}
