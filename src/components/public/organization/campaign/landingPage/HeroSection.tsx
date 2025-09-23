import React from 'react';
import { Heart, Share } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  headline?: string;
  description?: string;
  imageUrl?: string;
  donateButtonText?: string;
  shareButtonText?: string;
  organizationId?: string;
  campaignId?: string;
  status?: string;
}

export function HeroSection({
  headline = "Support Our Cause",
  description = "Your support makes a real difference in our community. Every donation, no matter the size, helps us achieve our mission and create positive change for those who need it most.",
  imageUrl = "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
  donateButtonText = "Donate Now",
  shareButtonText = "Share",
  organizationId,
  campaignId,
  status
}: HeroSectionProps) {
  return (
    <div 
      className="relative w-full h-[500px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center space-y-6 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-bold text-white leading-tight text-5xl">
            {headline}
          </h1>
          <p className="text-gray-100 max-w-3xl mx-auto leading-relaxed text-lg">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              href={status ? 
                `/organization/${organizationId}/campaign/${campaignId}/donation-form/preview` :
                `/organization/${organizationId}/campaign/${campaignId}/donation-form/`
              }
              className="font-semibold transition-all duration-300 flex items-center space-x-2 hover:opacity-90 text-white px-6 py-3 bg-blue-500 rounded"
            >
              <Heart className="w-4 h-4" />
              <span>{donateButtonText}</span>
            </Link>
            <button 
              className="font-semibold transition-all duration-300 flex items-center space-x-2 hover:opacity-90 text-white px-6 py-3 bg-gray-500 rounded"
            >
              <Share className="w-4 h-4" />
              <span>{shareButtonText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
