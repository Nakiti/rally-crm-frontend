import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ThankYouHeaderSectionProps {
  headline?: string;
  message?: string;
}

export function ThankYouHeaderSection({ 
  headline, 
  message
}: ThankYouHeaderSectionProps) {
  return (
    <div className="bg-white p-6 text-center">
      {/* Success Icon */}
      <div className="mx-auto w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 rounded-xl">
        <CheckCircle className="text-emerald-600 text-xl" />
      </div>

      {/* Thank You Message */}
      <h1 className="font-bold mb-3 leading-tight text-2xl text-slate-800">
        {headline || "Thank You!"}
      </h1>
      
      <p className="leading-relaxed max-w-md mx-auto mb-6 text-sm text-slate-600">
        {message || "Your generous donation has been received and will make a real difference in our mission. We're incredibly grateful for your support!"}
      </p>
    </div>
  );
}
