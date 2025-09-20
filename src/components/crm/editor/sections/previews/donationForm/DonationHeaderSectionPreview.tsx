import React from 'react';

// Define the shape of the props this component expects
interface DonationHeaderSectionPreviewProps {
  headline?: string;
  message?: string;
}

export function DonationHeaderSectionPreview({
  headline = 'Make a Donation',
  message = 'Your generous contribution helps us continue our mission and make a positive impact in our community.',
}: DonationHeaderSectionPreviewProps) {
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