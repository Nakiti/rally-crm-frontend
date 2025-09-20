'use client';

import { Header } from '@/components/crm/Header';
import { Sidebar, SidebarItem } from '@/components/ui';
import { BarChart3, Target, Calendar, DollarSign, Globe, Settings, User } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're on an editor route
  const isEditorRoute = pathname.includes('/editor');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated || !session) {
    return null;
  }

  // Use real user data from authentication context
  const user = {
    name: `${session.firstName} ${session.lastName}`,
    email: session.email || '',
    avatar: undefined, // You can add an avatar URL here
  };


  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', href: '/home', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Campaigns', href: '/campaigns', icon: <Target className="w-5 h-5" /> },
    { name: 'Events', href: '/events', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Transactions', href: '/transactions', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'Website', href: '/website', icon: <Globe className="w-5 h-5" /> },
    // { name: 'Profile', href: '/profile', icon: <User className="w-5 h-5" /> },
    { name: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header user={user} />
      
      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar - only show if not on editor route */}
        {!isEditorRoute && (
          <Sidebar 
            items={sidebarItems} 
            className="h-full"
          />
        )}
        
        {/* Main Content */}
        <main className={`flex-1 overflow-auto ${isEditorRoute ? 'w-full' : ''}`}>
          <div className={isEditorRoute ? 'w-full' : 'max-w-7xl mx-auto'}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
