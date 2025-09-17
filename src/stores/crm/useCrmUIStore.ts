import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CrmUIState {
  // Sidebar state
  isSidebarCollapsed: boolean;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Mobile navigation state
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  
  // Header state
  isProfileDropdownOpen: boolean;
  setProfileDropdownOpen: (open: boolean) => void;
  toggleProfileDropdown: () => void;
}

export const useCrmUIStore = create<CrmUIState>()(
  persist(
    (set, get) => ({
      // Initial state
      isSidebarCollapsed: false,
      isMobileMenuOpen: false,
      isProfileDropdownOpen: false,

      // Sidebar actions
      toggleSidebar: () => set((state) => ({ 
        isSidebarCollapsed: !state.isSidebarCollapsed 
      })),
      
      setSidebarCollapsed: (collapsed: boolean) => set({ 
        isSidebarCollapsed: collapsed 
      }),

      // Mobile menu actions
      setMobileMenuOpen: (open: boolean) => set({ 
        isMobileMenuOpen: open 
      }),
      
      toggleMobileMenu: () => set((state) => ({ 
        isMobileMenuOpen: !state.isMobileMenuOpen 
      })),

      // Profile dropdown actions
      setProfileDropdownOpen: (open: boolean) => set({ 
        isProfileDropdownOpen: open 
      }),
      
      toggleProfileDropdown: () => set((state) => ({ 
        isProfileDropdownOpen: !state.isProfileDropdownOpen 
      })),
    }),
    {
      name: 'crm-ui-storage', // unique name for localStorage key
      partialize: (state) => ({ 
        isSidebarCollapsed: state.isSidebarCollapsed 
      }), // only persist sidebar state
    }
  )
);
