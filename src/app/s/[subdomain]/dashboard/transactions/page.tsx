'use client';

import React, { useState, useMemo } from 'react';
import { 
  TransactionsHeader, 
  TransactionsSearch, 
  TransactionsFilters, 
  TransactionsStats, 
  TransactionsTable 
} from '@/components/public/dashboard';
import { transactionsData, getFilteredTransactions } from '@/lib/data/transactionsData';

interface TransactionFilters {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  campaign?: string;
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  // Filter transactions based on search and filters
  const filteredTransactions = useMemo(() => {
    return getFilteredTransactions(transactionsData, searchQuery, filters);
  }, [searchQuery, filters]);

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof TransactionFilters] !== undefined
  );

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export transactions');
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <TransactionsHeader 
          onToggleFilters={() => setShowFilters(!showFilters)}
          onExport={handleExport}
          showFilters={showFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Search Bar */}
        <div className="mb-6">
          <TransactionsSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search by transaction ID, campaign, or amount..."
            className="max-w-md"
          />
        </div>

        {/* Stats Section */}
        {filteredTransactions.length > 0 && (
          <TransactionsStats transactions={filteredTransactions} />
        )}

        {/* Filters Panel */}
        {showFilters && (
          <TransactionsFilters 
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Main Content */}
        {filteredTransactions.length > 0 ? (
          <TransactionsTable 
            transactions={filteredTransactions}
          />
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {hasActiveFilters || searchQuery ? 'No transactions found' : 'No transactions yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters || searchQuery 
                  ? 'Try adjusting your search or filters to find what you\'re looking for.'
                  : 'Your donation history will appear here once you make your first contribution.'
                }
              </p>
              {(hasActiveFilters || searchQuery) && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}