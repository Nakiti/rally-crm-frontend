import React from 'react';
import { CampaignType, CampaignDetails } from './types';
import CampaignIcon from './CampaignIcon';
import StatusBadge from './StatusBadge';

interface CampaignHeaderProps {
  campaignType: CampaignType;
  campaignDetails?: CampaignDetails;
  status?: string;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  campaignType,
  campaignDetails,
  status,
}) => {
  return (
    <div className="flex items-center">
      <CampaignIcon campaignType={campaignType} />
      <div className="flex flex-col text-gray-100">
        <p className="text-xs font-semibold text-gray-300">Edit Campaign</p>
        <h1 className="text-xl font-semibold text-white truncate max-w-md">
          {campaignDetails?.internalName || "Untitled Campaign"}
        </h1>
        <div className="flex items-center mt-1 space-x-2">
          <p className="text-sm font-medium text-gray-400 capitalize">
            {campaignType.replace("-", " ")}
          </p>
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;
