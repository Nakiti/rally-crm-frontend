import React from 'react';
import type { Designation } from '@/lib/types';

interface AllDesignationsTableProps {
  allDesignations: Designation[];
  selectedIds: Set<string>;
  onDesignationChange: (designation: Designation, isChecked: boolean) => void;
}

export const AllDesignationsTable: React.FC<AllDesignationsTableProps> = ({
  allDesignations,
  selectedIds,
  onDesignationChange
}) => {
  return (
    <>
      <div className="border-b border-gray-300 my-4"/>

      <div className="px-2 py-4">
        <h1 className="text-xl font-semibold mb-2">All Designations</h1>
        <p className="text-sm text-gray-600 w-1/2 mb-4">
          These are all active designations in your organization.
        </p>
        <div className="px-6">
          <table className="min-w-full bg-white border-gray-300 rounded-md">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Add</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Designation Title</th>
              </tr>
            </thead>
            <tbody>
              {allDesignations.length > 0 ? (
                allDesignations.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">
                      <input 
                        type="checkbox" 
                        value={item.id} 
                        onChange={(e) => onDesignationChange(item, e.target.checked)}
                        checked={selectedIds.has(item.id)}
                        className="focus:ring-2 focus:ring-blue-500"
                        aria-label={`Select ${item.name}`}
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-start">{item.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
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
                      <p className="text-xs text-gray-400">Create designations in your organization settings</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
