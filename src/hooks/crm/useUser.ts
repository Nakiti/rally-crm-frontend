import * as userService from "@/lib/services/crm/user.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch the current authenticated user information.
 */
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['crm', 'currentUser'],
    queryFn: userService.getCurrentUser,
    // Cache the current user data for the session
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    // Don't retry on 401 errors to prevent infinite loops
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    // Don't refetch on window focus if we got a 401
    refetchOnWindowFocus: (query) => {
      return !query.state.error || query.state.error?.response?.status !== 401;
    },
  });
};

