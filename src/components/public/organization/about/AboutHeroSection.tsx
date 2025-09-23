import React from 'react';

interface AboutHeroSectionProps {
  headline?: string;
  description?: string;
  bgImage?: string;
}

export function AboutHeroSection({ 
  headline = "About Our Organization",
  description = "We are dedicated to making a positive impact in our community through innovative solutions and unwavering commitment to our mission.",
  bgImage,
}: AboutHeroSectionProps) {
  const defaultImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
  
  return (
    <div className="relative w-full h-96 overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src={bgImage || defaultImage}
        alt="Organization"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-bold text-white text-6xl leading-tight">
            {headline}
          </h1>
          <p className="text-xl text-white text-opacity-90 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
