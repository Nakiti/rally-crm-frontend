import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  title?: string;
  donationAmounts?: string[];
  donateButtonText?: string;
  addToCartButtonText?: string;
  showAmountGrid?: boolean;
  organizationId?: string;
  campaignId?: string;
  status?: string;
}

export function Sidebar({
  title = "Choose Your Amount",
  donationAmounts = ["25", "50", "100", "250", "500", "1000"],
  donateButtonText = "Donate Now",
  addToCartButtonText = "Add to Cart",
  showAmountGrid = true,
  organizationId,
  campaignId,
  status
}: SidebarProps) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-lg">
      <h3 className="font-semibold mb-6 text-blue-500">
        {title}
      </h3>
      {showAmountGrid && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          {donationAmounts.map((amount, index) => (
            <button
              key={index}
              className="p-4 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-center rounded-lg"
            >
              <div className="font-semibold text-blue-500">
                ${amount}
              </div>
              <div className="text-sm text-gray-500">
                Donation
              </div>
            </button>
          ))}
        </div>
      )}
      <Link 
        href={status ? 
          `/organization/${organizationId}/campaign/${campaignId}/donation-form/preview` :
          `/organization/${organizationId}/campaign/${campaignId}/donation-form/`
        }
        className="w-full py-4 px-6 font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 hover:opacity-90 bg-blue-500 rounded-lg"
      >
        <Heart className="w-4 h-4" />
        <span>{donateButtonText}</span>
      </Link>
      <button 
        className="mt-4 w-full py-4 px-6 font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 hover:opacity-90 bg-gray-500 rounded-lg"
      >
        <ShoppingCart className="w-4 h-4" />
        <span>{addToCartButtonText}</span>
      </button>
    </div>
  );
}
