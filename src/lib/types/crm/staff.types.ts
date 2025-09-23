export type StaffRole = 'admin' | 'editor';

export interface StaffAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Backend returns this flattened structure
export interface StaffMemberInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: StaffRole;
  joinedAt: string;
}

// Legacy nested structure (keeping for compatibility)
export interface StaffMember {
  staffAccountId: string;
  organizationId: string;
  role: StaffRole;
  createdAt: string;
  updatedAt: string;
  staffAccount: StaffAccount;
}

export interface InviteStaffData {
  email: string;
  role: StaffRole;
}

export interface UpdateStaffRoleData {
  role: StaffRole;
}

