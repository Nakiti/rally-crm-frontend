import * as designationService from "@/lib/services/crm/designation.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  CreateDesignationData, 
  UpdateDesignationData 
} from "@/lib/types";

/**
 * Hook to fetch all designations for the organization.
 */
export const useGetDesignations = () => {
  return useQuery({
    queryKey: ['crm', 'designations'],
    queryFn: designationService.getDesignations,
  });
};

/**
 * Hook to create a new designation.
 */
export const useCreateDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: designationService.createDesignation,
    onSuccess: () => {
      // Invalidate and refetch designations
      queryClient.invalidateQueries({ 
        queryKey: ['crm', 'designations'] 
      });
    },
  });
};

/**
 * Hook to update a designation.
 * @param id - The ID of the designation to update.
 */
export const useUpdateDesignation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDesignationData) => 
      designationService.updateDesignation(id, data),
    onSuccess: (updatedDesignation) => {
      // Update the specific designation in the cache
      queryClient.setQueryData(
        ['crm', 'designations'],
        (oldDesignations: any) => {
          if (!oldDesignations) return oldDesignations;
          return oldDesignations.map((designation: any) => 
            designation.id === id ? updatedDesignation : designation
          );
        }
      );
    },
  });
};

/**
 * Hook to archive a designation.
 */
export const useArchiveDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: designationService.archiveDesignation,
    onSuccess: (archivedDesignation) => {
      // Update the designation in the cache to mark it as archived
      queryClient.setQueryData(
        ['crm', 'designations'],
        (oldDesignations: any) => {
          if (!oldDesignations) return oldDesignations;
          return oldDesignations.map((designation: any) => 
            designation.id === archivedDesignation.id ? archivedDesignation : designation
          );
        }
      );
    },
  });
};

