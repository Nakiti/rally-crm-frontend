import React from 'react';

interface WhySectionProps {
  whyText?: string;
}

export function WhySection({ 
  whyText = "We believe in the power of community and the importance of giving back to create lasting positive change. Every action we take is driven by our commitment to building a better future for all.",
}: WhySectionProps) {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h3 className="font-bold mb-4 text-3xl text-gray-900">
          Why We Do It
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
          <p className="leading-relaxed text-lg text-center text-gray-600">
            {whyText}
          </p>
        </div>
      </div>
    </div>
  );
}
