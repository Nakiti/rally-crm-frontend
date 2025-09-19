import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { CampaignActionsProps } from "./types";

const CampaignActions: React.FC<CampaignActionsProps> = ({ campaignId }) => {
  return (
    <div className="flex items-center gap-3">
      <Link 
        href={`/campaigns/${campaignId}/editor/details/about`} 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Edit Campaign
      </Link>
      <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200">
        <MoreVertical className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CampaignActions;
