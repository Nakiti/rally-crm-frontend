import React from 'react';

// Define the shape of the props this component expects
interface StorySectionProps {
  title?: string;
  message?: string;
}

// This is a simple, "dumb" component. It just receives props and renders UI.
export function StorySectionPreview({ title, message }: StorySectionProps) {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {title || 'Our Story'}
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <p className="text-center">
            {message || 'Start typing your story here. Share your mission, your journey, and what makes your cause special. This is where you connect with your audience on a personal level and inspire them to take action.'}
          </p>
        </div>
      </div>
    </section>
  );
}
