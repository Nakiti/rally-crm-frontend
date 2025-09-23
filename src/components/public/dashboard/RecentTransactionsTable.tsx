import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui';
import Table from '@/components/ui/Table';
import { ColumnDefinition } from '@/lib/types';
// Simple date formatting function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: '2-digit', 
    year: 'numeric' 
  });
};

interface Transaction {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  campaign: string;
  date: string;
  donorName: string;
}

interface RecentTransactionsTableProps {
  transactions: Transaction[];
  className?: string;
}

export const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({
  transactions,
  className = ''
}) => {
  const columns: ColumnDefinition<Transaction>[] = [
    {
      accessorKey: 'donorName',
      label: 'Donor',
      render: (transaction) => (
        <div className="font-medium text-gray-900">
          {transaction.donorName}
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      label: 'Amount',
      render: (transaction) => (
        <div className="font-semibold text-gray-900">
          ${transaction.amount.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'campaign',
      label: 'Campaign',
      render: (transaction) => (
        <div className="text-gray-600">
          {transaction.campaign}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      label: 'Status',
      render: (transaction) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            transaction.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : transaction.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </span>
      ),
    },
    {
      accessorKey: 'date',
      label: 'Date',
      render: (transaction) => (
        <div className="text-gray-600">
          {formatDate(transaction.date)}
        </div>
      ),
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <p className="text-sm text-gray-600">Latest donations from your supporters</p>
      </CardHeader>
      <CardContent className="p-0">
        <Table
          data={transactions}
          columns={columns}
        />
      </CardContent>
    </Card>
  );
};
