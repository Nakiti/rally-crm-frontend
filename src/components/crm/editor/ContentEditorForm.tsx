'use client';

import { useCampaignEditorStore } from '@/stores/crm/useCampaignEditorStore';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

// Import campaign section editor components
import { 
  HeroSectionEditor as CampaignHeroSectionEditor,
  StorySectionEditor as CampaignStorySectionEditor,
  DonationHeaderSectionEditor,
  ButtonsSectionEditor,
  ThankYouHeaderSectionEditor
} from './sections/editors/campaign';

// Import organization section editor components
import {
  HeroSectionEditor,
  BannerSectionEditor,
  MainSectionEditor,
  AboutSectionEditor,
  ImpactSectionEditor,
  FeaturedSectionEditor,
  StorySectionEditor,
  WhatSectionEditor,
  WhySectionEditor,
  TeamSectionEditor,
  DonationButtonsSectionEditor
} from './sections/editors/organization';

interface ContentEditorFormProps {
  useEditorStore: any; // The specific Zustand store hook to use
  editorConfig: any;   // The specific configuration object for this editor type
}

/**
 * The main container for the content editing experience.
 * It dynamically renders the appropriate section editors based on the
 * current page's configuration.
 */
export function ContentEditorForm({ useEditorStore, editorConfig }: ContentEditorFormProps) {
  const params = useParams();
  const pageSlug = params.pageSlug as string;

  const pageSections = useEditorStore(
    useShallow(
    (state: any) => state.campaign?.pageConfig?.[pageSlug]?.sections || state.contentConfig?.sections || [],
    )
  );

  const editorRules = editorConfig[pageSlug];
  
  if (!editorRules) {
    return <div>Error: No editor configuration found for this page type.</div>;
  }

  return (
    <div className="space-y-4">
      {pageSections.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No sections available</h3>
          <p className="text-gray-500 text-sm">Sections will appear here as they become available for this page type.</p>
        </div>
      ) : (
        pageSections.map((section: any, index: number) => {
          switch (section.type) {
            // Campaign section types
            case 'hero':
              // Check if this is a campaign or organization hero section
              if (useEditorStore === useCampaignEditorStore) {
                return <CampaignHeroSectionEditor key={index} sectionData={section} sectionIndex={index} />;
              } else {
                return <HeroSectionEditor key={index} sectionData={section} sectionIndex={index} />;
              }
            case 'story':
              // Check if this is a campaign or organization story section
              if (useEditorStore === useCampaignEditorStore) {
                return <CampaignStorySectionEditor key={index} sectionData={section} sectionIndex={index} />;
              } else {
                return <StorySectionEditor key={index} sectionData={section} sectionIndex={index} />;
              }
            case 'donationHeader':
              return <DonationHeaderSectionEditor key={index} sectionData={section} sectionIndex={index}/>;
            case 'donationButtons':
              // Check if this is a campaign or organization donation buttons section
              if (useEditorStore === useCampaignEditorStore) {
                return <ButtonsSectionEditor key={index} sectionData={section} sectionIndex={index}/>;
              } else {
                return <DonationButtonsSectionEditor key={index} sectionData={section} sectionIndex={index}/>;
              }
            case 'thankYouHeader':
              return <ThankYouHeaderSectionEditor key={index} sectionData={section} sectionIndex={index}/>;

            // Organization section types
            case 'banner':
              return <BannerSectionEditor key={index} sectionData={section} sectionIndex={index} />;
            case 'main':
              return <MainSectionEditor key={index} sectionData={section} sectionIndex={index} />;
            case 'about':
              return <AboutSectionEditor key={index} sectionData={section} sectionIndex={index} />;
            case 'impact':
              return <ImpactSectionEditor key={index} sectionData={section} sectionIndex={index} />;
            case 'featured':
              return <FeaturedSectionEditor key={index} sectionData={section} sectionIndex={index} />;
            case 'what':
              return <WhatSectionEditor key={index} sectionData={section} sectionIndex={index} />;
            case 'why':
              return <WhySectionEditor key={index} sectionData={section} sectionIndex={index} />;
            case 'team':
              return <TeamSectionEditor key={index} sectionData={section} sectionIndex={index} />;

            default:
              return (
                <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-2 text-red-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="font-medium">Unknown section type: {section.type}</span>
                  </div>
                </div>
              );
          }
        })
      )}
    </div>
  );
}
