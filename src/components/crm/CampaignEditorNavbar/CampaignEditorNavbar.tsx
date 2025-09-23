import React, { useState } from 'react';
import { CampaignEditorNavbarProps, CampaignType } from './types';
import BackButton from './BackButton';
import CampaignHeader from './CampaignHeader';
import ActionButtons from './ActionButtons';
import NavigationTabs from './NavigationTabs';
import PagesDropdown from './PagesDropdown';

const CampaignEditorNavbar: React.FC<CampaignEditorNavbarProps> = ({
  campaignId,
  detailsLink,
  pageLinks,
  status,
  campaignType = "crowdfunding",
  campaignDetails,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="border-b border-gray-700 bg-gray-800 text-white shadow-lg">
      <BackButton />

      <div className="flex items-center justify-between w-11/12 mx-auto py-4">
        <CampaignHeader 
          campaignType={campaignType as CampaignType}
          campaignDetails={campaignDetails}
          status={status}
        />

        <ActionButtons />
      </div>

      <NavigationTabs
        detailsLink={detailsLink}
        pageLinks={pageLinks}
        showDropdown={showDropdown}
        onToggleDropdown={handleToggleDropdown}
        onCloseDropdown={handleCloseDropdown}
      />

      <PagesDropdown 
        pageLinks={pageLinks}
        showDropdown={showDropdown}
      />
    </div>
  );
};

export default CampaignEditorNavbar;
