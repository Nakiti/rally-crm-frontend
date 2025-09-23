'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, Form, FormGroup, FormRow, Input, Button, Checkbox } from '@/components/ui';
import { donorRegisterSchema, type DonorRegisterFormData } from '@/lib/validation';
import { useDonorSignUp } from '@/hooks/public/useDonorAuth';
import { useRouter } from 'next/navigation';

export default function DonorSignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const signUpMutation = useDonorSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonorRegisterFormData>({
    resolver: zodResolver(donorRegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: DonorRegisterFormData) => {
    // Prepare data for API (exclude confirmPassword and termsAccepted)
    const { confirmPassword, termsAccepted, ...signupData } = data;
    
    setError(null);
    
    signUpMutation.mutate(signupData, {
      onSuccess: (response: any) => {
        console.log('Registration successful:', response);
        // Redirect to signin page with success message
        router.push('/signin?registered=true');
      },
      onError: (error: any) => {
        console.error('Registration error:', error);
        setError(error.message || 'Registration failed');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Donor Sign Up
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your donor account
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
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
              href="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Are you staff?{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Staff registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
