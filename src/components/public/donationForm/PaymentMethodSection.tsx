import React, { useState } from 'react';
import { CreditCard, User } from 'lucide-react';

interface PaymentMethodSectionProps {
  onPaymentMethodChange?: (method: string) => void;
}

export function PaymentMethodSection({ onPaymentMethodChange }: PaymentMethodSectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handleMethodClick = (method: string) => {
    setSelectedMethod(method);
    onPaymentMethodChange?.(method);
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3 text-slate-800 text-base">
        Payment Method
      </h2>
      <div className="space-y-2">
        <button 
          className={`w-full p-3 border transition-all duration-200 flex items-center justify-center space-x-2 rounded-md ${
            selectedMethod === 'paypal'
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
          onClick={() => handleMethodClick('paypal')}
        >
          <User className="text-blue-600 w-4 h-4" />
          <span className="font-semibold text-sm text-slate-800">PayPal</span>
        </button>
        <button 
          className={`w-full p-3 border transition-all duration-200 flex items-center justify-center space-x-2 rounded-md ${
            selectedMethod === 'credit'
              ? 'border-slate-600 bg-slate-50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
          onClick={() => handleMethodClick('credit')}
        >
          <CreditCard className="w-4 h-4 text-slate-600" />
          <span className="font-semibold text-sm text-slate-800">Credit Card</span>
        </button>
      </div>
    </div>
  );
}
