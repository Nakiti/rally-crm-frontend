// hooks/public/useUserOrganizations.ts

'use client';

import { useState, useEffect, useCallback } from 'react';

// Define the shape of your organization data
interface Organization {
  id: string;
  name: string;
  subdomain: string;
  role: string
}

interface UserOrganizationsHook {
  tempOrganizations: Organization[];
  tempStaffAccountId: string | null;
  setLoginData: (orgs: Organization[], accountId: string) => void;
  clearLoginData: () => void;
}

// Keys for sessionStorage
const ORGS_KEY = 'temp_user_organizations';
const ACCOUNT_ID_KEY = 'temp_staff_account_id';

export const useUserOrganizations = (): UserOrganizationsHook => {
  // Use useState to hold the values in memory and trigger component re-renders
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [staffAccountId, setStaffAccountId] = useState<string | null>(null);

  // On initial load, try to read data from sessionStorage
  useEffect(() => {
    const storedOrgs = sessionStorage.getItem(ORGS_KEY);
    const storedId = sessionStorage.getItem(ACCOUNT_ID_KEY);
    if (storedOrgs) {
      setOrganizations(JSON.parse(storedOrgs) as Organization[]);
    }
    if (storedId) {
      setStaffAccountId(storedId);
    }
  }, []);

  const setLoginData = useCallback((orgs: Organization[], accountId: string): void => {
    sessionStorage.setItem(ORGS_KEY, JSON.stringify(orgs));
    sessionStorage.setItem(ACCOUNT_ID_KEY, accountId);
    setOrganizations(orgs);
    setStaffAccountId(accountId);
  }, []);

  const clearLoginData = useCallback((): void => {
    sessionStorage.removeItem(ORGS_KEY);
    sessionStorage.removeItem(ACCOUNT_ID_KEY);
    setOrganizations([]);
    setStaffAccountId(null);
  }, []);

  return {
    tempOrganizations: organizations,
    tempStaffAccountId: staffAccountId,
    setLoginData,
    clearLoginData,
  };
};