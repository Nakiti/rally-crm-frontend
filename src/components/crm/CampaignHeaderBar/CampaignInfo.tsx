import { CampaignInfoProps } from "./types";

const CampaignInfo: React.FC<CampaignInfoProps> = ({ campaign, campaignType }) => {
  const formatCampaignType = (type: string): string => {
    return type.replace('-', ' ');
  };

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold text-white mb-1">
        {campaign?.internalName || "Untitled Campaign"}
      </h1>
      {/* <p className="text-sm text-gray-400 capitalize">
        {campaign && formatCampaignType(campaign.type)} Campaign
      </p> */}
    </div>
  );
};

export default CampaignInfo;
