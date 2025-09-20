import type { OrganizationPage, CreateOrganizationPageData, UpdateOrganizationPageData, UpdateContentConfigData } from "@/lib/types";
import apiClient from "../../apiClient"

/**
 * Fetches the list of all organization pages for the organization.
 * The apiClient is configured to automatically send the Staff JWT.
 */
export const getOrganizationPages = async (): Promise<OrganizationPage[]> => {
    const response = await apiClient.get('/crm/organization-pages');
    return response.data.data;
};

/**
 * Fetches a single organization page by its ID.
 * @param id - The ID of the organization page to fetch.
 * @returns The organization page.
 */
export const getOrganizationPageById = async (id: string): Promise<OrganizationPage> => {
    const response = await apiClient.get(`/crm/organization-pages/${id}`);
    return response.data.data;
};

/**
 * Fetches a single organization page by its page type.
 * @param pageType - The page type to fetch.
 * @returns The organization page.
 */
export const getOrganizationPageByType = async (pageType: string): Promise<OrganizationPage> => {
    const response = await apiClient.get(`/crm/organization-pages/type/${pageType}`);
    return response.data.data;
};

/**
 * Creates a new organization page.
 * @param data - The data for the new organization page.
 * @returns The created organization page.
 */
export const createOrganizationPage = async (data: CreateOrganizationPageData): Promise<OrganizationPage> => {
    const response = await apiClient.post('/crm/organization-pages', data);
    return response.data.data;
};

/**
 * Updates an organization page's basic information.
 * @param id - The ID of the organization page to update.
 * @param data - The data for the update.
 * @returns The updated organization page.
 */
export const updateOrganizationPage = async (id: string, data: UpdateOrganizationPageData): Promise<OrganizationPage> => {
    const response = await apiClient.put(`/crm/organization-pages/${id}`, data);
    return response.data.data;
};

/**
 * Deletes an organization page.
 * @param id - The ID of the organization page to delete.
 */
export const deleteOrganizationPage = async (id: string): Promise<void> => {
    await apiClient.delete(`/crm/organization-pages/${id}`);
};

/**
 * Gets the content configuration for a specific organization page.
 * @param id - The ID of the organization page.
 * @returns The content configuration.
 */
export const getOrganizationPageContentConfig = async (id: string): Promise<object | null> => {
    const response = await apiClient.get(`/crm/organization-pages/${id}/content-config`);
    return response.data.data;
};

/**
 * Updates the content configuration for a specific organization page.
 * @param id - The ID of the organization page to update.
 * @param data - The content configuration data.
 * @returns The updated organization page.
 */
export const updateOrganizationPageContentConfig = async (id: string, data: UpdateContentConfigData): Promise<OrganizationPage> => {
    const response = await apiClient.put(`/crm/organization-pages/${id}/content-config`, data);
    return response.data.data;
};
