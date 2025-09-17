import apiClient from "@/lib/apiClient";
import type { 
  Designation, 
  CreateDesignationData, 
  UpdateDesignationData 
} from "@/lib/types";

/**
 * Fetches all designations for the organization.
 * @returns Array of designations.
 */
export const getDesignations = async (): Promise<Designation[]> => {
  const response = await apiClient.get('/crm/designations');
  return response.data;
};

/**
 * Creates a new designation.
 * @param data - The data for the new designation.
 * @returns The created designation.
 */
export const createDesignation = async (data: CreateDesignationData): Promise<Designation> => {
  const response = await apiClient.post('/crm/designations', data);
  return response.data;
};

/**
 * Updates a specific designation.
 * @param id - The ID of the designation to update.
 * @param data - The data for the update.
 * @returns The updated designation.
 */
export const updateDesignation = async (id: string, data: UpdateDesignationData): Promise<Designation> => {
  const response = await apiClient.put(`/crm/designations/${id}`, data);
  return response.data;
};

/**
 * Archives a designation (soft delete).
 * @param id - The ID of the designation to archive.
 * @returns The archived designation.
 */
export const archiveDesignation = async (id: string): Promise<Designation> => {
  const response = await apiClient.patch(`/crm/designations/${id}/archive`);
  return response.data;
};

