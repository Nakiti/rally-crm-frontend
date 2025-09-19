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
 * A "selector" hook specifically for the page editor.
 * It uses the data already fetched by `useGetCampaignById` and extracts
 * only the pageConfig portion.
 *
 * This does NOT trigger a new network request.
 */
export const useGetCampaignPageConfig = (id: string, pageSlug: string) => {
  return useQuery({
    queryKey: ['crm', 'campaigns', id], // It uses the EXACT SAME query key
    queryFn: () => campaignService.getCampaignById(id), // And the same fetch function
    enabled: !!id && !!pageSlug,
    // --- HERE is the magic ---
    // The 'select' option takes the full data object and returns a transformed piece of it.
    select: (campaign) => {
      // We are selecting the specific page's config from the main object.
      return (campaign.pageConfig as Record<string, any>)?.[pageSlug] || null;
    },
  });
};

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
 * A mutation hook for updating a campaign's basic information.
 */
export const useUpdateCampaign = (id: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: import("@/lib/types").UpdateCampaignData) => campaignService.updateCampaign(id, data),
      onSuccess: (updatedCampaign) => {
        queryClient.setQueryData(['crm', 'campaigns', id], updatedCampaign);
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

/**
 * Hook to get a campaign with its available designations
 * This is used by the designations page to get the campaign with its current designations
 */
export const useGetCampaignByIdWithDesignations = (id: string) => {
  return useQuery({
      queryKey: ['crm', 'campaigns', id, 'with-designations'],
      queryFn: () => campaignService.getCampaignByIdWithDesignations(id),
      enabled: !!id,
  })
}

/**
 * A mutation hook for updating a campaign's available designations.
 * This performs a bulk operation to add/remove designations from a campaign.
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

/**
 * Hook to get a campaign with its questions
 * This is used by the questions page to get the campaign with its current questions
 */
export const useGetCampaignByIdWithQuestions = (id: string) => {
  return useQuery({
      queryKey: ['crm', 'campaigns', id, 'with-questions'],
      queryFn: () => campaignService.getCampaignByIdWithQuestions(id),
      enabled: !!id,
  })
}

/**
 * A mutation hook for updating a campaign's questions (bulk operation).
 * This performs a bulk operation to add/update/remove questions from a campaign.
 */
export const useUpdateCampaignQuestions = (id: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: import("@/lib/types").UpdateCampaignQuestionsData) => 
        campaignService.updateCampaignQuestions(id, data),
      onSuccess: () => {
        // Invalidate campaign data to refetch with updated questions
        queryClient.invalidateQueries({ queryKey: ['crm', 'campaigns', id] });
        queryClient.invalidateQueries({ queryKey: ['crm', 'campaigns', id, 'with-questions'] });
        // Also invalidate the campaigns list in case it shows question counts
        queryClient.invalidateQueries({ queryKey: ['crm', 'campaigns'] });
        // Invalidate any question-related queries that might be affected
        queryClient.invalidateQueries({ queryKey: ['crm', 'campaigns', id, 'questions'] });
      },
    });
};