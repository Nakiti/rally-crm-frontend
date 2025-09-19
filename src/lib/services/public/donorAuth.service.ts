import apiClient from "@/lib/apiClient";
import type { 
  DonorRegistrationData, 
  DonorLoginCredentials, 
  DonorAuthResponse 
} from "@/lib/types";

/**
 * Registers a new donor account or claims an existing guest account.
 * @param data - The donor registration data.
 * @returns JWT token and donor information.
 */
export const signUp = async (data: DonorRegistrationData): Promise<DonorAuthResponse> => {
  const response = await apiClient.post('/public/donor-auth/signup', data);
  return response.data.data;
};

/**
 * Authenticates a donor and returns JWT token.
 * @param data - The donor login credentials.
 * @returns JWT token and donor information.
 */
export const logIn = async (data: DonorLoginCredentials): Promise<DonorAuthResponse> => {
  const response = await apiClient.post('/public/donor-auth/login', data);
  return response.data.data;
};

