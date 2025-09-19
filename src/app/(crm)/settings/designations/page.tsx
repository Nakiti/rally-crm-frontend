"use client";

import { useState } from "react";
import { useGetDesignations, useCreateDesignation, useUpdateDesignation } from "@/hooks/crm/useDesignation";
import { DesignationsHeader } from "@/components/crm/settings/DesignationsHeader";
import { DesignationsTable } from "@/components/crm/settings/DesignationsTable";
import { AddDesignationForm } from "@/components/crm/settings/AddDesignationForm";
import ErrorModal from "@/components/ui/ErrorModal";
import type { CreateDesignationData, UpdateDesignationData } from "@/lib/types";

interface DesignationsPageProps {
  params: {
    organizationId: string;
  };
}

const DesignationsPage: React.FC<DesignationsPageProps> = ({ params }) => {
  const { organizationId } = params;
  const [error, setError] = useState<string | null>(null);

  // Use the new hooks architecture
  const { data: designations = [], isLoading: isLoadingDesignations, error: designationsError } = useGetDesignations();
  const createDesignationMutation = useCreateDesignation();

  // Handle errors from hooks
  if (designationsError) {
    setError(designationsError.message || "Failed to load designations");
  }

  const handleCreateDesignation = async (data: CreateDesignationData) => {
    try {
      await createDesignationMutation.mutateAsync(data);
    } catch (err: any) {
      setError(err.message || "Failed to create designation");
    }
  };

  const handleUpdateDesignation = async (id: string, data: { name: string; goalAmount: number; status: string }) => {
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
    } catch (err: any) {
      setError(err.message || "Failed to update designation");
    }
  };

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {error && (
        <ErrorModal 
          message={error} 
          onClose={() => setError(null)} 
        />
      )}
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DesignationsHeader organizationId={organizationId} />

            <div className="space-y-8">
          <DesignationsTable
            designations={designations}
            onUpdateDesignation={handleUpdateDesignation}
            isLoading={isLoadingDesignations}
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