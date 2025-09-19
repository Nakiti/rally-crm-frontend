// Main component
export { default as CampaignHeaderBar } from "./CampaignHeaderBar";

// Sub-components (exported for potential reuse)
export { default as BackNavigation } from "./BackNavigation";
export { default as CampaignIcon } from "./CampaignIcon";
export { default as CampaignInfo } from "./CampaignInfo";
export { default as CampaignActions } from "./CampaignActions";
export { default as NavigationTabs } from "./NavigationTabs";

// Types
export type {
  CampaignType,
  CampaignHeaderBarProps,
  BackNavigationProps,
  CampaignIconProps,
  CampaignInfoProps,
  CampaignActionsProps,
  NavigationTabsProps,
  NavigationLink
} from "./types";
