import React from 'react';

interface WhatSectionProps {
  whatText?: string;
  aboutImage?: string;
}

export function WhatSection({ 
  whatText = "We provide innovative solutions to address the most pressing challenges facing our community. Through strategic partnerships and evidence-based approaches, we create sustainable impact that transforms lives.",
  aboutImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
}: WhatSectionProps) {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h3 className="font-bold mb-4 text-3xl text-gray-900">
          What We Do
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="leading-relaxed text-lg text-gray-600">
            {whatText}
          </p>
        </div>
        <div className="relative">
          <img 
            src={aboutImage} 
            alt="About" 
            className="w-full h-80 object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-20 to-transparent rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
