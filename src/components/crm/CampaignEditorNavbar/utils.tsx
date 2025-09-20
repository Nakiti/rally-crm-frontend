import { Target, Ticket, Users, FileText } from 'lucide-react';
import { CampaignType, CampaignStatus } from './types';

export const getCampaignIcon = (campaignType: CampaignType) => {
  const iconClass = "h-12 w-12 p-2 border-2 border-gray-300 rounded-lg text-gray-300";
  
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
      return "bg-green-900/30 text-green-400 border border-green-500/30";
    case "inactive":
      return "bg-gray-700/30 text-gray-400 border border-gray-500/30";
    case "draft":
      return "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30";
    default:
      return "bg-red-900/30 text-red-400 border border-red-500/30";
  }
};

export const formatStatus = (status?: string): string => {
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";
};

export const isActiveTab = (pathname: string, targetPath: string): boolean => {
  console.log(pathname, targetPath)
  return pathname.split("/")[4] === targetPath.split("/")[4];
};
