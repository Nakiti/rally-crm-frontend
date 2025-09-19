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
  organizationId: string;
  detailsLink: string;
  pageLinks: PageLink[];
  onPublish: () => void;
  onSave: () => void;
  onDeactivate: () => void;
  status?: string;
  hasUnsavedChanges?: boolean;
  isPublishing?: boolean;
  isSaving?: boolean;
  campaignType?: string;
  campaignDetails?: CampaignDetails;
}

export type CampaignType = "crowdfunding" | "ticketed-event" | "peer-to-peer" | "default";
export type CampaignStatus = "active" | "inactive" | "draft" | "unknown";
