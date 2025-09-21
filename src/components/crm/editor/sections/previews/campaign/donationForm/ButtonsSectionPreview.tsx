import React from 'react';

// Define the shape of the props this component expects
interface ButtonsSectionPreviewProps {
  button1?: string;
  button2?: string;
  button3?: string;
  button4?: string;
  button5?: string;
  button6?: string;
}

export function ButtonsSectionPreview({
  button1 = '25',
  button2 = '50',
  button3 = '100',
  button4 = '250',
  button5 = '500',
  button6 = '1000',
}: ButtonsSectionPreviewProps) {
  const amounts = [button1, button2, button3, button4, button5, button6];

  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-3 text-slate-800 text-base">
        Choose Your Amount
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {amounts.map((amount, index) => (
          <button
            key={index}
            className="p-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 text-center rounded-md"
          >
            <div className="font-semibold text-sm text-slate-800">
              ${amount}
            </div>
          </button>
        ))}
        <input 
          className="p-3 border border-slate-200 focus:border-slate-300 focus:outline-none transition-all duration-200 text-center text-sm rounded-md"
          placeholder="Custom"
          style={{ 
            gridColumn: 'span 2'
          }}
        />
      </div>
    </div>
  );
}