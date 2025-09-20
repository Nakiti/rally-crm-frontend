import React from 'react';
import { Heart, Share2 } from 'lucide-react';

// Define the shape of the props this component expects
interface ThankYouActionsSectionProps {
  donateAgainText?: string;
  shareText?: string;
}

// This is a simple, "dumb" component. It just receives props and renders UI.
export function ThankYouActionsSection({ 
  donateAgainText = 'Donate Again',
  shareText = 'Share This Campaign'
}: ThankYouActionsSectionProps) {
  return (
    <div className="space-y-3 mb-6">
      <button 
        onClick={(e) => e.preventDefault()}
        className="w-full py-3 px-4 font-semibold bg-slate-600 text-white hover:bg-slate-700 transition-all duration-300 flex items-center justify-center space-x-2 rounded-md text-sm"
      >
        <Heart className="w-3 h-3" />
        <span>{donateAgainText}</span>
      </button>
      <button 
        onClick={(e) => e.preventDefault()}
        className="w-full py-3 px-4 font-semibold border border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center space-x-2 rounded-md text-sm"
      >
        <Share2 className="w-3 h-3" />
        <span>{shareText}</span>
      </button>
    </div>
  );
}
