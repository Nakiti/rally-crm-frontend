'use client';

import { Sidebar, SidebarItem } from '@/components/ui';
import { BarChart3, Calendar, DollarSign, Settings, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCrmUI } from '@/hooks/crm/useCrmUI';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isSidebarCollapsed } = useCrmUI();

  const sidebarItems: SidebarItem[] = [
    { name: 'Home', href: '/dashboard/home', icon: <Home className="w-5 h-5" /> },
    { name: 'Events', href: '/dashboard/events', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Transactions', href: '/dashboard/transactions', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        items={sidebarItems} 
        className="h-screen sticky top-0"
      />
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}