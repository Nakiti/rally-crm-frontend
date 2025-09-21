'use client';

import React from 'react';
import { HeaderSectionProps } from './types';

/**
 * A component that displays the page title and description in the header section.
 */
export const HeaderSection: React.FC<HeaderSectionProps> = ({ title }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-700 flex items-center justify-center rounded">
        <span className="text-gray-300 text-lg font-semibold">
          {title?.charAt(0) || 'A'}
        </span>
      </div>
      <div>
        <h1 className="text-xl font-semibold text-white">{title || 'Untitled Page'}</h1>
        <p className="text-sm text-gray-400">Configure your page settings and design</p>
      </div>
    </div>
  );
};

export default HeaderSection;
