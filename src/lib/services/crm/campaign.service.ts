import apiClient from "@/lib/apiClient.js";
import type { Campaign, CreateCampaignData, UpdatePageConfigData } from "@/lib/types";


/**
 * Fetches the list of all campaigns for the organization.
 * The apiClient is configured to automatically send the Staff JWT.
 */
export const getCampaigns = async (): Promise<Campaign[]> => {
    const response = await apiClient.get('/crm/campaigns');
    return response.data;
};

/**
 * Fetches a single campaign by its ID.
 * @param id - The ID of the campaign to fetch.
 * @returns The campaign.
 */
export const getCampaignById = async (id: string): Promise<Campaign> => {
    const response = await apiClient.get(`/crm/campaigns/${id}`);
    return response.data;
};
  
/**
 * Creates a new campaign.
 * @param data - The data for the new campaign.
 * @returns The created campaign.
 */
export const createCampaign = async (data: CreateCampaignData): Promise<Campaign> => {
    const response = await apiClient.post('/crm/campaigns', data);
    return response.data;
};
  
/**
 * Updates the pageConfig JSON for a specific campaign.
 * @param id - The ID of the campaign to update.
 * @param data - The data for the update.
 * @returns The updated campaign.
 */
export const updateCampaignPageConfig = async (id: string, data: UpdatePageConfigData): Promise<Campaign> => {
    const response = await apiClient.patch(`/crm/campaigns/${id}/page-config`, data);
    return response.data;
};