import React from 'react';
import { Heart, Users, TrendingUp } from 'lucide-react';

interface MainSectionPreviewProps {
  title?: string;
  text?: string;
}

export function MainSectionPreview({
  title = "Making a Difference Together",
  text = "Our organization works tirelessly to create positive change in the community. Through innovative programs and dedicated volunteers, we're building a better future for everyone.",
}: MainSectionPreviewProps) {

  return (
    <div className="flex flex-col lg:flex-row w-full px-8 py-20 space-y-16 lg:space-y-0 lg:space-x-16">
      <div className="lg:w-2/3">
        <h2 className="font-bold mb-8 leading-tight text-gray-900 text-4xl">
          {title}
        </h2>
        <p className="leading-relaxed mb-12 text-gray-700 text-lg">
          {text}
        </p>
      </div>
    </div>
  );
}
