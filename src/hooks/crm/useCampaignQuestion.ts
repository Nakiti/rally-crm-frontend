import * as campaignQuestionService from "@/lib/services/crm/campaignQuestion.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  CreateCampaignQuestionData, 
  UpdateCampaignQuestionData 
} from "@/lib/types";

/**
 * Hook to fetch all questions for a specific campaign.
 * @param campaignId - The ID of the campaign to fetch questions for.
 */
export const useGetCampaignQuestions = (campaignId: string) => {
  return useQuery({
    queryKey: ['crm', 'campaigns', campaignId, 'questions'],
    queryFn: () => campaignQuestionService.getCampaignQuestions(campaignId),
    enabled: !!campaignId,
  });
};

/**
 * Hook to create a new campaign question.
 */
export const useCreateCampaignQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ campaignId, data }: { 
      campaignId: string; 
      data: CreateCampaignQuestionData 
    }) => campaignQuestionService.createCampaignQuestion(campaignId, data),
    onSuccess: (_, { campaignId }) => {
      // Invalidate and refetch campaign questions
      queryClient.invalidateQueries({ 
        queryKey: ['crm', 'campaigns', campaignId, 'questions'] 
      });
    },
  });
};

/**
 * Hook to update a campaign question.
 * @param campaignId - The ID of the campaign.
 * @param questionId - The ID of the question to update.
 */
export const useUpdateCampaignQuestion = (campaignId: string, questionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCampaignQuestionData) => 
      campaignQuestionService.updateCampaignQuestion(campaignId, questionId, data),
    onSuccess: (updatedQuestion) => {
      // Update the specific question in the cache
      queryClient.setQueryData(
        ['crm', 'campaigns', campaignId, 'questions'],
        (oldQuestions: any) => {
          if (!oldQuestions) return oldQuestions;
          return oldQuestions.map((question: any) => 
            question.id === questionId ? updatedQuestion : question
          );
        }
      );
    },
  });
};

/**
 * Hook to delete a campaign question.
 * @param campaignId - The ID of the campaign.
 */
export const useDeleteCampaignQuestion = (campaignId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId: string) => 
      campaignQuestionService.deleteCampaignQuestion(campaignId, questionId),
    onSuccess: (_, questionId) => {
      // Remove the question from the cache
      queryClient.setQueryData(
        ['crm', 'campaigns', campaignId, 'questions'],
        (oldQuestions: any) => {
          if (!oldQuestions) return oldQuestions;
          return oldQuestions.filter((question: any) => question.id !== questionId);
        }
      );
    },
  });
};

