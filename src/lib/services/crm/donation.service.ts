import type { Donation, DonationsResponse, DonationFilters } from "@/lib/types";
import apiClient from "../../apiClient"

/**
 * Fetches the list of all donations for the organization.
 * The apiClient is configured to automatically send the Staff JWT.
 */
export const getDonations = async (filters?: DonationFilters): Promise<DonationsResponse> => {
    const response = await apiClient.get('/crm/donations', { params: filters });
    return response.data.data; // Backend wraps in { success: true, data: result }
};

/**
 * Fetches a single donation by its ID.
 * @param id - The ID of the donation to fetch.
 * @returns The donation.
 */
export const getDonationById = async (id: string): Promise<Donation> => {
    const response = await apiClient.get(`/crm/donations/${id}`);
    return response.data.data; // Backend wraps in { success: true, data: result }
};