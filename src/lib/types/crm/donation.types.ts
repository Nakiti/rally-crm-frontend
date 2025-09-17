export type DonationStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface DonationAnswer {
  id: string;
  donationId: string;
  questionId: string;
  answerValue: string;
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  organizationId: string;
  campaignId: string;
  donorAccountId: string;
  designationId: string;
  amount: number;
  stripeChargeId: string | null;
  status: DonationStatus;
  createdAt: string;
  updatedAt: string;
  // Association properties
  campaign?: {
    id: string;
    title: string;
    slug: string;
  };
  designation?: {
    id: string;
    name: string;
  };
  donorAccount?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  organization?: {
    id: string;
    name: string;
  };
  answers?: DonationAnswer[];
}

export interface DonationFilters {
  page?: number;
  limit?: number;
  status?: DonationStatus;
  campaignId?: string;
  designationId?: string;
  donorEmail?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface DonationsResponse {
  donations: Donation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

