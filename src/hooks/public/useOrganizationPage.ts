import * as organizationPageService from "@/lib/services/public/organizationPage.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch a public organization page by organization ID and page type.
 * @param organizationId - The organization's ID.
 * @param pageType - The page type.
 */
export const useGetOrganizationPageByType = (organizationId: string, pageType: string) => {
  return useQuery({
    queryKey: ['public', 'organization-pages', organizationId, 'type', pageType],
    queryFn: () => organizationPageService.getOrganizationPageByType(organizationId, pageType),
    enabled: !!organizationId && !!pageType,
    // Cache organization page data for longer since it doesn't change frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};

/**
 * Hook to fetch a public organization page by organization subdomain and page type.
 * @param subdomain - The organization's subdomain.
 * @param pageType - The page type.
 */
export const useGetOrganizationPageBySubdomainAndType = (subdomain: string, pageType: string) => {
  return useQuery({
    queryKey: ['public', 'organization-pages', 'subdomain', subdomain, 'type', pageType],
    queryFn: () => organizationPageService.getOrganizationPageBySubdomainAndType(subdomain, pageType),
    enabled: !!subdomain && !!pageType,
    // Cache organization page data for longer since it doesn't change frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};

/**
 * Hook to fetch all public organization pages for an organization by ID.
 * @param organizationId - The organization's ID.
 */
export const useGetOrganizationPages = (organizationId: string) => {
  return useQuery({
    queryKey: ['public', 'organization-pages', organizationId],
    queryFn: () => organizationPageService.getOrganizationPages(organizationId),
    enabled: !!organizationId,
    // Cache organization pages data for longer since it doesn't change frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};

/**
 * Hook to fetch all public organization pages for an organization by subdomain.
 * @param subdomain - The organization's subdomain.
 */
export const useGetOrganizationPagesBySubdomain = (subdomain: string) => {
  return useQuery({
    queryKey: ['public', 'organization-pages', 'subdomain', subdomain],
    queryFn: () => organizationPageService.getOrganizationPagesBySubdomain(subdomain),
    enabled: !!subdomain,
    // Cache organization pages data for longer since it doesn't change frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};
