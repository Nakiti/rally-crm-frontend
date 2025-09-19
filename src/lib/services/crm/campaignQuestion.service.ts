import apiClient from "@/lib/apiClient";
import type { 
  CampaignQuestion, 
  CreateCampaignQuestionData, 
  UpdateCampaignQuestionData 
} from "@/lib/types";

/**
 * Fetches all questions for a specific campaign.
 * @param campaignId - The ID of the campaign to fetch questions for.
 * @returns Array of campaign questions.
 */
export const getCampaignQuestions = async (campaignId: string): Promise<CampaignQuestion[]> => {
  const response = await apiClient.get(`/crm/campaigns/${campaignId}/questions`);
  return response.data.data;
};

/**
 * Creates a new question for a campaign.
 * @param campaignId - The ID of the campaign to add the question to.
 * @param data - The data for the new question.
 * @returns The created campaign question.
 */
export const createCampaignQuestion = async (
  campaignId: string, 
  data: CreateCampaignQuestionData
): Promise<CampaignQuestion> => {
  const response = await apiClient.post(`/crm/campaigns/${campaignId}/questions`, data);
  return response.data.data;
};

/**
 * Updates a specific campaign question.
 * @param campaignId - The ID of the campaign.
 * @param questionId - The ID of the question to update.
 * @param data - The data for the update.
 * @returns The updated campaign question.
 */
export const updateCampaignQuestion = async (
  campaignId: string,
  questionId: string,
  data: UpdateCampaignQuestionData
): Promise<CampaignQuestion> => {
  const response = await apiClient.put(`/crm/campaigns/${campaignId}/questions/${questionId}`, data);
  return response.data.data;
};

/**
 * Deletes a specific campaign question.
 * @param campaignId - The ID of the campaign.
 * @param questionId - The ID of the question to delete.
 * @returns The deleted campaign question.
 */
export const deleteCampaignQuestion = async (
  campaignId: string,
  questionId: string
): Promise<CampaignQuestion> => {
  const response = await apiClient.delete(`/crm/campaigns/${campaignId}/questions/${questionId}`);
  return response.data.data;
};

