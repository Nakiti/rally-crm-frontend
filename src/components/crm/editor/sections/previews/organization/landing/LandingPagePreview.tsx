import React from 'react';
import {
  HeroSectionPreview,
  MainSectionPreview,
  AboutSectionPreview,
  ImpactSectionPreview,
  FeaturedSectionPreview,
  CampaignsSectionPreview
} from '../index';

interface LandingPagePreviewProps {
  pageSections?: Array<{
    type: string;
    enabled: boolean;
    props: Record<string, any>;
  }>;
  campaigns?: string[];
}

export default function LandingPagePreview({
  pageSections,
  campaigns = ["Emergency Relief Fund", "Education Initiative", "Community Health Program"],
}: LandingPagePreviewProps) {
  // Find enabled sections from pageSections or use fallback logic
  const heroSection = pageSections.find(s => s.type === 'banner' && s.enabled);
  const mainSection = pageSections.find(s => s.type === 'main' && s.enabled);
  const aboutSection = pageSections.find(s => s.type === 'about' && s.enabled);
  const impactSection = pageSections.find(s => s.type === 'impact' && s.enabled);
  const featuredSection = pageSections.find(s => s.type === 'featured' && s.enabled);
  const campaignsSection = pageSections.find(s => s.type === 'campaigns' && s.enabled);

  return (
    <div  className="bg-white w-full min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-white font-medium">Landing Page Preview</p>
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
      {(heroSection) && ( <HeroSectionPreview {...heroSection.props} />)}

      {(mainSection) && (<MainSectionPreview {...mainSection.props} />)}

      {/* About Section */}
      {(aboutSection) && (<AboutSectionPreview {...aboutSection.props} />)}

      {/* Impact Section */}
      {(impactSection) && (<ImpactSectionPreview {...impactSection.props} />)}

      {/* Featured Programs Section */}
      {(featuredSection) && (<FeaturedSectionPreview {...featuredSection.props} />)}

      {/* Campaigns Section */}
      {(campaignsSection) && (<CampaignsSectionPreview {...campaignsSection.props} campaigns={campaigns} />)}
    </div>
  );
}