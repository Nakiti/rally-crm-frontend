import apiClient from "@/lib/apiClient";
import type { 
  Organization, 
  CreateOrganizationData, 
  UpdateOrganizationData,
  OrganizationCompletenessStatus,
  PublishSiteResponse,
  CheckCompletenessResponse
} from "@/lib/types";

/**
 * Creates a new organization.
 * @param data - The data for the new organization.
 * @returns The created organization.
 */
export const createOrganization = async (data: CreateOrganizationData): Promise<Organization> => {
  const response = await apiClient.post('/crm/organization', data);
  return response.data.data;
};

/**
 * Fetches a specific organization by ID.
 * @param id - The ID of the organization to fetch.
 * @returns The organization.
 */
export const getOrganization = async (id: string): Promise<Organization> => {
  const response = await apiClient.get(`/crm/organization/${id}`);
  return response.data.data;
};

/**
 * Fetches the current user's organization.
 * @returns The organization.
 */
export const getCurrentOrganization = async (): Promise<Organization> => {
  const response = await apiClient.get('/crm/organization/current');
  return response.data.data;
};

/**
 * Updates a specific organization.
 * @param id - The ID of the organization to update.
 * @param data - The data for the update.
 * @returns The updated organization.
 */
export const updateOrganization = async (id: string, data: UpdateOrganizationData): Promise<Organization> => {
  const response = await apiClient.put(`/crm/organization/${id}`, data);
  return response.data.data;
};

/**
 * Updates the current user's organization.
 * @param data - The data for the update.
 * @returns The updated organization.
 */
export const updateCurrentOrganization = async (data: UpdateOrganizationData): Promise<Organization> => {
  const response = await apiClient.put('/crm/organization/current', data);
  return response.data.data;
};

/**
 * Deletes a specific organization.
 * @param id - The ID of the organization to delete.
 * @returns The deleted organization.
 */
export const deleteOrganization = async (id: string): Promise<Organization> => {
  const response = await apiClient.delete(`/crm/organization/${id}`);
  return response.data.data;
};

// Organization Completeness Functions

/**
 * Checks and updates organization completeness status.
 * @returns The updated completeness status.
 */
export const checkOrganizationCompleteness = async (): Promise<CheckCompletenessResponse> => {
  const response = await apiClient.post('/crm/organization/current/check-completeness');
  return response.data.data;
};

/**
 * Gets detailed organization completeness status.
 * @returns The detailed completeness status.
 */
export const getOrganizationCompletenessStatus = async (): Promise<OrganizationCompletenessStatus> => {
  const response = await apiClient.get('/crm/organization/current/completeness-status');
  return response.data.data;
};

/**
 * Publishes the organization site after running final completeness check.
 * @returns The publish site response with publication details.
 */
export const publishSite = async (): Promise<PublishSiteResponse> => {
  const response = await apiClient.patch('/crm/organization/publish-site');
  return response.data.data;
};

