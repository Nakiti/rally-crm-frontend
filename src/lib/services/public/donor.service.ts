import apiClient from "@/lib/apiClient";
import type { PublicDonation } from "@/lib/types";

/**
 * Fetches donation history for the authenticated donor.
 * @returns Array of public donation data.
 */
export const getDonationHistory = async (): Promise<PublicDonation[]> => {
  const response = await apiClient.get('/public/donor/history');
  return response.data.data;
};

