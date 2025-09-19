import { Campaign } from "@/lib/types";

export type CampaignType = "crowdfunding" | "ticketed-event" | "peer-to-peer" | "general";

export interface CampaignHeaderBarProps {
  campaignType: CampaignType;
  campaign: Campaign | null;
  campaignId: string;
}

export interface BackNavigationProps {
  campaignId: string;
}

export interface CampaignIconProps {
  campaignType: CampaignType;
}

export interface CampaignInfoProps {
  campaign: Campaign | null;
  campaignType: CampaignType;
}

export interface CampaignActionsProps {
  campaignId: string;
}

export interface NavigationTabsProps {
  campaignId: string;
  currentPath: string;
}

export interface NavigationLink {
  title: string;
  pathName: string;
}
