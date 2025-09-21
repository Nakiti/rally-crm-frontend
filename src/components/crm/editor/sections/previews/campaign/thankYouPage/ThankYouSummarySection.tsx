import React from 'react';

// Define the shape of the props this component expects
interface ThankYouSummarySectionProps {
  amount?: string;
  fund?: string;
  transactionId?: string;
  total?: string;
}

// This is a simple, "dumb" component. It just receives props and renders UI.
export function ThankYouSummarySection({ 
  amount = '$50.00',
  fund = 'Example Fund',
  transactionId = 'Transaction-ID',
  total = '$50.00'
}: ThankYouSummarySectionProps) {
  return (
    <div className="bg-slate-50 p-4 mb-6 text-left rounded-lg">
      <h3 className="font-semibold mb-3 text-sm text-slate-800">
        Donation Summary
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-600">Amount:</span>
          <span className="font-semibold text-sm text-slate-800">
            {amount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Fund:</span>
          <span className="font-semibold text-sm text-slate-800">
            {fund}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Transaction ID:</span>
          <span className="font-mono text-xs text-slate-600">
            {transactionId}
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
