import apiClient from "@/lib/apiClient";
import type { 
  OrganizationCompletenessStatus,
  PublishSiteResponse,
  CheckCompletenessResponse
} from "@/lib/types";

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
