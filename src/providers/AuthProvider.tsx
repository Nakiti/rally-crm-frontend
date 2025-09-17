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
    if (!isInitialized) {
      // If we have current user data, restore the session
      if (currentUserData && typeof currentUserData === 'object' && 'data' in currentUserData && currentUserData.data) {
        setSession(currentUserData.data);
        setUserType('staff');
      } else if (isError || !isLoading) {
        // If there's an error (like 401) or we're done loading with no data, clear the session
        setSession(null);
        setUserType(null);
      }
      setIsInitialized(true);
    }
  }, [currentUserData, isError, isLoading, isInitialized]);

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