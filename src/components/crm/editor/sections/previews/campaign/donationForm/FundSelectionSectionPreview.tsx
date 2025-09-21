import React from 'react';

// Define the shape of the props this component expects
interface FundSelectionSectionPreviewProps {}

export function FundSelectionSectionPreview({}: FundSelectionSectionPreviewProps) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3 text-slate-800 text-base">
        Select Fund
      </h2>
      <select 
        className="w-full p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 bg-white text-sm rounded-md"
        defaultValue=""
        disabled
      >
        <option value="" disabled>Choose a fund</option>
        <option value="general">General Fund</option>
        <option value="emergency">Emergency Relief</option>
        <option value="education">Education Fund</option>
      </select>
    </div>
  );
}