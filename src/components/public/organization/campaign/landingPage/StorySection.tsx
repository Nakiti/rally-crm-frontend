import React from 'react';
import { Share } from 'lucide-react';

interface StorySectionProps {
  title?: string;
  mainHeadline?: string;
  mainText?: string;
  shareButtonText?: string;
}

export function StorySection({
  title = "Fundraiser",
  mainHeadline = "Making a Difference Together",
  mainText = "Our organization works tirelessly to create positive change in the community. Through innovative programs and dedicated volunteers, we're building a better future for everyone.",
  shareButtonText = "Share"
}: StorySectionProps) {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-row justify-between mb-8 w-full">
          <div>
            <p className="text-md mb-2 text-gray-500">
              {title}
            </p>
            <h2 className="text-4xl font-semibold text-gray-900">
              {mainHeadline}
            </h2>
          </div>
          <button className="text-md hover:underline flex items-center space-x-1 text-blue-500">
            <Share className="w-4 h-4" />
            <span>{shareButtonText}</span>
          </button>
        </div>

        {/* Main Content Text */}
        <p className="leading-relaxed mb-8 text-gray-500">
          {mainText}
        </p>
      </div>
    </section>
  );
}
