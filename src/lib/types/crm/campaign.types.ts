export interface Campaign {
    id: string;
    organizationId: string;
    defaultDesignationId: string | null;
    title: string;
    slug: string;
    goalAmount: number;
    bannerImageUrl: string | null;
    pageConfig: object | null; // You could define a more specific type for this later
    isActive: boolean;
    createdAt: string; // Dates are typically serialized as ISO strings over JSON
    updatedAt: string;
}

// Define the shape of the data needed to create a new campaign
export interface CreateCampaignData {
    title: string;
    goalAmount: number;
}
  
// Define the shape of the data for updating a campaign's page config
export interface UpdatePageConfigData {
    pageConfig: object;
}