
'use client';

import React from 'react';
import { 
  BackButton, 
  StatusBadge, 
  ActionButtons, 
  HeaderSection, 
  NavigationTabs,
  WebsiteEditorNavbarProps 
} from './index';

/**
 * WebsiteEditorNavbar component that provides navigation and actions for the website editor.
 * This component is split into smaller, reusable components for better maintainability.
 */
export default function WebsiteEditorNavbar({
  title,
  isPublished,
  links,
  pageSlug
}: WebsiteEditorNavbarProps) {
  return (
    <div className="bg-gray-900 border-b border-gray-700 shadow-sm">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between px-6 py-3">
        <BackButton />
        
        <div className="flex items-center space-x-3">
          <StatusBadge isPublished={isPublished}/>
          
          <ActionButtons 
            isPublished={isPublished}
            pageSlug={pageSlug}
          />
        </div>
      </div>

      {/* Main Header */}
      <div className="px-6 py-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <HeaderSection title={title} />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6">
        <NavigationTabs links={links} />
      </div>
    </div>
  );
}