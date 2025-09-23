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

export interface RecentDonation {
    id: string;
    donorName: string;
    campaignName: string;
    amount: number;
    donatedAt: string; // ISO date string
}

/**
 * Fetches recent donations for the organization.
 * @param limit - Maximum number of donations to return (default: 5)
 * @returns Array of recent donations
 */
export const getRecentDonations = async (limit: number = 5): Promise<RecentDonation[]> => {
    const response = await apiClient.get('/crm/donations/recent', { 
        params: { limit } 
    });
    return response.data; // Backend returns array directly
};