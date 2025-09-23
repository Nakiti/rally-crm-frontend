import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui';
import Table from '@/components/ui/Table';
import { ColumnDefinition } from '@/lib/types';
import { Receipt, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  campaign: string;
  date: string;
  receiptId?: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  className?: string;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  const columns: ColumnDefinition<Transaction>[] = [
    {
      accessorKey: 'id',
      label: 'Transaction',
      render: (transaction) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              #{transaction.id.slice(-8)}
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(transaction.date)}
            </div>
          </div>
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
              : transaction.status === 'failed'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        <p className="text-sm text-gray-600">Your complete donation history</p>
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
