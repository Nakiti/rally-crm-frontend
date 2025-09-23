import * as donorAuthService from "@/lib/services/public/donorAuth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { 
  DonorRegistrationData, 
  DonorLoginCredentials 
} from "@/lib/types";

/**
 * Hook to register a new donor account or claim an existing guest account.
 */
export const useDonorSignUp = () => {
  return useMutation({
    mutationFn: donorAuthService.signUp,
    onSuccess: (data) => {
      // Donor info is returned in the response, token is set as HTTP-only cookie
      console.log('Donor signup successful:', data);
    },
  });
};

/**
 * Hook to authenticate a donor.
 */
export const useDonorLogIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: donorAuthService.logIn,
    onSuccess: (data) => {
      // Donor info is returned in the response, token is set as HTTP-only cookie
      console.log('Donor login successful:', data);
      
      // Invalidate and refetch donor-related data
      queryClient.invalidateQueries({ queryKey: ['public', 'donor'] });
    },
  });
};

/**
 * Hook to log out the current donor.
 */
export const useDonorLogOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: donorAuthService.logOut,
    onSuccess: () => {
      // Clear all donor-related cached data
      queryClient.removeQueries({ queryKey: ['public', 'donor'] });
    },
  });
};

