import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface AboutSectionPreviewProps {
  aboutText?: string;
  aboutImage?: string;
}

export function AboutSectionPreview({
  aboutText = "We are a dedicated team of professionals and volunteers committed to creating positive change in our community. Our mission is to provide support, resources, and opportunities for those who need them most.",
  aboutImage,
}: AboutSectionPreviewProps) {
  const defaultImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";
  
  const statistics = [
    { number: "500+", label: "Volunteers" },
    { number: "50+", label: "Programs" },
    { number: "10K+", label: "Lives Impacted" },
    { number: "15+", label: "Years Experience" }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center space-y-16 lg:space-y-0 lg:space-x-20 w-full px-8 py-20 bg-gray-50">
      <div className="lg:w-1/2 space-y-8">
        <div>
          <h2 className="font-bold mb-6 leading-tight text-gray-900 text-4xl">
            About Our Organization
          </h2>
          <p className="leading-relaxed text-gray-700 text-lg">
            {aboutText}
          </p>
        </div>
        
        {/* Enhanced About Features */}
        
        <button 
          className={`font-semibold transition-all duration-300 flex items-center space-x-2 bg-blue-600 text-white px-10 py-4 rounded-lg text-base`}
        >
          <span>Learn More</span>
        </button>
      </div>

      <div className="lg:w-1/2">
        <div className="relative">
          <img
            className="w-full h-80 object-cover rounded-xl"
            src={aboutImage || defaultImage}
            alt="About Us"
          />
        </div>
      </div>
    </div>
  );
}
