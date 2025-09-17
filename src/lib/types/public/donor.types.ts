import type { DonationStatus } from '../crm/donation.types.js';

export interface PublicCampaignInfo {
  id: string;
  externalName: string | null;
  slug: string;
  goalAmount: number | null;
  icon: string | null;
  isActive: boolean;
}

export interface PublicDesignationInfo {
  id: string;
  name: string;
  description: string | null;
  goalAmount: number | null;
  isArchived: boolean;
}

export interface PublicDonation {
  id: string;
  amount: number;
  status: DonationStatus;
  stripeChargeId: string | null;
  createdAt: string;
  updatedAt: string;
  campaign: PublicCampaignInfo | null;
  designation: PublicDesignationInfo | null;
}
