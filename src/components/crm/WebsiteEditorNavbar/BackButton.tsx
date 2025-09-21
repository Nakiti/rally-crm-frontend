'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BackButtonProps } from './types';

/**
 * A reusable back button component that navigates from the website editor
 * back to the organization pages list.
 */
export const BackButton: React.FC<BackButtonProps> = () => {
  return (
    <Link 
      href={`/website/pages`} 
      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
      aria-label="Back to pages list"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-sm font-medium">Back to Pages</span>
    </Link>
  );
};

export default BackButton;
