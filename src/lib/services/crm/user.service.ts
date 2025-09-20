import apiClient from "@/lib/apiClient";
import type { CurrentUser } from "@/lib/types";

/**
 * Fetches the current authenticated user information.
 * @returns The current user data.
 */
export const getCurrentUser = async (): Promise<CurrentUser> => {
  const response = await apiClient.get('/crm/me');
  console.log("current user", response)
  return response.data.data;
};

