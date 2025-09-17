import * as authService from "@/lib/services/public/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import type { 
  SignupData, 
  LoginData, 
  SessionData 
} from "@/lib/types";
import { useRouter } from "next/navigation";
/**
 * Hook to sign up a new organization with the first admin user.
 */
export const useSignUp = () => {
  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      console.log('Sign up successful:', data);
    },
  });
};

/**
 * Hook to log in a user and create a session for the specified organization.
 */
export const useLogIn = () => {  
  return useMutation({
    mutationFn: (credentials: LoginData) => authService.logIn(credentials),
  });
};

/**
 * Hook to create a session JWT for a specific organization.
 */
export const useCreateSession = () => {
  const { login } = useAuth(); // From AuthProvider
  const router = useRouter();

  return useMutation({
    // This function calls your backend API
    mutationFn: (sessionData: SessionData) => authService.createSession(sessionData),
    
    // THIS is the main onSuccess that handles the result
    onSuccess: (response : any) => {
      // The backend should return user data on success
      if (response && response.data.user) {
        // 1. IMPORTANT: Update the AuthProvider state
        console.log(response)
        login(response.data.user);
        
        // 2. Redirect to the main application page
        // router.push('/home'); 
      } else {
        // Handle unexpected response from server
        console.error("Session creation succeeded but no user data was returned.");
        // router.push('/login?error=session_failed');
      }
    },
    onError: (error) => {
      console.error("Failed to create session:", error);
      // Optionally redirect with an error message
      // router.push('/login?error=session_failed');
    }
  });
};

/**
 * Hook to log out the current user.
 */
export const useLogOut = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Call backend logout endpoint to clear cookie
      await authService.logOut();
      // Use AuthProvider to handle logout
      logout();
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });
};

