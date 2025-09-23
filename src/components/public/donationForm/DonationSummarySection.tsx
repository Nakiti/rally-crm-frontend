import React from 'react';

interface DonationSummarySectionProps {
  amount?: number;
  fund?: string;
}

export function DonationSummarySection({ 
  amount = 25.00, 
  fund = 'General Fund' 
}: DonationSummarySectionProps) {
  return (
    <div className="bg-slate-50 p-4 mb-6 rounded-lg">
      <h3 className="font-semibold mb-3 text-sm text-slate-800">Donation Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Amount:</span>
          <span className="font-semibold text-sm text-slate-800">${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Fund:</span>
          <span className="font-semibold text-sm text-slate-800">{fund}</span>
        </div>
        <div className="border-t border-slate-200 pt-2 mt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-slate-800">Total:</span>
            <span className="font-bold text-base text-slate-900">${amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
