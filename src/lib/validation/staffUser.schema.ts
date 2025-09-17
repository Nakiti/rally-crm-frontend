import { z } from 'zod';

// Staff Login Schema
export const staffLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
  organization: z
    .string()
    .min(1, 'Organization name is required'),
  rememberMe: z.boolean().optional(),
});

// Staff Registration Schema
export const staffRegisterSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be less than 100 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  organizationName: z
    .string()
    .min(1, 'Organization name is required')
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must be less than 100 characters'),
  organizationSubdomain: z
    .string()
    .min(1, 'Organization subdomain is required')
    .min(2, 'Subdomain must be at least 2 characters')
    .max(63, 'Subdomain must be less than 63 characters')
    .regex(/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/, 
      'Subdomain must contain only letters, numbers, and hyphens, and cannot start or end with a hyphen'),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Type exports for TypeScript
export type StaffLoginFormData = z.infer<typeof staffLoginSchema>;
export type StaffRegisterFormData = z.infer<typeof staffRegisterSchema>;

// Validation helper functions
export const validateStaffLogin = (data: unknown) => {
  return staffLoginSchema.safeParse(data);
};

export const validateStaffRegister = (data: unknown) => {
  return staffRegisterSchema.safeParse(data);
};

// Error formatting helper
export const formatZodErrors = (errors: z.ZodError<any>) => {
  const formattedErrors: Record<string, string> = {};
  
  errors.issues.forEach((error) => {
    const path = error.path.join('.');
    formattedErrors[path] = error.message;
  });
  
  return formattedErrors;
};
