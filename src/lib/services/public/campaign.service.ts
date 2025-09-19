import apiClient from "@/lib/apiClient";
import type { 
  PublicCampaign, 
  CreateDonationData, 
  CreateDonationResponse 
} from "@/lib/types";

/**
 * Fetches a public campaign by slug.
 * @param slug - The campaign slug.
 * @returns The public campaign data.
 */
export const getPublicCampaign = async (slug: string): Promise<PublicCampaign> => {
  const response = await apiClient.get(`/public/campaigns/${slug}`);
  return response.data.data;
};

/**
 * Creates a donation for a campaign.
 * @param slug - The campaign slug.
 * @param data - The donation data.
 * @returns The donation creation response.
 */
export const createDonation = async (
  slug: string, 
  data: CreateDonationData
): Promise<CreateDonationResponse> => {
  const response = await apiClient.post(`/public/campaigns/${slug}/donations`, data);
  return response.data.data;
};

