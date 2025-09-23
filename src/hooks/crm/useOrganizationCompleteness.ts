import * as organizationCompletenessService from "@/lib/services/crm/organizationCompleteness.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  OrganizationCompletenessStatus,
  PublishSiteResponse,
  CheckCompletenessResponse
} from "@/lib/types";

/**
 * Hook to get detailed organization completeness status.
 */
export const useGetOrganizationCompletenessStatus = () => {
  return useQuery({
    queryKey: ['crm', 'organizations', 'current', 'completeness-status'],
    queryFn: () => organizationCompletenessService.getOrganizationCompletenessStatus(),
  });
};

/**
 * Hook to check and update organization completeness status.
 */
export const useCheckOrganizationCompleteness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => organizationCompletenessService.checkOrganizationCompleteness(),
    onSuccess: (data: CheckCompletenessResponse) => {
      // Update the completeness status in the cache
      queryClient.setQueryData(
        ['crm', 'organizations', 'current', 'completeness-status'],
        (oldData: OrganizationCompletenessStatus | undefined) => {
          if (oldData) {
            return {
              ...oldData,
              isPubliclyActive: data.isPubliclyActive
            };
          }
          return oldData;
        }
      );

      // Also update the current organization's isPubliclyActive status
      queryClient.setQueryData(
        ['crm', 'organizations', 'current'],
        (oldData: any) => {
          if (oldData) {
            return {
              ...oldData,
              isPubliclyActive: data.isPubliclyActive
            };
          }
          return oldData;
        }
      );
    },
  });
};

/**
 * Hook to publish the organization site.
 */
export const usePublishSite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => organizationCompletenessService.publishSite(),
    onSuccess: (data: PublishSiteResponse) => {
      // Update the completeness status in the cache
      queryClient.setQueryData(
        ['crm', 'organizations', 'current', 'completeness-status'],
        (oldData: OrganizationCompletenessStatus | undefined) => {
          if (oldData) {
            return {
              ...oldData,
              isPubliclyActive: data.isPubliclyActive
            };
          }
          return oldData;
        }
      );

      // Also update the current organization's isPubliclyActive status
      queryClient.setQueryData(
        ['crm', 'organizations', 'current'],
        (oldData: any) => {
          if (oldData) {
            return {
              ...oldData,
              isPubliclyActive: data.isPubliclyActive
            };
          }
          return oldData;
        }
      );

      // Invalidate and refetch the completeness status to get the latest data
      queryClient.invalidateQueries({ 
        queryKey: ['crm', 'organizations', 'current', 'completeness-status'] 
      });
    },
  });
};

/**
 * Hook to get organization completeness status with automatic refetching.
 * Useful for real-time status updates.
 */
export const useOrganizationCompletenessStatus = (refetchInterval?: number) => {
  return useQuery({
    queryKey: ['crm', 'organizations', 'current', 'completeness-status'],
    queryFn: () => organizationCompletenessService.getOrganizationCompletenessStatus(),
    refetchInterval: refetchInterval || false,
    refetchOnWindowFocus: true,
  });
};
