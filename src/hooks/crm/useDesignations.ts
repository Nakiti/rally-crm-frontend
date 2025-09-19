import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as campaignService from "@/lib/services/crm/campaign.service";
import * as designationService from "@/lib/services/crm/designation.service";

/**
 * Hook to get all designations for the organization
 * This is used by the designations page to show all available designations
 */
export const useGetOrgDesignations = () => {
    return useQuery({
        queryKey: ['crm', 'designations'],
        queryFn: designationService.getDesignations,
    });
};

/**
 * Hook to get a campaign with its available designations
 * This is used by the designations page to get the campaign with its current designations
 */
export const useGetCampaignWithDesignations = (id: string) => {
    return useQuery({
        queryKey: ['crm', 'campaigns', id, 'with-designations'],
        queryFn: () => campaignService.getCampaignByIdWithDesignations(id),
        enabled: !!id,
    });
};

/**
 * Hook to update campaign designations
 * This performs a bulk operation to add/remove designations from a campaign
 */
export const useUpdateCampaignDesignations = (id: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: import("@/lib/types").UpdateCampaignDesignationsData) => 
        campaignService.updateCampaignDesignations(id, data),
      onSuccess: () => {
        // Invalidate campaign data to refetch with updated designations
        queryClient.invalidateQueries({ queryKey: ['crm', 'campaigns', id] });
        queryClient.invalidateQueries({ queryKey: ['crm', 'campaigns', id, 'with-designations'] });
        // Also invalidate the campaigns list in case it shows designation counts
        queryClient.invalidateQueries({ queryKey: ['crm', 'campaigns'] });
        // Invalidate any designation-related queries that might be affected
        queryClient.invalidateQueries({ queryKey: ['crm', 'designations'] });
      },
    });
};
