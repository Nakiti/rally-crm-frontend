import React, { useState } from 'react';

interface FundSelectionSectionProps {
  onFundChange?: (fund: string) => void;
}

export function FundSelectionSection({ onFundChange }: FundSelectionSectionProps) {
  const [selectedFund, setSelectedFund] = useState<string>('');

  // Mock data for funds
  const funds = [
    { id: 'general', title: 'General Fund' },
    { id: 'emergency', title: 'Emergency Relief' },
    { id: 'education', title: 'Education Fund' },
    { id: 'healthcare', title: 'Healthcare Fund' },
  ];

  const handleFundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedFund(value);
    onFundChange?.(value);
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3 text-slate-800 text-base">
        Select Fund
      </h2>
      <select 
        className="w-full p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 bg-white text-sm rounded-md"
        value={selectedFund}
        onChange={handleFundChange}
      >
        <option value="" disabled>Choose a fund</option>
        {funds.map((fund) => (
          <option key={fund.id} value={fund.id}>
            {fund.title}
          </option>
        ))}
      </select>
    </div>
  );
}
