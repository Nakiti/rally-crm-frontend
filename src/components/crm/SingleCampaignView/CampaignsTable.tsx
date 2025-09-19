// src/components/CampaignsTable.tsx

"use client";
import { useRouter } from "next/navigation";
import { useTable } from "@/hooks/generic/useTable";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";
import { Campaign, ColumnDefinition } from "@/lib/types";

interface CampaignsTableProps {
  allCampaigns: Campaign[]; // Pass the raw data in
  organizationId: string | number;
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({ allCampaigns, organizationId }) => {
  const router = useRouter();
  
  // 1. Use the hook to get state and handlers
  const { paginatedData, sort, sortConfig, currentPage, setCurrentPage, totalPages } = useTable(allCampaigns);

  // 2. Define the specific columns and render logic for Campaigns
  const columns: ColumnDefinition<Campaign>[] = [
    { accessorKey: 'id', label: 'Id', sortable: true, render: (row) => `#${row.id}` },
    { accessorKey: 'internalName', label: 'Internal Name', render: (row) => row.internalName },
    { accessorKey: 'createdAt', label: 'Date', render: (row) => new Date(row.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric'}) },
    { accessorKey: 'amountRaised', label: 'Raised', sortable: true, render: (row) => row.isActive === false ? '-' : `$${(row.amountRaised || 0).toLocaleString()}`},
    { accessorKey: 'donations', label: 'Donations', sortable: true, render: (row) => row.isActive === false ? '-' : (row.donations || 0).toLocaleString() },
    { accessorKey: 'isActive', label: 'Status', render: (row) => (
      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize ${
        row.isActive === false ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
      }`}>
        {row.isActive}
      </span>
    )},
  ];

  // 3. Define the specific action for clicking a row
  const handleRowClick = (row: Campaign) => {
    router.push(`/campaigns/${row.id}`);
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

export default CampaignsTable;