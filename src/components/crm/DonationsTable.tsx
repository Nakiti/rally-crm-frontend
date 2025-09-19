// src/components/crm/DonationsTable.tsx

"use client";
import { useRouter } from "next/navigation";
import { useTable } from "@/hooks/generic/useTable";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import { Donation, ColumnDefinition } from "@/lib/types";

interface DonationsTableProps {
  allDonations: Donation[]; // Pass the raw data in
  organizationId: string | number;
}

const DonationsTable: React.FC<DonationsTableProps> = ({ allDonations, organizationId }) => {
  const router = useRouter();
  
  // 1. Use the hook to get state and handlers
  const { paginatedData, sort, sortConfig, currentPage, setCurrentPage, totalPages } = useTable(allDonations);

  // 2. Define the specific columns and render logic for Donations
  const columns: ColumnDefinition<Donation>[] = [
    { 
      accessorKey: 'id', 
      label: 'Transaction ID', 
      sortable: true, 
      render: (row) => `#${row.id.slice(0, 8)}...` 
    },
    { 
      accessorKey: 'amount', 
      label: 'Amount', 
      sortable: true, 
      render: (row) => `$${(row.amount || 0).toLocaleString()}` 
    },
    { 
      accessorKey: 'status', 
      label: 'Status', 
      render: (row) => (
        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize ${
          row.status === 'completed' ? 'bg-green-100 text-green-800' :
          row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          row.status === 'failed' ? 'bg-red-100 text-red-800' :
          row.status === 'refunded' ? 'bg-gray-100 text-gray-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      accessorKey: 'campaign', 
      label: 'Campaign', 
      render: (row) => row.campaign?.title || 'N/A' 
    },
    { 
      accessorKey: 'donorAccount', 
      label: 'Donor', 
      render: (row) => {
        const donor = row.donorAccount;
        if (donor?.firstName && donor?.lastName) {
          return `${donor.firstName} ${donor.lastName}`;
        }
        return donor?.email || 'Anonymous';
      }
    },
    { 
      accessorKey: 'designation', 
      label: 'Designation', 
      render: (row) => row.designation?.name || 'General' 
    },
    { 
      accessorKey: 'createdAt', 
      label: 'Date', 
      sortable: true, 
      render: (row) => new Date(row.createdAt).toLocaleDateString("en-US", { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) 
    },
  ];

  // 3. Define the specific action for clicking a row
  const handleRowClick = (row: Donation) => {
    router.push(`/org/${organizationId}/dashboard/transactions/${row.id}`);
  };

  // 4. Render the generic components with specific props
  return (
    <div className="overflow-hidden">
      <Table
        data={paginatedData}
        columns={columns}
        sortConfig={sortConfig}
        onSort={sort}
        onRowClick={handleRowClick}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DonationsTable;
