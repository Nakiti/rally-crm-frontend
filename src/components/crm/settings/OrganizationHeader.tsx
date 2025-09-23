"use client";

import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

const OrganizationHeader = () => {
  return (
    <div className="mb-8">
      <Link 
        href="/settings"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Settings</span>
      </Link>
      
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organization</h1>
          <p className="text-gray-600 mt-1">
            Manage details about your organization
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationHeader;
