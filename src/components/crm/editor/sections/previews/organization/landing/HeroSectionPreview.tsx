import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionPreviewProps {
  headline?: string;
  message?: string;
  bannerImage?: string;

}

export function HeroSectionPreview({
  headline = "Welcome to Our Organization",
  message = "We're dedicated to making a positive impact in our community through innovative programs and dedicated service.",
  bannerImage,
}: HeroSectionPreviewProps) {
  const defaultImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80";
  
  return (
    <div className="relative w-full h-[500px]">
      <img
        className="w-full h-full object-cover"
        src={bannerImage || defaultImage}
        alt="Organization"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-8 px-6 bg-opacity-40">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-bold text-white leading-tight text-5xl">
            {headline}
          </h1>
          <p className="text-gray-100 max-w-3xl mx-auto leading-relaxed text-xl">
            {message}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              className={`font-semibold transition-all duration-300 flex items-center space-x-2 bg-blue-600 text-white px-10 py-4 rounded-lg text-base`}
            >
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
