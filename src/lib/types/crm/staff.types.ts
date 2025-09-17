export type StaffRole = 'admin' | 'editor';

export interface StaffAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

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

