'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetCampaignByIdWithQuestions, useUpdateCampaignQuestions } from '@/hooks/crm/useCampaign';
import { QuestionForm, QuestionsList } from '@/components/crm/questions';
import type { CampaignQuestion, CreateCampaignQuestionData } from '@/lib/types';

export default function QuestionsPage() {
  const params = useParams();
  const campaignId = params.id as string;

  // Fetch the campaign with its current questions
  const { data: campaignWithQuestions, isLoading: isLoadingCampaign } = useGetCampaignByIdWithQuestions(campaignId);
  
  // Get the mutation hook for saving the changes
  const updateMutation = useUpdateCampaignQuestions(campaignId);

  // Local state for managing questions before saving
  const [localQuestions, setLocalQuestions] = useState<CampaignQuestion[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Sync local state when campaign data loads
  useEffect(() => {
    if (campaignWithQuestions?.questions) {
      setLocalQuestions(campaignWithQuestions.questions);
    }
  }, [campaignWithQuestions?.questions]);

  const handleAddQuestion = (questionData: CreateCampaignQuestionData) => {
    const newQuestion: CampaignQuestion = {
      id: `temp-${Date.now()}`, // Temporary ID for new questions
      campaignId,
      questionText: questionData.questionText,
      questionType: questionData.questionType,
      options: questionData.options || null,
      isRequired: questionData.isRequired || false,
      displayOrder: localQuestions.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setLocalQuestions([...localQuestions, newQuestion]);
    setShowForm(false);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setLocalQuestions(localQuestions.filter(q => q.id !== questionId));
  };

  const handleEditQuestion = (question: CampaignQuestion) => {
    // For now, we'll implement a simple edit by removing and re-adding
    // In a more sophisticated implementation, you might want a separate edit form
    handleDeleteQuestion(question.id);
    // You could set the form to edit mode here
  };

  // Check if there are changes to save
  const hasChanges = JSON.stringify(localQuestions) !== JSON.stringify(campaignWithQuestions?.questions || []);

  const handleSave = () => {
    // Convert local questions to the format expected by the API
    const questionsToSave = localQuestions.map(q => ({
      id: q.id.startsWith('temp-') ? undefined : q.id, // Remove temp IDs for new questions
      questionText: q.questionText,
      questionType: q.questionType,
      options: q.options,
      isRequired: q.isRequired,
      displayOrder: q.displayOrder,
    }));

    updateMutation.mutate(
      { questions: questionsToSave },
      {
        onSuccess: () => {
          // The query will automatically refetch and update the UI
        },
      }
    );
  };

  // Show loading state while data is being fetched
  if (isLoadingCampaign) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8 px-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-4xl font-light text-gray-900 mb-4">Questions</h1>
      <h3 className="text-md text-gray-600 mb-8">Create custom questions to ask donors during the donation process:</h3>
      
      {/* Add Question Form */}
      {showForm ? (
        <QuestionForm
          onSubmit={handleAddQuestion}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add New Question
          </button>
        </div>
      )}

      {/* Questions List */}
      <QuestionsList
        questions={localQuestions}
        onEdit={handleEditQuestion}
        onDelete={handleDeleteQuestion}
      />

      {/* Save Button */}
      <div className="w-full flex flex-row mt-6">
        <button 
          className={`ml-auto ${!hasChanges ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"} px-6 py-3 w-40 rounded-md shadow-sm text-md text-white`}
          onClick={handleSave}
          disabled={!hasChanges || updateMutation.isPending}
        >
          {updateMutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
