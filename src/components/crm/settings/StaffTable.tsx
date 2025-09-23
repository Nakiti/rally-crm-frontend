"use client"

import { useState } from "react";
import { Check, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import type { StaffMemberInfo, StaffRole } from "@/lib/types";
import type { ColumnDefinition } from "@/lib/types";

interface StaffTableProps {
  staffMembers: StaffMemberInfo[];
  onUpdateRole: (staffAccountId: string, role: StaffRole) => void;
  isUpdating: boolean;
}

const StaffTable = ({ staffMembers, onUpdateRole, isUpdating }: StaffTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempRole, setTempRole] = useState<StaffRole>('editor');

  const handleRoleChange = (staffAccountId: string, newRole: StaffRole) => {
    setTempRole(newRole);
    setEditingId(staffAccountId);
  };

  const handleConfirm = (staffAccountId: string) => {
    onUpdateRole(staffAccountId, tempRole);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const columns: ColumnDefinition<StaffMemberInfo>[] = [
    {
      accessorKey: 'firstName',
      label: 'Name',
      render: (staffMember) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {staffMember.firstName} {staffMember.lastName}
            </div>
            <div className="text-sm text-gray-500">{staffMember.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      label: 'Role',
      render: (staffMember) => (
        <div className="flex items-center space-x-2">
          {editingId === staffMember.id ? (
            <div className="flex items-center space-x-2">
              <select
                value={tempRole}
                onChange={(e) => setTempRole(e.target.value as StaffRole)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleConfirm(staffMember.id)}
                loading={isUpdating}
                className="px-2 py-1"
              >
                <Check className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="px-2 py-1"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                staffMember.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {staffMember.role === 'admin' ? (
                  <Shield className="w-3 h-3 mr-1" />
                ) : (
                  <User className="w-3 h-3 mr-1" />
                )}
                {staffMember.role === 'admin' ? 'Admin' : 'Editor'}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleRoleChange(staffMember.id, staffMember.role)}
                className="text-gray-400 hover:text-gray-600"
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'joinedAt',
      label: 'Joined',
      render: (staffMember) => (
        <div className="text-sm text-gray-500">
          {new Date(staffMember.joinedAt).toLocaleDateString()}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage roles and permissions for your team members
        </p>
      </div>
      <div className="p-6">
        <Table
          data={staffMembers}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default StaffTable;
