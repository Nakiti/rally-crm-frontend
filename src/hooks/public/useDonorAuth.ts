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
      // Store the donor JWT token for authenticated requests
      localStorage.setItem('donor_jwt', data.token);
      
      // Store donor info for UI purposes
      localStorage.setItem('donor_info', JSON.stringify(data.donor));
    },
  });
};

/**
 * Hook to authenticate a donor and get JWT token.
 */
export const useDonorLogIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: donorAuthService.logIn,
    onSuccess: (data) => {
      // Store the donor JWT token for authenticated requests
      localStorage.setItem('donor_jwt', data.token);
      
      // Store donor info for UI purposes
      localStorage.setItem('donor_info', JSON.stringify(data.donor));
      
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
    mutationFn: async () => {
      // Clear all donor authentication tokens and info
      localStorage.removeItem('donor_jwt');
      localStorage.removeItem('donor_info');
    },
    onSuccess: () => {
      // Clear all donor-related cached data
      queryClient.removeQueries({ queryKey: ['public', 'donor'] });
    },
  });
};

