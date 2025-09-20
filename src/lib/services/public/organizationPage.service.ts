import apiClient from "@/lib/apiClient";
import type { PublicOrganizationPage } from "@/lib/types";

/**
 * Fetches a public organization page by organization ID and page type.
 * @param organizationId - The organization's ID.
 * @param pageType - The page type to fetch.
 * @returns The public organization page data.
 */
export const getOrganizationPageByType = async (organizationId: string, pageType: string): Promise<PublicOrganizationPage> => {
  const response = await apiClient.get(`/public/organizations/${organizationId}/pages/type/${pageType}`);
  return response.data.data;
};

/**
 * Fetches a public organization page by organization subdomain and page type.
 * @param subdomain - The organization's subdomain.
 * @param pageType - The page type to fetch.
 * @returns The public organization page data.
 */
export const getOrganizationPageBySubdomainAndType = async (subdomain: string, pageType: string): Promise<PublicOrganizationPage> => {
  const response = await apiClient.get(`/public/organizations/subdomain/${subdomain}/pages/type/${pageType}`);
  return response.data.data;
};

/**
 * Fetches all public organization pages for an organization by ID.
 * @param organizationId - The organization's ID.
 * @returns Array of public organization pages.
 */
export const getOrganizationPages = async (organizationId: string): Promise<PublicOrganizationPage[]> => {
  const response = await apiClient.get(`/public/organizations/${organizationId}/pages`);
  return response.data.data;
};

/**
 * Fetches all public organization pages for an organization by subdomain.
 * @param subdomain - The organization's subdomain.
 * @returns Array of public organization pages.
 */
export const getOrganizationPagesBySubdomain = async (subdomain: string): Promise<PublicOrganizationPage[]> => {
  const response = await apiClient.get(`/public/organizations/subdomain/${subdomain}/pages`);
  return response.data.data;
};
