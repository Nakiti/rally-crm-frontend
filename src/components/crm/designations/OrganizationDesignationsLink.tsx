import React from 'react';
import { Settings } from 'lucide-react';

interface OrganizationDesignationsLinkProps {
  organizationId?: string;
}

export const OrganizationDesignationsLink: React.FC<OrganizationDesignationsLinkProps> = ({ 
  organizationId 
}) => {
  if (!organizationId) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-blue-900 mb-1">Need to add or edit designations?</h4>
          <p className="text-sm text-blue-700">Manage all available designations for your organization.</p>
        </div>
        <a 
          href={`/org/${organizationId}/dashboard/settings/designations`}
          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          <Settings className="mr-2 w-4 h-4" />
          Manage Designations
        </a>
      </div>
    </div>
  );
};
