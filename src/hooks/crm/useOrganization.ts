import * as organizationService from "@/lib/services/crm/organization.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  CreateOrganizationData, 
  UpdateOrganizationData,
  OrganizationCompletenessStatus,
  PublishSiteResponse,
  CheckCompletenessResponse
} from "@/lib/types";

/**
 * Hook to fetch a specific organization by ID.
 * @param id - The ID of the organization to fetch.
 */
export const useGetOrganization = (id: string) => {
  return useQuery({
    queryKey: ['crm', 'organizations', id],
    queryFn: () => organizationService.getOrganization(id),
    enabled: !!id,
  });
};

/**
 * Hook to fetch the current user's organization.
 */
export const useGetCurrentOrganization = () => {
  return useQuery({
    queryKey: ['crm', 'organizations', 'current'],
    queryFn: () => organizationService.getCurrentOrganization(),
  });
};

/**
 * Hook to create a new organization.
 */
export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: organizationService.createOrganization,
    onSuccess: (newOrganization) => {
      // Add the new organization to the cache
      queryClient.setQueryData(['crm', 'organizations', newOrganization.id], newOrganization);
    },
  });
};

/**
 * Hook to update an organization.
 * @param id - The ID of the organization to update.
 */
export const useUpdateOrganization = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrganizationData) => 
      organizationService.updateOrganization(id, data),
    onSuccess: (updatedOrganization) => {
      // Update the organization in the cache
      queryClient.setQueryData(['crm', 'organizations', id], updatedOrganization);
    },
  });
};

/**
 * Hook to update the current user's organization.
 */
export const useUpdateCurrentOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateOrganizationData) => 
      organizationService.updateCurrentOrganization(data),
    onSuccess: (updatedOrganization) => {
      // Update the current organization in the cache
      queryClient.setQueryData(['crm', 'organizations', 'current'], updatedOrganization);
    },
  });
};

/**
 * Hook to delete an organization.
 * @param id - The ID of the organization to delete.
 */
export const useDeleteOrganization = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => organizationService.deleteOrganization(id),
    onSuccess: () => {
      // Remove the organization from the cache
      queryClient.removeQueries({ queryKey: ['crm', 'organizations', id] });
    },
  });
};

// Organization Completeness Hooks

/**
 * Hook to get detailed organization completeness status.
 */
export const useGetOrganizationCompletenessStatus = () => {
  return useQuery({
    queryKey: ['crm', 'organizations', 'current', 'completeness-status'],
    queryFn: () => organizationService.getOrganizationCompletenessStatus(),
  });
};

/**
 * Hook to check and update organization completeness status.
 */
export const useCheckOrganizationCompleteness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => organizationService.checkOrganizationCompleteness(),
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
    mutationFn: () => organizationService.publishSite(),
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

