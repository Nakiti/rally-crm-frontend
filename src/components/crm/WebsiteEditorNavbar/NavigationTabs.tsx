'use client';

import React from 'react';
import { NavigationTabsProps } from './types';

/**
 * A component that renders navigation tabs for different page types.
 */
export const NavigationTabs: React.FC<NavigationTabsProps> = ({ links }) => {
  return (
    <div className="flex space-x-1">
      {links.map((link, index) => (
        <button
          key={index}
          className={`px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-t cursor-pointer ${
            link.isActive 
              ? "text-white border-b-2 border-blue-500 bg-gray-800" 
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          {link}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
