"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import type { CreateDesignationData } from "@/lib/types";

interface AddDesignationFormProps {
  onSubmit: (data: CreateDesignationData) => Promise<void>;
  isLoading?: boolean;
}

export const AddDesignationForm: React.FC<AddDesignationFormProps> = ({ 
  onSubmit, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<CreateDesignationData>({
    name: "",
    goalAmount: 0,
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      await onSubmit(formData);
      setFormData({
        name: "",
        goalAmount: 0,
        description: ""
      });
    } catch (error) {
      console.error("Failed to create designation:", error);
    }
  };

  const handleFieldChange = (field: keyof CreateDesignationData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-sm border border-slate-200">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-slate-900">Add New Designation</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Input
                label="Title"
                placeholder="Enter designation title"
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Input
                label="Goal Amount"
                type="number"
                placeholder="Enter goal amount"
                value={formData.goalAmount}
                onChange={(e) => handleFieldChange("goalAmount", Number(e.target.value))}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                disabled={!formData.name.trim()}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Designation
              </Button>
            </div>
          </div>
          <div>
            <Input
              label="Description (Optional)"
              placeholder="Enter designation description"
              value={formData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              disabled={isLoading}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
