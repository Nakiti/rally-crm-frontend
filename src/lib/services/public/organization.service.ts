import apiClient from "@/lib/apiClient";
import type { PublicOrganization } from "@/lib/types";

/**
 * Fetches a public organization by subdomain.
 * @param subdomain - The organization's subdomain.
 * @returns The public organization data.
 */
export const getOrganizationBySubdomain = async (subdomain: string): Promise<PublicOrganization> => {
  const response = await apiClient.get(`/public/organizations/subdomain/${subdomain}`);
  return response.data;
};

/**
 * Fetches a public organization by ID.
 * @param id - The organization's ID.
 * @returns The public organization data.
 */
export const getOrganizationById = async (id: string): Promise<PublicOrganization> => {
  const response = await apiClient.get(`/public/organizations/${id}`);
  return response.data;
};

