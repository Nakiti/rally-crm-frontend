"use client";

import { useState } from "react";
import { Filter, Download } from "lucide-react";
import DonationsTable from "@/components/crm/DonationsTable";
import { useGetDonations } from "@/hooks/crm/useDonation";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui";
import type { DonationFilters } from "@/lib/types";

const TransactionsPage = () => {
    const { session } = useAuth();
    const [filters, setFilters] = useState<DonationFilters>({});
    const [showFilters, setShowFilters] = useState(false);
    
    // Fetch donations data
    const { data: donationsData, isLoading, error } = useGetDonations(filters);
    
    // Get organization ID from session
    const organizationId = session?.organizationId;
    
    if (!organizationId) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Unable to load organization data</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading transactions...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Failed to load transactions</p>
                    <Button 
                        onClick={() => window.location.reload()} 
                        variant="outline"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    const donations = donationsData?.donations || [];
    const totalAmount = donations.reduce((sum, donation) => sum + (donation.amount || 0), 0);
    const totalTransactions = donations.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
                    <p className="text-gray-600 mt-1">
                        View and manage all donation transactions
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        onClick={() => setShowFilters(!showFilters)}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </Button>
                    <Button 
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
                    <p className="text-2xl font-bold text-gray-900">{totalTransactions.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                    <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Average Donation</h3>
                    <p className="text-2xl font-bold text-gray-900">
                        ${totalTransactions > 0 ? (totalAmount / totalTransactions).toFixed(2) : '0.00'}
                    </p>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Transactions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.status || ''}
                                onChange={(e) => setFilters({...filters, status: e.target.value as any || undefined})}
                            >
                                <option value="">All Statuses</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="refunded">Refunded</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
                            <input 
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.dateFrom || ''}
                                onChange={(e) => setFilters({...filters, dateFrom: e.target.value || undefined})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
                            <input 
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.dateTo || ''}
                                onChange={(e) => setFilters({...filters, dateTo: e.target.value || undefined})}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <Button 
                            onClick={() => setFilters({})}
                            variant="outline"
                        >
                            Clear Filters
                        </Button>
                        <Button 
                            onClick={() => setShowFilters(false)}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}

            {/* Transactions Table */}
            {donations.length > 0 ? (
                <DonationsTable 
                    allDonations={donations} 
                    organizationId={organizationId} 
                />
            ) : (
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Filter className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                    <p className="text-gray-500 mb-6">
                        {Object.keys(filters).length > 0 
                            ? "Try adjusting your filters to see more transactions"
                            : "Transactions will appear here once donations are made"
                        }
                    </p>
                    {Object.keys(filters).length > 0 && (
                        <Button 
                            onClick={() => setFilters({})}
                            variant="outline"
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
