import React from 'react';

// Define the shape of the props this component expects
interface DonationSummarySectionPreviewProps {}

export function DonationSummarySectionPreview({}: DonationSummarySectionPreviewProps) {
  return (
    <div className="bg-slate-50 p-4 mb-6 rounded-lg">
      <h3 className="font-semibold mb-3 text-sm text-slate-800">Donation Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Amount:</span>
          <span className="font-semibold text-sm text-slate-800">$25.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600">Fund:</span>
          <span className="font-semibold text-sm text-slate-800">General Fund</span>
        </div>
        <div className="border-t border-slate-200 pt-2 mt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-slate-800">Total:</span>
            <span className="font-bold text-base text-slate-900">$25.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}