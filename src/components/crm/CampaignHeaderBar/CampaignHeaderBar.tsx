"use client"
import { usePathname } from "next/navigation";
import { CampaignHeaderBarProps } from "./types";
import BackNavigation from "./BackNavigation";
import CampaignIcon from "./CampaignIcon";
import CampaignInfo from "./CampaignInfo";
import CampaignActions from "./CampaignActions";
import NavigationTabs from "./NavigationTabs";

const CampaignHeaderBar: React.FC<CampaignHeaderBarProps> = ({ 
  campaignType, 
  campaign, 
  campaignId 
}) => {
  const pathname = usePathname();

  return (
    <div className="bg-gray-800 border-b border-gray-700 shadow-sm">
      {/* Back Navigation */}
      <BackNavigation campaignId={campaignId} />

      {/* Main Header */}
      <div className="px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Campaign Icon */}
            <CampaignIcon campaignType={campaignType} />

            {/* Campaign Info */}
            <CampaignInfo campaign={campaign} campaignType={campaignType} />
          </div>

          {/* Actions */}
          <CampaignActions campaignId={campaignId} />
        </div>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs campaignId={campaignId} currentPath={pathname} />
    </div>
  );
};

export default CampaignHeaderBar;
