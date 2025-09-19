import { Target, Ticket, Users, FileText } from 'lucide-react';
import { CampaignType, CampaignStatus } from './types';

export const getCampaignIcon = (campaignType: CampaignType) => {
  const iconClass = "h-16 w-16 p-1 border-2 border-white rounded-sm";
  
  switch (campaignType) {
    case "crowdfunding":
      return <Target className={iconClass} />;
    case "ticketed-event":
      return <Ticket className={iconClass} />;
    case "peer-to-peer":
      return <Users className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
};

export const getStatusBadgeClass = (status?: string): string => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "draft":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-red-100 text-red-800";
  }
};

export const formatStatus = (status?: string): string => {
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";
};

export const isActiveTab = (pathname: string, targetPath: string): boolean => {
  return pathname.split("/")[5] === targetPath.split("/")[5];
};
