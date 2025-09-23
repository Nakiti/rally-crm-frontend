import apiClient from "@/lib/apiClient";
import type { 
  DonorRegistrationData, 
  DonorLoginCredentials, 
  DonorAuthResponse 
} from "@/lib/types";

/**
 * Registers a new donor account or claims an existing guest account.
 * @param data - The donor registration data.
 * @returns Donor information (token is set as HTTP-only cookie).
 */
export const signUp = async (data: DonorRegistrationData): Promise<{ donor: DonorAuthResponse['donor'] }> => {
  const response = await apiClient.post('/public/donor-auth/signup', data);
  return response.data.data;
};

/**
 * Authenticates a donor and returns donor information.
 * @param data - The donor login credentials.
 * @returns Donor information (token is set as HTTP-only cookie).
 */
export const logIn = async (data: DonorLoginCredentials): Promise<{ donor: DonorAuthResponse['donor'] }> => {
  const response = await apiClient.post('/public/donor-auth/login', data);
  return response.data.data;
};

/**
 * Logs out the current donor by clearing the authentication cookie.
 * @returns Success message.
 */
export const logOut = async (): Promise<{ message: string }> => {
  const response = await apiClient.post('/public/donor-auth/logout');
  return response.data.data;
};

