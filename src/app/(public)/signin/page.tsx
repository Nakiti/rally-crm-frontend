'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, Form, FormGroup, Input, Button, Checkbox } from '@/components/ui';
import { donorLoginSchema, type DonorLoginFormData } from '@/lib/validation';

export default function DonorSignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonorLoginFormData>({
    resolver: zodResolver(donorLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: DonorLoginFormData) => {
    setIsLoading(true);
    
    // TODO: Integrate with API
    console.log('Donor login attempt:', data);
    
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
            Donor Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your donor account
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </FormGroup>
              
              <FormGroup>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  {...register('password')}
                />
              </FormGroup>
              
              <div className="flex items-center justify-between">
                <Checkbox
                  label="Remember me"
                  {...register('rememberMe')}
                />
                
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </Form>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Are you staff?{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Staff login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
