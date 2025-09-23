import React from 'react';

interface ThankYouSummarySectionProps {
  amount?: string;
  fund?: string;
  transactionId?: string;
  total?: string;
  campaignName?: string;
  transactionDate?: string;
}

export function ThankYouSummarySection({ 
  amount = '$50.00',
  fund = 'General Fund',
  transactionId = 'TXN-123456',
  total = '$50.00',
  campaignName = 'Sample Campaign',
  transactionDate
}: ThankYouSummarySectionProps) {
  const formattedDate = transactionDate || new Date().toLocaleDateString();

  return (
    <div className="bg-slate-50 p-4 mb-6 text-left rounded-lg">
      <h3 className="font-semibold mb-3 text-sm text-slate-800">
        Donation Information
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-600">Amount Donated:</span>
          <span className="font-semibold text-sm text-slate-800">
            {amount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Campaign:</span>
          <span className="font-semibold text-sm text-slate-800">
            {campaignName}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Designation:</span>
          <span className="font-semibold text-sm text-slate-800">
            {fund}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Transaction Date:</span>
          <span className="font-semibold text-sm text-slate-800">
            {formattedDate}
          </span>
        </div>
        <div className="border-t border-slate-200 pt-2 mt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-sm text-slate-800">
              Total:
            </span>
            <span className="font-bold text-base text-slate-800">
              {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
