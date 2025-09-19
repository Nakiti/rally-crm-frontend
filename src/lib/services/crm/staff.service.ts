import apiClient from "@/lib/apiClient";
import type { 
  StaffMember, 
  InviteStaffData, 
  UpdateStaffRoleData 
} from "@/lib/types";

/**
 * Fetches all staff members for the authenticated user's organization.
 * @returns Array of staff members.
 */
export const getStaffForOrganization = async (): Promise<StaffMember[]> => {
  const response = await apiClient.get('/crm/staff');
  return response.data.data;
};

/**
 * Invites a new staff member to the organization.
 * @param data - The data for inviting a staff member.
 * @returns The invited staff member.
 */
export const inviteStaffMember = async (data: InviteStaffData): Promise<StaffMember> => {
  const response = await apiClient.post('/crm/staff/invite', data);
  return response.data.data;
};

/**
 * Updates a staff member's role within the organization.
 * @param staffAccountId - The ID of the staff account to update.
 * @param data - The data for the role update.
 * @returns The updated staff member.
 */
export const updateStaffRole = async (staffAccountId: string, data: UpdateStaffRoleData): Promise<StaffMember> => {
  const response = await apiClient.patch(`/crm/staff/${staffAccountId}`, data);
  return response.data.data;
};

/**
 * Removes a staff member from the organization.
 * @param staffAccountId - The ID of the staff account to remove.
 * @returns The removed staff member.
 */
export const removeStaffFromOrganization = async (staffAccountId: string): Promise<StaffMember> => {
  const response = await apiClient.delete(`/crm/staff/${staffAccountId}`);
  return response.data.data;
};

