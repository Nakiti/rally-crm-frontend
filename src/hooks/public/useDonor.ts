import * as donorService from "@/lib/services/public/donor.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch donation history for the authenticated donor.
 */
export const useGetDonationHistory = () => {
  return useQuery({
    queryKey: ['public', 'donor', 'history'],
    queryFn: donorService.getDonationHistory,
    // Cache donation history for a reasonable time since it doesn't change frequently
    // staleTime: 2 * 60 * 1000, // 2 minutes
    // cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

