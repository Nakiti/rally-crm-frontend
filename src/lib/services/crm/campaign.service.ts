import type { Campaign, CreateCampaignData, UpdateCampaignData, UpdatePageConfigData, UpdateCampaignDesignationsData, UpdateCampaignDesignationsResponse, UpdateCampaignQuestionsData, UpdateCampaignQuestionsResponse } from "@/lib/types";
import apiClient from "../../apiClient"

/**
 * Fetches the list of all campaigns for the organization.
 * The apiClient is configured to automatically send the Staff JWT.
 */
export const getCampaigns = async (): Promise<Campaign[]> => {
    const response = await apiClient.get('/crm/campaigns');
    return response.data.data;
};

/**
 * Fetches a single campaign by its ID.
 * @param id - The ID of the campaign to fetch.
 * @returns The campaign.
 */
export const getCampaignById = async (id: string): Promise<Campaign> => {
    const response = await apiClient.get(`/crm/campaigns/${id}`);
    console.log(response.data.data)
    return response.data.data;
};
  
/**
 * Creates a new campaign.
 * @param data - The data for the new campaign.
 * @returns The created campaign.
 */
export const createCampaign = async (data: CreateCampaignData): Promise<Campaign> => {
    const response = await apiClient.post('/crm/campaigns', data);
    return response.data.data;
};
  
/**
 * Updates a campaign's basic information.
 * @param id - The ID of the campaign to update.
 * @param data - The data for the update.
 * @returns The updated campaign.
 */
export const updateCampaign = async (id: string, data: UpdateCampaignData): Promise<Campaign> => {
    const response = await apiClient.patch(`/crm/campaigns/${id}`, data);
    return response.data.data;
};

/**
 * Updates the pageConfig JSON for a specific campaign.
 * @param id - The ID of the campaign to update.
 * @param data - The data for the update.
 * @returns The updated campaign.
 */
export const updateCampaignPageConfig = async (id: string, data: UpdatePageConfigData): Promise<Campaign> => {
    const response = await apiClient.patch(`/crm/campaigns/${id}/page-config`, data);
    return response.data.data;
};

/**
 * Fetches a single campaign by its ID with available designations.
 * @param id - The ID of the campaign to fetch.
 * @returns The campaign with available designations.
 */
export const getCampaignByIdWithDesignations = async (id: string): Promise<Campaign> => {
    const response = await apiClient.get(`/crm/campaigns/${id}/with-designations`);
    return response.data.data;
};

/**
 * Updates the designations available for a specific campaign.
 * @param id - The ID of the campaign to update.
 * @param data - The data containing the new designation IDs.
 * @returns The operation results (added, removed, total counts).
 */
export const updateCampaignDesignations = async (id: string, data: UpdateCampaignDesignationsData): Promise<UpdateCampaignDesignationsResponse> => {
    const response = await apiClient.patch(`/crm/campaigns/${id}/designations`, data);
    return response.data.data;
};

/**
 * Fetches a single campaign by its ID with questions.
 * @param id - The ID of the campaign to fetch.
 * @returns The campaign with questions.
 */
export const getCampaignByIdWithQuestions = async (id: string): Promise<Campaign> => {
    const response = await apiClient.get(`/crm/campaigns/${id}/with-questions`);
    return response.data.data;
};

/**
 * Updates the questions for a specific campaign (bulk operation).
 * @param id - The ID of the campaign to update.
 * @param data - The data containing the new questions.
 * @returns The operation results (added, updated, removed, total counts).
 */
export const updateCampaignQuestions = async (id: string, data: UpdateCampaignQuestionsData): Promise<UpdateCampaignQuestionsResponse> => {
    const response = await apiClient.patch(`/crm/campaigns/${id}/questions`, data);
    return response.data.data;
};