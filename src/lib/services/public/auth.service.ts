import apiClient from "@/lib/apiClient";
import type { 
  SignupData, 
  LoginData, 
  SessionData,
  SignupResponse,
  LoginResponse,
  SessionResponse
} from "@/lib/types";

/**
 * Creates a new organization with the first admin user.
 * @param data - The signup information.
 * @returns Created organization and staff account information.
 */
export const signUp = async (data: SignupData): Promise<SignupResponse> => {
  const response = await apiClient.post('/public/auth/signup', data);
  return response.data.data
};

/**
 * Authenticates a user and returns their organization memberships.
 * @param data - The login credentials.
 * @returns Staff account and organization memberships.
 */
export const logIn = async (data: LoginData): Promise<LoginResponse> => {
  const response = await apiClient.post('/public/auth/login', data);
  return response.data.data
};

/**
 * Creates a session JWT for a specific organization.
 * @param data - The session creation data.
 * @returns JWT token and user session information.
 */
export const createSession = async (data: SessionData): Promise<SessionResponse> => {
  const response = await apiClient.post('/public/auth/session', data);
  return response.data.data
};

/**
 * Logs out the current user by clearing the authentication cookie.
 * @returns Success message.
 */
export const logOut = async (): Promise<{ message: string }> => {
  const response = await apiClient.post('/public/auth/logout');
  return response.data.data;
};

