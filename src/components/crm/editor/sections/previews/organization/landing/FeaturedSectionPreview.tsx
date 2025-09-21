import React from 'react';
import { Users, Heart, TrendingUp } from 'lucide-react';

interface FeaturedSectionPreviewProps {
  headlineOne?: string;
  descriptionOne?: string;
  imageOne?: string;
  headlineTwo?: string;
  descriptionTwo?: string;
  imageTwo?: string;
  headlineThree?: string;
  descriptionThree?: string;
  imageThree?: string;

}

export function FeaturedSectionPreview({
  headlineOne = "Community Programs",
  descriptionOne = "Supporting local initiatives that make a real difference in people's lives.",
  imageOne,
  headlineTwo = "Volunteer Network",
  descriptionTwo = "Connecting dedicated volunteers with meaningful opportunities to serve.",
  imageTwo,
  headlineThree = "Education & Training",
  descriptionThree = "Providing resources and training to empower individuals and communities.",
  imageThree,

}: FeaturedSectionPreviewProps) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];

  const programs = [
    {
      image: imageOne || defaultImages[0],
      title: headlineOne,
      description: descriptionOne,
      icon: <Users className="w-5 h-5" />
    },
    {
      image: imageTwo || defaultImages[1],
      title: headlineTwo,
      description: descriptionTwo,
      icon: <Heart className="w-5 h-5" />
    },
    {
      image: imageThree || defaultImages[2],
      title: headlineThree,
      description: descriptionThree,
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  return (
    <div className="px-8 py-20 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="font-bold mb-6 text-gray-900 text-4xl">
          Our Programs
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Discover the various programs and initiatives that make our organization unique
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {programs.map((program, index) => (
          <div 
            key={index} 
            className={`bg-white border border-gray-100 overflow-hidden transition-all duration-200 rounded-xl`}
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={program.image}
                alt={program.title}
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold mb-3 text-gray-900 text-xl">
                {program.title}
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4 text-lg">
                {program.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
