import * as organizationService from "@/lib/services/public/organization.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch a public organization by subdomain.
 * @param subdomain - The organization's subdomain.
 */
export const useGetOrganizationBySubdomain = (subdomain: string) => {
  return useQuery({
    queryKey: ['public', 'organizations', 'subdomain', subdomain],
    queryFn: () => organizationService.getOrganizationBySubdomain(subdomain),
    enabled: !!subdomain,
    // Cache organization data for longer since it doesn't change frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};

/**
 * Hook to fetch a public organization by ID.
 * @param id - The organization's ID.
 */
export const useGetOrganizationById = (id: string) => {
  return useQuery({
    queryKey: ['public', 'organizations', id],
    queryFn: () => organizationService.getOrganizationById(id),
    enabled: !!id,
    // Cache organization data for longer since it doesn't change frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};

