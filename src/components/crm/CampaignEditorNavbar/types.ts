export interface PageLink {
  path: string;
  title: string;
  link: string;
}

export interface CampaignDetails {
  internalName?: string;
}

export interface CampaignEditorNavbarProps {
  campaignId: string;
  detailsLink: string;
  pageLinks: PageLink[];
  status?: string;
  campaignType?: string;
  campaignDetails?: CampaignDetails;
}

export type CampaignType = "crowdfunding" | "ticketed-event" | "peer-to-peer" | "default";
export type CampaignStatus = "active" | "inactive" | "draft" | "unknown";
