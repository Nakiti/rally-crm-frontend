import React from 'react';
import { Heart, Share2 } from 'lucide-react';

interface ThankYouActionsSectionProps {
  donateAgainText?: string;
  shareText?: string;
  onDonateAgain?: () => void;
  onShare?: () => void;
}

export function ThankYouActionsSection({ 
  donateAgainText = 'Donate Again',
  shareText = 'Share This Campaign',
  onDonateAgain,
  onShare
}: ThankYouActionsSectionProps) {
  return (
    <div className="space-y-3 mb-6">
      <button 
        onClick={onDonateAgain || (() => window.history.back())}
        className="w-full py-3 px-4 font-semibold bg-slate-600 text-white hover:bg-slate-700 transition-all duration-300 flex items-center justify-center space-x-2 rounded-md text-sm"
      >
        <Heart className="w-3 h-3" />
        <span>{donateAgainText}</span>
      </button>
      <button 
        onClick={onShare || (() => {})}
        className="w-full py-3 px-4 font-semibold border border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center space-x-2 rounded-md text-sm"
      >
        <Share2 className="w-3 h-3" />
        <span>{shareText}</span>
      </button>
    </div>
  );
}
