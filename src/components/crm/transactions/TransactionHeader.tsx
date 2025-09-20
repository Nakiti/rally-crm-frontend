"use client";

import { Filter, Download } from "lucide-react";
import { Button } from "@/components/ui";

interface TransactionHeaderProps {
  onToggleFilters: () => void;
  onExport: () => void;
  showFilters: boolean;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({ 
  onToggleFilters, 
  onExport, 
  showFilters 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Transactions
        </h1>
        <p className="text-gray-600 text-lg">
          View and manage all donation transactions across your campaigns
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          onClick={onToggleFilters}
          variant="outline"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
            showFilters 
              ? 'bg-blue-50 border-blue-200 text-blue-700' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button 
          onClick={onExport}
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default TransactionHeader;
