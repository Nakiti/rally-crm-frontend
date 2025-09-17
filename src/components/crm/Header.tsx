'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, MobileNavigation, SidebarItem } from '@/components/ui';
import { useCrmUI } from '@/hooks/crm/useCrmUI';
import { BarChart3, Target, Calendar, DollarSign, Globe, Settings, Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { 
    toggleSidebar, 
    isSidebarCollapsed, 
    isProfileDropdownOpen, 
    setProfileDropdownOpen 
  } = useCrmUI();

  const navigationItems: SidebarItem[] = [
    { name: 'Dashboard', href: '/home', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Campaigns', href: '/campaigns', icon: <Target className="w-5 h-5" /> },
    { name: 'Events', href: '/events', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Transactions', href: '/transactions', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'Website', href: '/website', icon: <Globe className="w-5 h-5" /> },
    { name: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Sidebar Toggle, Mobile Menu, and Logo */}
          <div className="flex items-center space-x-4">
            {/* Mobile Navigation */}
            <MobileNavigation items={navigationItems} />
            
            {/* Desktop Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="hidden md:block p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Logo and Brand */}
            <Link href="/home" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-lg font-bold text-gray-900">RallyCRM</span>
            </Link>
          </div>


          {/* User Profile and Actions */}
          <div className="flex items-center space-x-4">

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <Link
                    href="/settings/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <Link
                    href="/settings/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Account Settings
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      // Handle logout
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
