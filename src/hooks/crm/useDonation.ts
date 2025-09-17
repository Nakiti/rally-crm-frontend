import * as donationService from "@/lib/services/crm/donation.service";
import { useQuery } from "@tanstack/react-query";
import type { DonationFilters } from "@/lib/types";

/**
 * Hook to fetch all donations for the organization with optional filtering and pagination.
 * @param filters - Optional filters and pagination parameters.
 */
export const useGetDonations = (filters?: DonationFilters) => {
  return useQuery({
    queryKey: ['crm', 'donations', filters],
    queryFn: () => donationService.getDonations(filters),
    // Keep previous data while fetching new data for better UX
    keepPreviousData: true,
  });
};

/**
 * Hook to fetch detailed information about a specific donation.
 * @param id - The ID of the donation to fetch.
 */
export const useGetDonationDetails = (id: string) => {
  return useQuery({
    queryKey: ['crm', 'donations', id],
    queryFn: () => donationService.getDonationDetails(id),
    enabled: !!id,
  });
};

