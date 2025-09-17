'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, Form, FormGroup, Input, Button, Checkbox } from '@/components/ui';
import { staffLoginSchema, type StaffLoginFormData } from '@/lib/validation';
import { useAuth } from '@/providers/AuthProvider';
import { useLogIn } from '@/hooks/public/useAuth';
import { useRouter } from "next/navigation";

export default function StaffLoginPage() {
  const { isAuthenticated, login } = useAuth();
  const logInMutation = useLogIn();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffLoginFormData>({
    resolver: zodResolver(staffLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      organization: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: StaffLoginFormData) => {
    // Prepare data for API (exclude rememberMe)
    const { rememberMe, ...loginData } = data;
    
    setError(null);
    
    logInMutation.mutate(loginData, {
      onSuccess: (response: any) => {
        console.log('Login successful:', response);
        const { user } = response;
        // Update auth state with user data
        login(user);
        router.push('/home');
      },
      onError: (error: any) => {
        console.error('Login error:', error);
        setError(error.message || 'Login failed');
      }
    });
  };

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Staff Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your staff account
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
              
              <FormGroup>
                <Input
                  label="Organization Name"
                  type="text"
                  placeholder="Enter your organization name"
                  error={errors.organization?.message}
                  {...register('organization')}
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
                loading={logInMutation.isPending}
                disabled={logInMutation.isPending}
              >
                {logInMutation.isPending ? 'Signing in...' : 'Sign in'}
              </Button>
            </Form>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register here
            </Link>
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Are you a donor?{' '}
            <Link
              href="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Donor login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
