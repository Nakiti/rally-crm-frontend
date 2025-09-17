import apiClient from "@/lib/apiClient";
import type { 
  Organization, 
  CreateOrganizationData, 
  UpdateOrganizationData 
} from "@/lib/types";

/**
 * Creates a new organization.
 * @param data - The data for the new organization.
 * @returns The created organization.
 */
export const createOrganization = async (data: CreateOrganizationData): Promise<Organization> => {
  const response = await apiClient.post('/crm/organizations', data);
  return response.data;
};

/**
 * Fetches a specific organization by ID.
 * @param id - The ID of the organization to fetch.
 * @returns The organization.
 */
export const getOrganization = async (id: string): Promise<Organization> => {
  const response = await apiClient.get(`/crm/organizations/${id}`);
  return response.data;
};

/**
 * Updates a specific organization.
 * @param id - The ID of the organization to update.
 * @param data - The data for the update.
 * @returns The updated organization.
 */
export const updateOrganization = async (id: string, data: UpdateOrganizationData): Promise<Organization> => {
  const response = await apiClient.put(`/crm/organizations/${id}`, data);
  return response.data;
};

/**
 * Deletes a specific organization.
 * @param id - The ID of the organization to delete.
 * @returns The deleted organization.
 */
export const deleteOrganization = async (id: string): Promise<Organization> => {
  const response = await apiClient.delete(`/crm/organizations/${id}`);
  return response.data;
};

