import { useCrmUIStore } from '@/stores';

/**
 * Custom hook for accessing CRM UI state and actions
 * Provides a clean interface to the Zustand store
 */
export const useCrmUI = () => {
  const store = useCrmUIStore();
  
  return {
    // Sidebar state
    isSidebarCollapsed: store.isSidebarCollapsed,
    toggleSidebar: store.toggleSidebar,
    setSidebarCollapsed: store.setSidebarCollapsed,
    
    // Mobile navigation state
    isMobileMenuOpen: store.isMobileMenuOpen,
    setMobileMenuOpen: store.setMobileMenuOpen,
    toggleMobileMenu: store.toggleMobileMenu,
    
    // Profile dropdown state
    isProfileDropdownOpen: store.isProfileDropdownOpen,
    setProfileDropdownOpen: store.setProfileDropdownOpen,
    toggleProfileDropdown: store.toggleProfileDropdown,
  };
};
