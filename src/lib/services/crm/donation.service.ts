import apiClient from "@/lib/apiClient";
import type { 
  Donation, 
  DonationFilters, 
  DonationsResponse 
} from "@/lib/types";

/**
 * Fetches all donations for the organization with optional filtering and pagination.
 * @param filters - Optional filters and pagination parameters.
 * @returns Paginated donations response.
 */
export const getDonations = async (filters?: DonationFilters): Promise<DonationsResponse> => {
  const params = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
  }
  
  const queryString = params.toString();
  const url = queryString ? `/crm/donations?${queryString}` : '/crm/donations';
  
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Fetches detailed information about a specific donation.
 * @param id - The ID of the donation to fetch.
 * @returns The donation with all associated data.
 */
export const getDonationDetails = async (id: string): Promise<Donation> => {
  const response = await apiClient.get(`/crm/donations/${id}`);
  return response.data;
};

