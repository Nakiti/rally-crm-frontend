"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus, Mail, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Form, FormGroup, FormRow } from "@/components/ui/Form";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import type { InviteStaffData, StaffRole } from "@/lib/types";

const inviteStaffSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(['admin', 'editor'] as const),
});

type InviteStaffFormData = z.infer<typeof inviteStaffSchema>;

interface AddStaffFormProps {
  onInviteStaff: (data: InviteStaffData) => void;
  isInviting: boolean;
}

const AddStaffForm = ({ onInviteStaff, isInviting }: AddStaffFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<InviteStaffFormData>({
    resolver: zodResolver(inviteStaffSchema),
    defaultValues: {
      email: '',
      role: 'editor'
    }
  });

  const onSubmit = (data: InviteStaffFormData) => {
    onInviteStaff(data);
    reset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <UserPlus className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Send an invitation to add a new team member to your organization
        </p>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Input
              label="Email Address"
              type="email"
              placeholder="colleague@example.com"
              error={errors.email?.message}
              {...register('email')}
              icon={<Mail className="w-4 h-4 text-gray-400" />}
            />
          </FormGroup>
          
          <FormGroup>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  value="editor"
                  {...register('role')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">Editor</div>
                    <div className="text-sm text-gray-500">Can create and edit campaigns, view reports</div>
                  </div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  value="admin"
                  {...register('role')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">Admin</div>
                    <div className="text-sm text-gray-500">Full access to all features and settings</div>
                  </div>
                </div>
              </label>
            </div>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
            )}
          </FormGroup>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              loading={isSubmitting || isInviting}
              disabled={isSubmitting || isInviting}
              className="min-w-[120px]"
            >
              {isSubmitting || isInviting ? 'Sending...' : 'Send Invitation'}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddStaffForm;
