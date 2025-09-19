"use client";

import Link from "next/link";
import { ArrowLeft, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface DesignationsHeaderProps {
  organizationId: string;
}

export const DesignationsHeader: React.FC<DesignationsHeaderProps> = ({ organizationId }) => {
  return (
    <div className="mb-8">
      <Link 
        href={`/org/${organizationId}/dashboard/settings`}
        className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors duration-200"/>
        <span className="font-medium">Back to Settings</span>
      </Link>
      
      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Designations</h1>
              <p className="text-slate-600 text-lg">
                Manage the designations that users can donate to
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
