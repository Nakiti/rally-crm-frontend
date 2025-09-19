import { 
  Megaphone, 
  Ticket, 
  Users, 
  FileText 
} from "lucide-react";
import { CampaignIconProps } from "./types";

const CampaignIcon: React.FC<CampaignIconProps> = ({ campaignType }) => {
  const getIconConfig = (type: string) => {
    switch (type) {
      case "crowdfunding":
        return {
          icon: Megaphone,
          bgColor: "bg-blue-900",
          borderColor: "border-blue-700",
          iconColor: "text-blue-300"
        };
      case "ticketed-event":
        return {
          icon: Ticket,
          bgColor: "bg-purple-900",
          borderColor: "border-purple-700",
          iconColor: "text-purple-300"
        };
      case "peer-to-peer":
        return {
          icon: Users,
          bgColor: "bg-green-900",
          borderColor: "border-green-700",
          iconColor: "text-green-300"
        };
      default:
        return {
          icon: FileText,
          bgColor: "bg-gray-700",
          borderColor: "border-gray-600",
          iconColor: "text-gray-300"
        };
    }
  };

  const config = getIconConfig(campaignType);
  const IconComponent = config.icon;

  return (
    <div className="flex-shrink-0">
      <div className={`w-16 h-16 ${config.bgColor} border ${config.borderColor} rounded-xl flex items-center justify-center`}>
        <IconComponent className={`h-8 w-8 ${config.iconColor}`} />
      </div>
    </div>
  );
};

export default CampaignIcon;
