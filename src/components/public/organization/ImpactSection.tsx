import React from 'react';

interface ImpactSectionProps {
  title?: string;
  text?: string;
  impactImage?: string;
}

export function ImpactSection({
  title = "Our Impact",
  text = "Through our programs and initiatives, we've helped thousands of individuals and families. Our impact is measured not just in numbers, but in the positive changes we see in our community every day.",
  impactImage,
}: ImpactSectionProps) {
  const defaultImage = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  
  return (
    <div className="flex flex-col lg:flex-row items-center space-y-16 lg:space-y-0 lg:space-x-20 w-full px-8 py-20">
      <div className="lg:w-1/2">
        <div className="relative">
          <img
            className="w-full h-96 object-cover rounded-xl shadow-2xl"
            src={impactImage || defaultImage}
            alt="Our Impact"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
        </div>
      </div>
      <div className="lg:w-1/2 space-y-8">
        <h2 className="font-bold leading-tight text-gray-900 text-4xl">
          {title}
        </h2>
        <p className="leading-relaxed text-gray-700 text-lg">
          {text}
        </p>
      </div>
    </div>
  );
}
