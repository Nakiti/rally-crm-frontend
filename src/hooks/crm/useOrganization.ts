import * as organizationService from "@/lib/services/crm/organization.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  CreateOrganizationData, 
  UpdateOrganizationData 
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

