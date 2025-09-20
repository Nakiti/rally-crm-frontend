import React, { useState } from 'react';
import { CampaignEditorNavbarProps, CampaignType } from './types';
import BackButton from './BackButton';
import CampaignHeader from './CampaignHeader';
import ActionButtons from './ActionButtons';
import NavigationTabs from './NavigationTabs';
import PagesDropdown from './PagesDropdown';

const CampaignEditorNavbar: React.FC<CampaignEditorNavbarProps> = ({
  campaignId,
  organizationId,
  detailsLink,
  pageLinks,
  onPublish,
  onSave,
  onDeactivate,
  status,
  hasUnsavedChanges = false,
  isPublishing = false,
  isSaving = false, 
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

        <ActionButtons
          status={status}
          hasUnsavedChanges={hasUnsavedChanges}
          isPublishing={isPublishing}
          isSaving={isSaving}
          onSave={onSave}
          onPublish={onPublish}
          onDeactivate={onDeactivate}
        />
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
