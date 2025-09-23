import React from 'react';

interface StorySectionProps {
  title?: string;
  text?: string;
  storyImage?: string;
}

export function StorySection({ 
  title = "Our Story",
  text = "We are dedicated to making a positive impact in our community through innovative solutions and unwavering commitment to our mission. Our journey began with a simple belief that together, we can create lasting change.",
  storyImage,
}: StorySectionProps) {
  return (
    <div className="text-center mb-20">
      <div className="inline-block mb-6">
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>
      <h2 className="font-bold mb-8 text-4xl text-gray-900">
        {title}
      </h2>
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="leading-relaxed text-lg text-gray-600">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
