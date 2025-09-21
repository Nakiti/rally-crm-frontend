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
  
  // Use the getCurrentUser hook to check for existing session
  const { data: currentUserData, isLoading, isError } = useGetCurrentUser();

  // Effect to handle session restoration on app load
  useEffect(() => {
    if (isLoading) {
      return;
    }

    console.log('Final check:', {
      hasData: !!currentUserData,
      isError: isError
    });

    if (currentUserData && !isError) {
      setSession(currentUserData);
      setUserType('staff');
    } else if (isError) {
      // Only clear session if we get a definitive error (not just loading)
      // Add a small delay to handle race conditions
      const timeoutId = setTimeout(() => {
        console.log("error", isError)
        setSession(null);
        setUserType(null);
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [currentUserData, isError, isLoading]);

  // --- Login & Logout Functions ---

  const login = useCallback((user: StaffSession) => {
    setSession(user);
    setUserType("staff");
  }, []);

  const logout = useCallback(() => {
    // Clear the session state
    setSession(null);
    setUserType(null);
    
    // Redirect to the login page
    window.location.href = '/login';
  }, []);

  // User is authenticated if they have a session
  const isAuthenticated = !!session;

  const value = { 
    session, 
    isLoading, 
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