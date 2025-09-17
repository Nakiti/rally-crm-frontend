// Staff User Validation Schemas
export {
  staffLoginSchema,
  staffRegisterSchema,
  validateStaffLogin,
  validateStaffRegister,
  formatZodErrors,
  type StaffLoginFormData,
  type StaffRegisterFormData,
} from './staffUser.schema';

// Donor User Validation Schemas
export {
  donorLoginSchema,
  donorRegisterSchema,
  validateDonorLogin,
  validateDonorRegister,
  type DonorLoginFormData,
  type DonorRegisterFormData,
} from './donorUser.schema';

// Add other validation schemas here as they are created
// export { campaignSchema } from './campaign.schema';
