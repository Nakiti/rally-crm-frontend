"use client";

import { useState } from "react";
import { Check, X, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Designation } from "@/lib/types";

interface DesignationRowProps {
  designation: Designation & {
    donations?: number;
    raised?: number;
    status?: string;
  };
  onUpdate: (id: string, data: { name: string; goalAmount: number; status: string }) => Promise<void>;
}

export const DesignationRow: React.FC<DesignationRowProps> = ({ designation, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: designation.name,
    goalAmount: designation.goalAmount || 0,
    status: designation.status || "Active"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onUpdate(designation.id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update designation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: designation.name,
      goalAmount: designation.goalAmount || 0,
      status: designation.status || "Active"
    });
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof typeof editData, value: string | number) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (isEditing) {
    return (
      <tr className="hover:bg-slate-50 transition-colors duration-150">
        <td className="px-6 py-4">
          <Input
            value={editData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            className="min-w-[200px]"
          />
        </td>
        <td className="px-6 py-4 text-slate-700 font-medium">
          {designation.donations || 0}
        </td>
        <td className="px-6 py-4 text-slate-700 font-medium">
          ${(designation.raised || 0).toLocaleString()}
        </td>
        <td className="px-6 py-4">
          <Input
            type="number"
            value={editData.goalAmount}
            onChange={(e) => handleFieldChange("goalAmount", Number(e.target.value))}
            className="min-w-[120px]"
          />
        </td>
        <td className="px-6 py-4">
          <select
            value={editData.status}
            onChange={(e) => handleFieldChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={handleSave}
              loading={isLoading}
              className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-slate-50 transition-colors duration-150">
      <td className="px-6 py-4 text-slate-900 font-medium">
        {designation.name}
      </td>
      <td className="px-6 py-4 text-slate-700 font-medium">
        {designation.donations || 0}
      </td>
      <td className="px-6 py-4 text-slate-700 font-medium">
        ${(designation.raised || 0).toLocaleString()}
      </td>
      <td className="px-6 py-4 text-slate-700 font-medium">
        ${(designation.goalAmount || 0).toLocaleString()}
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          designation.status === "Active" 
            ? "bg-green-100 text-green-800" 
            : "bg-gray-100 text-gray-800"
        }`}>
          {designation.status || "Active"}
        </span>
      </td>
      <td className="px-6 py-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsEditing(true)}
          className="hover:bg-blue-50 hover:border-blue-300"
        >
          <Edit3 className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
};
