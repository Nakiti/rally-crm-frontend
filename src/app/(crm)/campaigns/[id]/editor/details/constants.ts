import type { NavigationItem } from "./types";

export const getNavigationLinks = (campaignId: string): NavigationItem[] => [
  { title: "About", path: `/campaigns/${campaignId}/editor/details/about` },
  { title: "Settings", path: `/campaigns/${campaignId}/editor/details/settings` },
  // TODO: Add conditional ticket link based on campaign type
  // campaignType === "ticketed-event" ? { title: "Tickets", path: `/campaigns/${campaignId}/editor/details/tickets` } : null,
  { title: "Designations", path: `/campaigns/${campaignId}/editor/details/designations` },
  { title: "Questions", path: `/campaigns/${campaignId}/editor/details/questions` },
  { title: "Contact", path: `/campaigns/${campaignId}/editor/details/contact` },
  { title: "Sharing", path: `/campaigns/${campaignId}/editor/details/sharing` },
  { title: "FAQs", path: `/campaigns/${campaignId}/editor/details/faqs` },
];
