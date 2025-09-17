import type { StaffRole } from '../crm/staff.types.js';

export type StaffRoleEnum = 'admin' | 'editor';

/**
 * Defines the shape of the user object that will be attached to the request
 * after a staff member is successfully authenticated for a specific organization session.
 */
export interface StaffSession {
  id?: string;              // The global ID from the StaffAccount
  firstName?: string;
  lastName?: string;
  email?: string;
  organizationId?: string;  // The ID of the org they are currently managing (from StaffRole)
  role?: StaffRoleEnum;     // Their role within that specific org (from StaffRole)
  staffAccountId?: string;
  organizations?: OrganizationMembership[]; // All organizations the user has access to
  iat?: number;             // JWT issued at
  exp?: number;             // JWT expiration
}

/**
 * Defines the shape of the user object that will be attached to the request
 * after a donor is successfully authenticated.
 */
export interface DonorSession {
  donorAccountId: string;
  organizationId: string;
  iat?: number;             // JWT issued at
  exp?: number;             // JWT expiration
}

export interface SignupData {
  organizationName: string;
  organizationSubdomain: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
  organization: string;
}

export interface SessionData {
  organizationId: string;
  staffAccountId: string;
}

export interface OrganizationMembership {
  id: string;
  name: string;
  subdomain: string;
  role: StaffRole;
}

export interface SignupResponse {
  organization: {
    id: string;
    name: string;
    subdomain: string;
  };
  staffAccount: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface LoginResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    organizationId: string;
    role: StaffRole;
  };
}

export interface SessionResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    organizationId: string;
    role: StaffRole;
  };
}
