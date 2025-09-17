import * as staffService from "@/lib/services/crm/staff.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  InviteStaffData, 
  UpdateStaffRoleData 
} from "@/lib/types";

/**
 * Hook to fetch all staff members for the organization.
 */
export const useGetStaffForOrganization = () => {
  return useQuery({
    queryKey: ['crm', 'staff'],
    queryFn: staffService.getStaffForOrganization,
  });
};

/**
 * Hook to invite a new staff member to the organization.
 */
export const useInviteStaffMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.inviteStaffMember,
    onSuccess: () => {
      // Invalidate and refetch staff list
      queryClient.invalidateQueries({ 
        queryKey: ['crm', 'staff'] 
      });
    },
  });
};

/**
 * Hook to update a staff member's role.
 * @param staffAccountId - The ID of the staff account to update.
 */
export const useUpdateStaffRole = (staffAccountId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateStaffRoleData) => 
      staffService.updateStaffRole(staffAccountId, data),
    onSuccess: (updatedStaffMember) => {
      // Update the staff member in the cache
      queryClient.setQueryData(
        ['crm', 'staff'],
        (oldStaffMembers: any) => {
          if (!oldStaffMembers) return oldStaffMembers;
          return oldStaffMembers.map((staffMember: any) => 
            staffMember.staffAccountId === staffAccountId ? updatedStaffMember : staffMember
          );
        }
      );
    },
  });
};

/**
 * Hook to remove a staff member from the organization.
 */
export const useRemoveStaffFromOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.removeStaffFromOrganization,
    onSuccess: (_, staffAccountId) => {
      // Remove the staff member from the cache
      queryClient.setQueryData(
        ['crm', 'staff'],
        (oldStaffMembers: any) => {
          if (!oldStaffMembers) return oldStaffMembers;
          return oldStaffMembers.filter((staffMember: any) => 
            staffMember.staffAccountId !== staffAccountId
          );
        }
      );
    },
  });
};

