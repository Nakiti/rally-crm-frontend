'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCrmUI } from '@/hooks/crm/useCrmUI';

export interface SidebarItem {
  name: string;
  href: string;
  icon: string | React.ReactNode;
  badge?: string | number;
}

export interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  className 
}) => {
  const { isSidebarCollapsed } = useCrmUI();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/home') {
      return pathname === '/home' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside 
      className={cn(
        'bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out',
        'flex flex-col h-full',
        'hidden md:flex', // Hide on mobile, show on desktop
        isSidebarCollapsed ? 'w-16' : 'w-56',
        className
      )}
    >
      {/* Sidebar Header */}
      {/* <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          {!isSidebarCollapsed && (
            <span className="ml-3 text-lg font-bold text-gray-900">RallyCRM</span>
          )}
        </div>
      </div> */}

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              'hover:bg-gray-50 group relative',
              isActive(item.href)
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:text-gray-900'
            )}
            title={isSidebarCollapsed ? item.name : undefined}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            
            {!isSidebarCollapsed && (
              <>
                <span className="ml-3 flex-1">{item.name}</span>
                {item.badge && (
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}

            {/* Tooltip for collapsed state */}
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.name}
                {item.badge && ` (${item.badge})`}
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        {!isSidebarCollapsed && (
          <div className="text-xs text-gray-500">
            <p>RallyCRM v1.0</p>
            <p>© 2024</p>
          </div>
        )}
      </div>
    </aside>
  );
};
