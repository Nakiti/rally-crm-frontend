import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";

export const ActivationHeader = () => {
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
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Globe className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Activation</h1>
          <p className="text-gray-600 mt-1">
            Complete the requirements below to make your organization live
          </p>
        </div>
      </div>
    </div>
  );
};
