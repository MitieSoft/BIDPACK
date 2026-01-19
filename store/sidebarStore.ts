import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleSidebar: () => void
  collapseSidebar: () => void
  expandSidebar: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      toggleSidebar: () =>
        set((state) => ({ isCollapsed: !state.isCollapsed })),
      collapseSidebar: () => set({ isCollapsed: true }),
      expandSidebar: () => set({ isCollapsed: false }),
      toggleMobileMenu: () =>
        set((state) => ({ isMobileOpen: !state.isMobileOpen })),
      closeMobileMenu: () => set({ isMobileOpen: false })
    }),
    {
      name: 'sidebar-storage',
      partialize: (state) => ({ isCollapsed: state.isCollapsed })
    }
  )
)


