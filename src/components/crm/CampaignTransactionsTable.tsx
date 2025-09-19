"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTable } from "@/hooks/generic/useTable";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import { Donation, ColumnDefinition } from "@/lib/types";

interface CampaignTransactionsTableProps {
  donations: Donation[];
  organizationId: string;
  campaignId: string;
}

const CampaignTransactionsTable: React.FC<CampaignTransactionsTableProps> = ({ 
  donations, 
  organizationId, 
  campaignId 
}) => {
  const router = useRouter();
  
  // Use the existing table hook for sorting and pagination
  const { paginatedData, sort, sortConfig, currentPage, setCurrentPage, totalPages } = useTable(donations);

  // Define columns specific to campaign transactions
  const columns: ColumnDefinition<Donation>[] = [
    { 
      accessorKey: 'donorAccount', 
      label: 'Name', 
      sortable: false, 
      render: (row) => {
        const donor = row.donorAccount;
        if (donor?.firstName && donor?.lastName) {
          return `${donor.firstName} ${donor.lastName}`;
        }
        return donor?.email || 'Anonymous';
      }
    },
    { 
      accessorKey: 'donorAccount', 
      label: 'Email', 
      sortable: false, 
      render: (row) => row.donorAccount?.email || '-' 
    },
    { 
      accessorKey: 'createdAt', 
      label: 'Date', 
      sortable: true, 
      render: (row) => new Date(row.createdAt).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    { 
      accessorKey: 'amount', 
      label: 'Amount', 
      sortable: true, 
      render: (row) => `$${parseFloat(row.amount.toString()).toFixed(2)}` 
    },
    { 
      accessorKey: 'stripeChargeId', 
      label: 'Method', 
      sortable: false, 
      render: (row) => row.stripeChargeId ? 'Card' : 'Other' 
    },
    { 
      accessorKey: 'status', 
      label: 'Status', 
      sortable: false, 
      render: (row) => (
        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
          row.status === 'completed' ? 'bg-green-100 text-green-800' :
          row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          row.status === 'failed' ? 'bg-red-100 text-red-800' :
          row.status === 'refunded' ? 'bg-gray-100 text-gray-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1).toLowerCase()}
        </span>
      )
    },
  ];

  // Handle row click to navigate to transaction details
  const handleRowClick = (row: Donation) => {
    // TODO: Implement navigation to transaction details page
    // router.push(`/org/${organizationId}/campaigns/${campaignId}/transactions/${row.id}`);
    console.log('Navigate to transaction:', row.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
      </div>
      
      <div className="overflow-hidden">
        <Table
          data={paginatedData}
          columns={columns}
          sortConfig={sortConfig}
          onSort={sort}
          onRowClick={handleRowClick}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default CampaignTransactionsTable;
