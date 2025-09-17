'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, Form, FormGroup, FormRow, Input, Button, Checkbox } from '@/components/ui';
import { donorRegisterSchema, type DonorRegisterFormData } from '@/lib/validation';

export default function DonorSignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    
    // TODO: Integrate with API
    console.log('Donor registration attempt:', data);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle success/error here
    }, 1000);
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
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
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
