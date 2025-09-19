"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { DesignationRow } from "./DesignationRow";
import type { Designation } from "@/lib/types";

interface DesignationsTableProps {
  designations: (Designation & {
    donations?: number;
    raised?: number;
    status?: string;
  })[];
  onUpdateDesignation: (id: string, data: { name: string; goalAmount: number; status: string }) => Promise<void>;
  isLoading?: boolean;
}

export const DesignationsTable: React.FC<DesignationsTableProps> = ({ 
  designations, 
  onUpdateDesignation,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <Card className="shadow-sm border border-slate-200">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-slate-900">All Designations</h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-slate-200 overflow-hidden">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-slate-900">All Designations</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Donations
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Raised
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Goal
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {designations.length > 0 ? (
                designations.map((designation) => (
                  <DesignationRow
                    key={designation.id}
                    designation={designation}
                    onUpdate={onUpdateDesignation}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">No designations found</p>
                      <p className="text-xs text-slate-400">Create your first designation to get started</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
