import * as campaignService from "@/lib/services/public/campaign.service";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { CreateDonationData } from "@/lib/types";

/**
 * Hook to fetch a public campaign by slug.
 * @param slug - The campaign slug.
 */
export const useGetPublicCampaign = (slug: string) => {
  return useQuery({
    queryKey: ['public', 'campaigns', slug],
    queryFn: () => campaignService.getPublicCampaign(slug),
    enabled: !!slug,
    // Cache public campaign data for longer since it doesn't change frequently
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

/**
 * Hook to create a donation for a campaign.
 * @param slug - The campaign slug.
 */
export const useCreateDonation = (slug: string) => {
  return useMutation({
    mutationFn: (data: CreateDonationData) => 
      campaignService.createDonation(slug, data),
    // Don't invalidate campaign data after donation since it doesn't change
    // The campaign data is read-only for public users
  });
};

