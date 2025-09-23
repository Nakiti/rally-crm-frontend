import React from 'react';

interface DonationHeaderSectionProps {
  headline?: string;
  message?: string;
}

export function DonationHeaderSection({
  headline = 'Make a Donation',
  message = 'Your generous contribution helps us continue our mission and make a positive impact in our community.',
}: DonationHeaderSectionProps) {
  return (
    <div className="text-center mb-6">
      <h1 className="font-bold mb-3 leading-tight text-slate-800 text-2xl">
        {headline}
      </h1>
      <p className="leading-relaxed max-w-md mx-auto text-slate-600 text-sm">
        {message}
      </p>
    </div>
  );
}
