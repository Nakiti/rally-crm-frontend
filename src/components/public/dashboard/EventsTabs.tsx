"use client";

import React from 'react';

interface EventsTabsProps {
  activeTab: 'registered' | 'past';
  onTabChange: (tab: 'registered' | 'past') => void;
  registeredCount: number;
  pastCount: number;
  className?: string;
}

const EventsTabs: React.FC<EventsTabsProps> = ({
  activeTab,
  onTabChange,
  registeredCount,
  pastCount,
  className = ''
}) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange('registered')}
          className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === 'registered'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Registered Events
          <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
            activeTab === 'registered'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {registeredCount}
          </span>
        </button>
        <button
          onClick={() => onTabChange('past')}
          className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
            activeTab === 'past'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Past Events
          <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
            activeTab === 'past'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {pastCount}
          </span>
        </button>
      </nav>
    </div>
  );
};

export default EventsTabs;
