"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui";

interface TransactionFilters {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  campaign?: string;
}

interface TransactionsFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  onClose: () => void;
}

const TransactionsFilters: React.FC<TransactionsFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  onClose 
}) => {
  const handleFilterChange = (key: keyof TransactionFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof TransactionFilters] !== undefined
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter Transactions</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date From
          </label>
          <input 
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            value={filters.dateFrom || ''}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date To
          </label>
          <input 
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            value={filters.dateTo || ''}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            value={filters.campaign || ''}
            onChange={(e) => handleFilterChange('campaign', e.target.value)}
          >
            <option value="">All Campaigns</option>
            <option value="annual-fund">Annual Fund Drive</option>
            <option value="emergency-relief">Emergency Relief</option>
            <option value="scholarship-fund">Scholarship Fund</option>
            <option value="community-garden">Community Garden</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <span className="text-sm text-gray-600">
              {Object.keys(filters).filter(key => filters[key as keyof TransactionFilters] !== undefined).length} filter(s) applied
            </span>
          )}
        </div>
        <div className="flex gap-3">
          {hasActiveFilters && (
            <Button 
              onClick={clearFilters}
              variant="outline"
              className="px-4 py-2 text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Clear All
            </Button>
          )}
          <Button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsFilters;
