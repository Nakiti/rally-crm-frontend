import React from 'react';
import { ThankYouHeaderSection } from './ThankYouHeaderSection';
import { ThankYouSummarySection } from './ThankYouSummarySection';
import { ThankYouActionsSection } from './ThankYouActionsSection';
import { ThankYouInfoSection } from './ThankYouInfoSection';

// Define the shape of the props this component expects
interface ThankYouPagePreviewProps {
  pageSections: Array<{
    type: string;
    enabled: boolean;
    props: Record<string, any>;
  }>;
}

// This is the main container component that combines all thank you page sections
export function ThankYouPagePreview({ pageSections }: ThankYouPagePreviewProps) {
  // Find the thank you header section
  const thankYouHeaderSection = pageSections.find(s => s.type === 'thankYouHeader' && s.enabled);

  return (
    <div className="bg-white h-full overflow-y-auto">
      {/* Header Section */}
      

      {/* Content Container - only show if we have other sections */}
      <div className="relative">
        <div className="max-w-lg mx-auto px-4 py-12">
          <div className="bg-white border border-slate-200 p-6 text-center shadow-sm rounded-xl">
            {thankYouHeaderSection && (<ThankYouHeaderSection {...thankYouHeaderSection.props} />)}

            <ThankYouSummarySection  />
            

            <ThankYouActionsSection  />
            

            <ThankYouInfoSection />
            
          </div>
        </div>
      </div>
      
    </div>
  );
}
