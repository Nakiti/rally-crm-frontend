import React from 'react';

// Define the shape of the props this component expects
interface PersonalInfoSectionPreviewProps {}

export function PersonalInfoSectionPreview({}: PersonalInfoSectionPreviewProps) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3 text-slate-800 text-base">
        Your Information
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="First Name"
          disabled
        />
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="Last Name"
          disabled
        />
      </div>
      <input 
        className="w-full p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 mb-3 text-sm rounded-md"
        placeholder="Email Address"
        type="email"
        disabled
      />
      <input 
        className="w-full p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 mb-3 text-sm rounded-md"
        placeholder="Street Address"
        disabled
      />
      <div className="grid grid-cols-3 gap-3 mb-3">
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="City"
          disabled
        />
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="State"
          disabled
        />
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
          placeholder="ZIP Code"
          disabled
        />
      </div>
      <input 
        className="w-full p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-sm rounded-md"
        placeholder="Phone Number"
        type="tel"
        disabled
      />
    </div>
  );
}