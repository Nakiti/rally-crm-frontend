import React, { useState } from 'react';

interface ButtonsSectionProps {
  button1?: string;
  button2?: string;
  button3?: string;
  button4?: string;
  button5?: string;
  button6?: string;
  onAmountChange?: (amount: number) => void;
}

export function ButtonsSection({
  button1 = '25',
  button2 = '50',
  button3 = '100',
  button4 = '250',
  button5 = '500',
  button6 = '1000',
  onAmountChange,
}: ButtonsSectionProps) {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');

  const amounts = [button1, button2, button3, button4, button5, button6];

  const handleAmountClick = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    onAmountChange?.(parseFloat(amount));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
    onAmountChange?.(parseFloat(value) || 0);
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3 text-slate-800 text-base">
        Choose Your Amount
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {amounts.map((amount, index) => (
          <button
            key={index}
            className={`p-3 border transition-all duration-200 text-center rounded-md ${
              selectedAmount === amount
                ? 'border-slate-400 bg-slate-50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
            onClick={() => handleAmountClick(amount)}
          >
            <div className="font-semibold text-sm text-slate-800">
              ${amount}
            </div>
          </button>
        ))}
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-center text-sm rounded-md"
          placeholder="Custom"
          type="number"
          value={customAmount}
          onChange={handleCustomAmountChange}
          style={{ 
            gridColumn: 'span 2'
          }}
        />
      </div>
    </div>
  );
}
