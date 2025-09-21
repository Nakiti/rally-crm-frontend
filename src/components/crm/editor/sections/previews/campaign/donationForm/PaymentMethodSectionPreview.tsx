import React from 'react';
import { CreditCard, User } from 'lucide-react';

// Define the shape of the props this component expects
interface PaymentMethodSectionPreviewProps {}

export function PaymentMethodSectionPreview({}: PaymentMethodSectionPreviewProps) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3 text-slate-800 text-base">
        Payment Method
      </h2>
      <div className="space-y-2">
        <button 
          className="w-full p-3 border border-slate-200 hover:border-slate-300 transition-all duration-200 flex items-center justify-center space-x-2 rounded-md"
        >
          <User className="text-blue-600 w-4 h-4" />
          <span className="font-semibold text-sm text-slate-800">PayPal</span>
        </button>
        <button 
          className="w-full p-3 border border-slate-600 hover:border-slate-700 transition-all duration-200 flex items-center justify-center space-x-2 rounded-md"
        >
          <CreditCard className="w-4 h-4 text-slate-600" />
          <span className="font-semibold text-sm text-slate-800">Credit Card</span>
        </button>
      </div>
    </div>
  );
}