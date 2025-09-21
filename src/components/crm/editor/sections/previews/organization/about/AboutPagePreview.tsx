
import React from 'react';
import { HeroSectionPreview } from './HeroSectionPreview';
import { StorySectionPreview } from './StorySectionPreview';
import { WhatSectionPreview } from './WhatSectionPreview';
import { WhySectionPreview } from './WhySectionPreview';
import { TeamSectionPreview } from './TeamSectionPreview';

interface AboutPagePreviewProps {
  pageSections?: Array<{
    type: string;
    enabled: boolean;
    props: Record<string, any>;
  }>;
}

export default function AboutPagePreview({
  pageSections
}: AboutPagePreviewProps) {
  // Find enabled sections from pageSections or use fallback logic
  const heroSection = pageSections?.find(s => s.type === 'hero' && s.enabled);
  const storySection = pageSections?.find(s => s.type === 'story' && s.enabled);
  const whatSection = pageSections?.find(s => s.type === 'what' && s.enabled);
  const whySection = pageSections?.find(s => s.type === 'why' && s.enabled);
  const teamSection = pageSections?.find(s => s.type === 'team' && s.enabled);

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-white font-medium">About Page Preview</p>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="text-sm">Live Preview</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      {(heroSection) && (<HeroSectionPreview {...heroSection.props} />)}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Story Section */}
        {(storySection) && (<StorySectionPreview {...storySection.props} />)}

        {/* What We Do Section */}
        {(whatSection) && (<WhatSectionPreview {...whatSection.props} />)}

        {/* Why We Do It Section */}
        {(whySection) && (<WhySectionPreview {...whySection.props} />)}

        {/* Team Section */}
        {(teamSection) && (<TeamSectionPreview {...teamSection.props} />)}
      </div>
    </div>
  );
}