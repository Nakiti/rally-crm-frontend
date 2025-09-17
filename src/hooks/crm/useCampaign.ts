import * as campaignService from "@/lib/services/crm/campaign.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetCampaigns = () => {
    return useQuery({
        queryKey: ['crm', 'campaigns'],
        queryFn: campaignService.getCampaigns,
    })
}

export const useGetCampaignById = (id: string) => {
    return useQuery({
        queryKey: ['crm', 'campaigns', id],
        queryFn: () => campaignService.getCampaignById(id),
        enabled: !!id,
    })
}

/**
 * A custom hook (a "mutation") for creating a new campaign.
 * It provides functions to trigger the mutation and handles success/error states.
 */
export const useCreateCampaign = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: campaignService.createCampaign,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['crm', 'campaigns'] });
      },
    });
};

/**
 * A mutation hook for updating a campaign's page configuration.
 */
export const useUpdateCampaignPageConfig = (id: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: { pageConfig: object }) => campaignService.updateCampaignPageConfig(id, data),
      onSuccess: (updatedCampaign) => {
        queryClient.setQueryData(['crm', 'campaigns', id], updatedCampaign);
      },
    });
};