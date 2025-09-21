import React from 'react';

interface CampaignsSectionPreviewProps {
  campaigns?: string[];
  showCampaignBadges?: boolean;
  showProgressIndicators?: boolean;
  showHoverEffects?: boolean;
}

export function CampaignsSectionPreview({
  campaigns = ["Emergency Relief Fund", "Education Initiative", "Community Health Program"],
  showCampaignBadges = true,
  showProgressIndicators = true,
  showHoverEffects = true
}: CampaignsSectionPreviewProps) {
  const defaultImage = "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  return (
    <div className="px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-6 text-gray-900 text-4xl">
            Active Campaigns
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Join us in making a difference through our current fundraising initiatives
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <div 
              className={`bg-white border border-gray-100 overflow-hidden transition-all duration-200 rounded-xl ${showHoverEffects ? 'hover:border-gray-200 hover:shadow-sm' : ''}`}
              key={index}
            >
              <div className="relative">
                <img 
                  src={defaultImage}
                  className="object-cover w-full h-48"
                  alt={campaign}
                />
                {showCampaignBadges && (
                  <div className="absolute top-3 left-3 bg-gray-800 text-white px-2 py-1 text-xs font-medium rounded-xl">
                    Active
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-3 text-gray-900 text-xl">
                  {campaign}
                </h3>
                <p className="text-gray-500 mb-4 leading-relaxed text-lg">
                  Join us in making a difference through this important initiative that supports our community.
                </p>
                {showProgressIndicators && (
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-500">In Progress</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">75% Funded</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
