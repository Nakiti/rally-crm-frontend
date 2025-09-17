import type { StaffRole } from './staff.types.js';

export interface CurrentUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  organizationId?: string;
  role?: StaffRole;
}
