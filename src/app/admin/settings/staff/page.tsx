"use client"

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetStaffForOrganization, useInviteStaffMember } from "@/hooks/crm/useStaff";
import { useGetCurrentUser } from "@/hooks/crm/useUser";
import StaffPageHeader from "@/components/crm/settings/StaffPageHeader";
import StaffTable from "@/components/crm/settings/StaffTable";
import AddStaffForm from "@/components/crm/settings/AddStaffForm";
import { ErrorModal } from "@/components/ui/ErrorModal";
import type { InviteStaffData, StaffRole, StaffMemberInfo } from "@/lib/types";

/*
   Component: StaffPage
   Description: renders staff management page and allows for staff to be invited and managed
*/
const StaffPage = () => {
   const queryClient = useQueryClient();
   const { data: staffMembers = [], isLoading, error } = useGetStaffForOrganization();
   const inviteStaffMutation = useInviteStaffMember();
   const [updatingStaffId, setUpdatingStaffId] = useState<string | null>(null);

   const handleInviteStaff = (data: InviteStaffData) => {
      inviteStaffMutation.mutate(data);
   };

   const handleUpdateRole = async (staffAccountId: string, role: StaffRole) => {
      setUpdatingStaffId(staffAccountId);
      // We need to use the service directly since we can't call hooks in event handlers
      const { updateStaffRole } = await import('@/lib/services/crm/staff.service');
      await updateStaffRole(staffAccountId, { role });
      // Trigger a refetch by invalidating the query
      queryClient.invalidateQueries({ queryKey: ['crm', 'staff'] });
      setUpdatingStaffId(null);
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
                  {error instanceof Error ? error.message : 'Failed to load staff members'}
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
         {inviteStaffMutation.error && (
            <ErrorModal 
               message={inviteStaffMutation.error instanceof Error ? inviteStaffMutation.error.message : 'Failed to invite staff member'} 
               onClose={() => inviteStaffMutation.reset()} 
            />
         )}
         
         <div className="p-6 max-w-6xl mx-auto">
            <StaffPageHeader />
            
            <div className="space-y-8">
               <StaffTable 
                  staffMembers={staffMembers}
                  onUpdateRole={handleUpdateRole}
                  isUpdating={updatingStaffId !== null}
               />
               
               <AddStaffForm 
                  onInviteStaff={handleInviteStaff}
                  isInviting={inviteStaffMutation.isPending}
               />
            </div>
         </div>
      </div>
   )
}

export default StaffPage