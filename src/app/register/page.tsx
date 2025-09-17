'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, Form, FormGroup, FormRow, Input, Button, Checkbox } from '@/components/ui';
import { staffRegisterSchema, type StaffRegisterFormData } from '@/lib/validation';
import { useSignUp } from '@/hooks/public/useAuth';
import { useRouter } from 'next/navigation';

export default function StaffRegisterPage() {
  const router = useRouter();
  const signUpMutation = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffRegisterFormData>({
    resolver: zodResolver(staffRegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      organizationName: '',
      organizationSubdomain: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: StaffRegisterFormData) => {
    // Prepare data for API (exclude confirmPassword and termsAccepted)
    const { confirmPassword, termsAccepted, ...signupData } = data;
    
    signUpMutation.mutate(signupData, {
      onSuccess: (response) => {
        console.log('Registration successful:', response);
        // Redirect to login page with success message
        router.push('/login?registered=true');
      },
      onError: (error: any) => {
        console.error('Registration error:', error);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Your Organization
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Set up your organization and create your admin account
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            {signUpMutation.error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">
                  {(signUpMutation.error as any)?.response?.data?.message || 
                   signUpMutation.error.message || 
                   'An unexpected error occurred. Please try again.'}
                </p>
              </div>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormRow>
                <FormGroup>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="Enter your first name"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter your last name"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    helperText="Must be at least 8 characters long"
                    error={errors.password?.message}
                    {...register('password')}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Input
                    label="Organization Name"
                    type="text"
                    placeholder="Enter your organization name"
                    error={errors.organizationName?.message}
                    {...register('organizationName')}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Input
                    label="Organization Subdomain"
                    type="text"
                    placeholder="e.g., my-organization"
                    helperText="This will be your organization's URL (my-organization.rallycrm.com)"
                    error={errors.organizationSubdomain?.message}
                    {...register('organizationSubdomain')}
                  />
                </FormGroup>
              </FormRow>
              
              <Checkbox
                error={errors.termsAccepted?.message}
                {...register('termsAccepted')}
              >
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </Checkbox>
              
              <Button
                type="submit"
                className="w-full"
                loading={signUpMutation.isPending}
                disabled={signUpMutation.isPending}
              >
                {signUpMutation.isPending ? 'Creating account...' : 'Create Account'}
              </Button>
            </Form>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Are you a donor?{' '}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Donor registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
