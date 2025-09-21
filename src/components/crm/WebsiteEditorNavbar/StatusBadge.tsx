'use client';

import React from 'react';
import { StatusBadgeProps } from './types';

/**
 * A component that displays the current status of the page with a colored indicator.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ isPublished }) => {

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${isPublished ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
      <span className="text-xs text-gray-300 capitalize">
        {isPublished ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
};

export default StatusBadge;
