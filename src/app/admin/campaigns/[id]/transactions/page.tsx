"use client"
import React from "react"
import { useGetDonationsByCampaign } from "@/hooks/crm/useDonation"
import CampaignTransactionsTable from "@/components/crm/CampaignTransactionsTable"

interface TransactionsPageProps {
  params: {
    campaignId: string;
    organizationId: string;
  };
}

/*
   Component: Transactions
   Description: Renders transactions relevant to a single campaign using existing components and hooks
*/
const Transactions: React.FC<TransactionsPageProps> = ({ params }) => {
  const { campaignId, organizationId } = params;
  
  // Use existing hook for data fetching
  const { data: donationsResponse, isLoading, error } = useGetDonationsByCampaign(campaignId);
  
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center h-32">
              <p className="text-red-500">Error loading transactions: {error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const donations = donationsResponse?.donations || [];

  return (
    <div className="p-6">
      <CampaignTransactionsTable
        donations={donations}
        organizationId={organizationId}
        campaignId={campaignId}
      />
    </div>
  );
};

export default Transactions;
