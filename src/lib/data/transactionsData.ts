// Dummy data for transactions page

export interface Transaction {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  campaign: string;
  date: string;
  createdAt: string;
  receiptId?: string;
}

export const transactionsData: Transaction[] = [
  {
    id: 'txn_1234567890',
    amount: 250,
    status: 'completed',
    campaign: 'Annual Fund Drive',
    date: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-15T10:30:00Z',
    receiptId: 'receipt_001'
  },
  {
    id: 'txn_1234567891',
    amount: 100,
    status: 'completed',
    campaign: 'Emergency Relief',
    date: '2024-01-14T14:22:00Z',
    createdAt: '2024-01-14T14:22:00Z',
    receiptId: 'receipt_002'
  },
  {
    id: 'txn_1234567892',
    amount: 500,
    status: 'pending',
    campaign: 'Scholarship Fund',
    date: '2024-01-14T09:15:00Z',
    createdAt: '2024-01-14T09:15:00Z'
  },
  {
    id: 'txn_1234567893',
    amount: 75,
    status: 'completed',
    campaign: 'Annual Fund Drive',
    date: '2024-01-13T16:45:00Z',
    createdAt: '2024-01-13T16:45:00Z',
    receiptId: 'receipt_003'
  },
  {
    id: 'txn_1234567894',
    amount: 200,
    status: 'failed',
    campaign: 'Community Garden',
    date: '2024-01-12T11:20:00Z',
    createdAt: '2024-01-12T11:20:00Z'
  },
  {
    id: 'txn_1234567895',
    amount: 150,
    status: 'completed',
    campaign: 'Youth Programs',
    date: '2024-01-11T08:30:00Z',
    createdAt: '2024-01-11T08:30:00Z',
    receiptId: 'receipt_004'
  },
  {
    id: 'txn_1234567896',
    amount: 300,
    status: 'completed',
    campaign: 'Emergency Relief',
    date: '2024-01-10T15:45:00Z',
    createdAt: '2024-01-10T15:45:00Z',
    receiptId: 'receipt_005'
  },
  {
    id: 'txn_1234567897',
    amount: 50,
    status: 'refunded',
    campaign: 'Annual Fund Drive',
    date: '2024-01-09T12:00:00Z',
    createdAt: '2024-01-09T12:00:00Z'
  },
  {
    id: 'txn_1234567898',
    amount: 400,
    status: 'completed',
    campaign: 'Scholarship Fund',
    date: '2024-01-08T14:20:00Z',
    createdAt: '2024-01-08T14:20:00Z',
    receiptId: 'receipt_006'
  },
  {
    id: 'txn_1234567899',
    amount: 125,
    status: 'completed',
    campaign: 'Community Garden',
    date: '2024-01-07T09:10:00Z',
    createdAt: '2024-01-07T09:10:00Z',
    receiptId: 'receipt_007'
  }
];

export const getFilteredTransactions = (
  transactions: Transaction[],
  searchQuery: string,
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    campaign?: string;
  }
): Transaction[] => {
  return transactions.filter(transaction => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        transaction.id.toLowerCase().includes(query) ||
        transaction.campaign.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query);
      
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && transaction.status !== filters.status) {
      return false;
    }

    // Campaign filter
    if (filters.campaign) {
      const campaignMap: { [key: string]: string } = {
        'annual-fund': 'Annual Fund Drive',
        'emergency-relief': 'Emergency Relief',
        'scholarship-fund': 'Scholarship Fund',
        'community-garden': 'Community Garden'
      };
      if (transaction.campaign !== campaignMap[filters.campaign]) {
        return false;
      }
    }

    // Date filters
    if (filters.dateFrom) {
      const transactionDate = new Date(transaction.date);
      const fromDate = new Date(filters.dateFrom);
      if (transactionDate < fromDate) return false;
    }

    if (filters.dateTo) {
      const transactionDate = new Date(transaction.date);
      const toDate = new Date(filters.dateTo);
      if (transactionDate > toDate) return false;
    }

    return true;
  });
};
