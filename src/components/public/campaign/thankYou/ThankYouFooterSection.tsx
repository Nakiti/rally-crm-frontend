import React from 'react';

interface ThankYouFooterSectionProps {
  organizationName?: string;
  currentYear?: number;
}

export function ThankYouFooterSection({ 
  organizationName = 'Organization',
  currentYear = new Date().getFullYear()
}: ThankYouFooterSectionProps) {
  return (
    <div className="py-6 border-t border-gray-200 bg-slate-50">
      <div className="text-center">
        <p className="text-xs text-slate-600">
          &copy; {currentYear} {organizationName}. All rights reserved.
        </p>
        <div className="mt-1 space-x-4">
          <a 
            href="#" 
            className="text-xs hover:underline text-slate-600"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-xs hover:underline text-slate-600"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
}
