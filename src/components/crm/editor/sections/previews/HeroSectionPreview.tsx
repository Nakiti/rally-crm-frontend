import React from 'react';

// Define the shape of the props this component expects
interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  imageUrl?: string;
  buttonText?: string;
}

// This is a simple, "dumb" component. It just receives props and renders UI.
export function HeroSectionPreview({ headline, subheadline, imageUrl, buttonText }: HeroSectionProps) {
  // Use a placeholder if the image URL is missing
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl || 'https://placehold.co/1200x600?text=Hero+Image'})`,
  };

  return (
    <section 
      className="h-96 bg-cover bg-center text-white flex flex-col items-center justify-center text-center p-8" 
      style={backgroundStyle}
    >
      <h1 className="text-4xl font-bold drop-shadow-md">{headline || 'Your Headline Here'}</h1>
      <p className="text-xl mt-4 drop-shadow-sm">{subheadline || 'A compelling subheadline about your cause.'}</p>
      {buttonText && (
        <button className="mt-8 px-8 py-3 bg-blue-600 rounded-md font-semibold hover:bg-blue-700">
          {buttonText}
        </button>
      )}
    </section>
  );
}
