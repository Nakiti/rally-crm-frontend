import React from 'react';
import { Building2, Menu } from 'lucide-react';
import Link from 'next/link';
import { useCrmUI } from '@/hooks/crm/useCrmUI';
import { usePathname } from 'next/navigation';

interface OrganizationHeaderProps {
  organizationName?: string;
  logoUrl?: string;
  showLogo?: boolean;
}

export function OrganizationHeader({ 
  organizationName = 'Organization',
  logoUrl,
  showLogo = true
}: OrganizationHeaderProps) {
  const { toggleSidebar } = useCrmUI();
  const pathname = usePathname();
  
  // Check if we're on a dashboard route
  const isDashboardRoute = pathname.includes('/dashboard');

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Organization Name */}
          <div className="flex items-center space-x-3">
            {/* Sidebar Toggle Button - only show on dashboard routes */}
            {isDashboardRoute && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            
            {showLogo && (
              <div className="flex-shrink-0">
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt={`${organizationName} logo`}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-slate-600" />
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-slate-900">
                {organizationName}
              </h1>
            </div>
          </div>

          {/* Optional right side content */}
          <div className="flex items-center space-x-4">
            <Link href="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
