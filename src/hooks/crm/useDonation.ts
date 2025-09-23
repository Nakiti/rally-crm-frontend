import * as donationService from "@/lib/services/crm/donation.service";
import { useQuery } from "@tanstack/react-query";
import type { DonationFilters } from "@/lib/types";

export const useGetDonations = (filters?: DonationFilters) => {
    return useQuery({
        queryKey: ['crm', 'donations', filters],
        queryFn: () => donationService.getDonations(filters),
    })
}

export const useGetDonationById = (id: string) => {
    return useQuery({
        queryKey: ['crm', 'donations', id],
        queryFn: () => donationService.getDonationById(id),
        enabled: !!id,
    })
}

export const useGetDonationsByCampaign = (campaignId: string) => {
    return useQuery({
        queryKey: ['crm', 'donations', 'campaign', campaignId],
        queryFn: () => donationService.getDonations({ campaignId }),
        enabled: !!campaignId,
    })
}

/**
 * Hook to fetch recent donations for the dashboard
 * @param limit - Maximum number of donations to return (default: 5)
 * @returns React Query result with recent donations data
 */
export const useGetRecentDonations = (limit: number = 5) => {
    return useQuery({
        queryKey: ['crm', 'donations', 'recent', limit],
        queryFn: () => donationService.getRecentDonations(limit),
    });
};