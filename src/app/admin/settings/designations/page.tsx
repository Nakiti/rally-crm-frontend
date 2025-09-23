"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetDesignations, useCreateDesignation, useUpdateDesignation } from "@/hooks/crm/useDesignation";
import { DesignationsHeader } from "@/components/crm/settings/DesignationsHeader";
import { DesignationsTable } from "@/components/crm/settings/DesignationsTable";
import { AddDesignationForm } from "@/components/crm/settings/AddDesignationForm";
import { ErrorModal } from "@/components/ui/ErrorModal";
import type { CreateDesignationData, UpdateDesignationData } from "@/lib/types";

interface DesignationsPageProps {
  params: {
    organizationId: string;
  };
}

/*
   Component: DesignationsPage
   Description: renders designations management page and allows for designations to be created and managed
*/
const DesignationsPage: React.FC<DesignationsPageProps> = ({ params }) => {
  const { organizationId } = params;
  const queryClient = useQueryClient();
  const [updatingDesignationId, setUpdatingDesignationId] = useState<string | null>(null);

  // Use the new hooks architecture
  const { data: designations = [], isLoading, error } = useGetDesignations();
  const createDesignationMutation = useCreateDesignation();

  const handleCreateDesignation = async (data: CreateDesignationData) => {
    await createDesignationMutation.mutateAsync(data);
  };

  const handleUpdateDesignation = async (id: string, data: { name: string; goalAmount: number; status: string }) => {
    setUpdatingDesignationId(id);
    try {
      const updateData: UpdateDesignationData = {
        name: data.name,
        goalAmount: data.goalAmount,
        // Note: status field might need to be mapped to isArchived or similar based on your API
      };
      // TODO: frontend\src\hooks\crm\useDesignation.ts - Create a generic update hook that accepts id as parameter
      // The current useUpdateDesignation hook requires id to be passed during hook initialization
      // We need either: 1) A generic update hook, or 2) Modify the existing hook to accept id in the mutation function
      console.log("Update designation:", id, updateData);
      // Trigger a refetch by invalidating the query
      queryClient.invalidateQueries({ queryKey: ['crm', 'designations'] });
    } catch (err: any) {
      console.error("Failed to update designation:", err);
    } finally {
      setUpdatingDesignationId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load designations'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50">
      {createDesignationMutation.error && (
        <ErrorModal 
          message={createDesignationMutation.error instanceof Error ? createDesignationMutation.error.message : 'Failed to create designation'} 
          onClose={() => createDesignationMutation.reset()} 
        />
      )}
      
      <div className="p-6 max-w-6xl mx-auto">
        <DesignationsHeader organizationId={organizationId} />
        
        <div className="space-y-8">
          <DesignationsTable
            designations={designations}
            onUpdateDesignation={handleUpdateDesignation}
            isLoading={updatingDesignationId !== null}
          />

          <AddDesignationForm
            onSubmit={handleCreateDesignation}
            isLoading={createDesignationMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignationsPage;