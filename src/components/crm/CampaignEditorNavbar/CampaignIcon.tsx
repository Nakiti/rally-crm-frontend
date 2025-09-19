import React from 'react';
import { getCampaignIcon } from './utils';
import { CampaignType } from './types';

interface CampaignIconProps {
  campaignType: CampaignType;
}

const CampaignIcon: React.FC<CampaignIconProps> = ({ campaignType }) => {
  return (
    <div className="mr-4">
      {getCampaignIcon(campaignType)}
    </div>
  );
};

export default CampaignIcon;
