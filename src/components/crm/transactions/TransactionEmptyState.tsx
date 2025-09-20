"use client";

import { CreditCard, Filter } from "lucide-react";
import { Button } from "@/components/ui";
import { DonationFilters } from "@/lib/types";

interface TransactionEmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

const TransactionEmptyState: React.FC<TransactionEmptyStateProps> = ({ 
  hasFilters, 
  onClearFilters 
}) => {
  return (
    <div className="text-center py-16 px-6">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-6">
        {hasFilters ? (
          <Filter className="w-10 h-10 text-blue-500" />
        ) : (
          <CreditCard className="w-10 h-10 text-blue-500" />
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {hasFilters ? "No transactions found" : "No transactions yet"}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        {hasFilters 
          ? "No transactions match your current filters. Try adjusting your search criteria to see more results."
          : "Transactions will appear here once donations are made to your campaigns. Share your campaigns to start receiving donations."
        }
      </p>
      
      {hasFilters ? (
        <Button 
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors duration-200"
        >
          <Filter className="w-4 h-4" />
          Clear Filters
        </Button>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Get started by creating your first campaign
          </p>
          <Button 
            onClick={() => window.location.href = '/campaigns'}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors duration-200"
          >
            View Campaigns
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionEmptyState;
