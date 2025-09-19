'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { StaffSession, DonorSession } from '@/lib/types/public/auth.types';
import { useGetCurrentUser } from '@/hooks/crm/useUser';

// Define the shape of the context's value
interface AuthContextType {
  session: StaffSession | DonorSession | null;
  isLoading: boolean;
  login: (user: StaffSession) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userType: 'staff' | 'donor' | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<StaffSession | DonorSession | null>(null);
  const [userType, setUserType] = useState<'staff' | 'donor' | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use the getCurrentUser hook to check for existing session
  const { data: currentUserData, isLoading, isError, refetch } = useGetCurrentUser();

  // Effect to handle session restoration on app load
useEffect(() => {
  // Only run this logic once on initialization
  if (!isInitialized) {
    // If the hook has finished loading...
    if (!isLoading) {
      // And we successfully got user data, set the session.
      if (currentUserData?.data && !isError) {
        setSession(currentUserData.data);
        setUserType('staff');
      } else {
        // Otherwise (error or no data), ensure the session is cleared.
        setSession(null);
        setUserType(null);
      }
      // Mark initialization as complete
      setIsInitialized(true);
    }
  }
}, [isInitialized, isLoading, currentUserData, isError]);

  // --- Login & Logout Functions ---

  const login = useCallback((user: StaffSession) => {
    setSession(user);
    setUserType("staff");
    // Refetch current user data to ensure consistency
    // refetch();
  }, [refetch]);

  const logout = useCallback(() => {
    // Clear the session state
    setSession(null);
    setUserType(null);
    
    // Redirect to the login page
    window.location.href = '/login';
  }, []);

  const isAuthenticated = !!session && isInitialized;

  const value = { 
    session, 
    isLoading: isLoading || !isInitialized, 
    login, 
    logout, 
    isAuthenticated, 
    userType 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// A custom hook to easily access the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};