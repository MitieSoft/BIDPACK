'use client'

import {
  HomeIcon,
  DocumentTextIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { useSidebarStore } from '@/store/sidebarStore'
import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { getACUBalance } from '@/lib/api/acuService'
import { SidebarHeader } from './Sidebar/SidebarHeader'
import { NavItem } from './Sidebar/NavItem'
import { SidebarFooter } from './Sidebar/SidebarFooter'
import { cn } from '@/lib/utils/cn'

export function Sidebar() {
  const { isCollapsed, isMobileOpen, closeMobileMenu } = useSidebarStore()
  const { user } = useAuthStore()
  const [acuBalance, setAcuBalance] = useState<number | null>(null)

  useEffect(() => {
    if (user) {
      getACUBalance()
        .then((balance) => setAcuBalance(balance.balance))
        .catch(() => {})
    }
  }, [user])

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Bids', href: '/bids', icon: DocumentTextIcon },
    { name: 'Policies', href: '/policies', icon: FolderIcon },
    { name: 'Method Statements', href: '/method-statements', icon: ClipboardDocumentListIcon },
    {
      name: 'ACU Dashboard',
      href: '/dashboard/acu',
      icon: CurrencyDollarIcon,
      badge: acuBalance?.toString() || '...',
    },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ]

  // Only show Admin link for owners/admins
  if (user && (user.role === 'owner' || user.role === 'admin')) {
    navItems.push({ name: 'Admin', href: '/admin', icon: ShieldCheckIcon })
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-16' : 'w-64',
          'hidden lg:flex lg:flex-col'
        )}
      >
        <SidebarHeader />
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                name={item.name}
                href={item.href}
                icon={item.icon}
                badge={item.badge}
              />
            ))}
          </ul>
        </nav>
        <SidebarFooter />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 transition-transform duration-300 ease-in-out lg:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarHeader />
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                name={item.name}
                href={item.href}
                icon={item.icon}
                badge={item.badge}
              />
            ))}
          </ul>
        </nav>
        <SidebarFooter />
      </aside>
    </>
  )
}
