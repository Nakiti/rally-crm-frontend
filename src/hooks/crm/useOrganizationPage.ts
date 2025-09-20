import * as organizationPageService from "@/lib/services/crm/organizationPage.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Hook to fetch all organization pages for the organization.
 */
export const useGetOrganizationPages = () => {
    return useQuery({
        queryKey: ['crm', 'organization-pages'],
        queryFn: organizationPageService.getOrganizationPages,
    });
};

/**
 * Hook to fetch a single organization page by ID.
 * @param id - The organization page ID.
 */
export const useGetOrganizationPageById = (id: string) => {
    return useQuery({
        queryKey: ['crm', 'organization-pages', id],
        queryFn: () => organizationPageService.getOrganizationPageById(id),
        enabled: !!id,
    });
};

/**
 * Hook to fetch a single organization page by page type.
 * @param pageType - The page type.
 */
export const useGetOrganizationPageByType = (pageType: string) => {
    return useQuery({
        queryKey: ['crm', 'organization-pages', 'type', pageType],
        queryFn: () => organizationPageService.getOrganizationPageByType(pageType),
        enabled: !!pageType,
    });
};

/**
 * Hook to create a new organization page.
 */
export const useCreateOrganizationPage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: organizationPageService.createOrganizationPage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['crm', 'organization-pages'] });
        },
    });
};

/**
 * Hook to update an organization page.
 * @param id - The organization page ID.
 */
export const useUpdateOrganizationPage = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: import("@/lib/types").UpdateOrganizationPageData) => 
            organizationPageService.updateOrganizationPage(id, data),
        onSuccess: (updatedPage) => {
            queryClient.setQueryData(['crm', 'organization-pages', id], updatedPage);
            queryClient.invalidateQueries({ queryKey: ['crm', 'organization-pages'] });
        },
    });
};

/**
 * Hook to delete an organization page.
 */
export const useDeleteOrganizationPage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: organizationPageService.deleteOrganizationPage,
        onSuccess: (_, id) => {
            queryClient.removeQueries({ queryKey: ['crm', 'organization-pages', id] });
            queryClient.invalidateQueries({ queryKey: ['crm', 'organization-pages'] });
        },
    });
};

/**
 * Hook to get organization page content configuration.
 * @param id - The organization page ID.
 */
export const useGetOrganizationPageContentConfig = (id: string) => {
    return useQuery({
        queryKey: ['crm', 'organization-pages', id, 'content-config'],
        queryFn: () => organizationPageService.getOrganizationPageContentConfig(id),
        enabled: !!id,
    });
};

/**
 * Hook to update organization page content configuration.
 * @param id - The organization page ID.
 */
export const useUpdateOrganizationPageContentConfig = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { contentConfig: object }) => 
            organizationPageService.updateOrganizationPageContentConfig(id, data),
        onSuccess: (updatedPage) => {
            queryClient.setQueryData(['crm', 'organization-pages', id], updatedPage);
            queryClient.invalidateQueries({ queryKey: ['crm', 'organization-pages', id, 'content-config'] });
        },
    });
};
