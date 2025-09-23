import React from 'react';
import { Heart, Lock } from 'lucide-react';

interface SubmitSectionProps {
  onSubmit?: () => void;
}

export function SubmitSection({ onSubmit }: SubmitSectionProps) {
  const handleSubmit = () => {
    onSubmit?.();
  };

  return (
    <>
      {/* Security Notice */}
      <div className="flex items-center justify-center space-x-2 mb-4 text-slate-600">
        <Lock className="text-emerald-600 w-3 h-3" />
        <span className="text-xs">Your payment information is secure and encrypted</span>
      </div>

      {/* Submit Button */}
      <button 
        className="w-full py-3 px-4 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-slate-700 text-white rounded-md text-sm hover:bg-slate-800"
        onClick={handleSubmit}
      >
        <Heart className="w-3 h-3" />
        <span>Complete Donation</span>
      </button>
    </>
  );
}
