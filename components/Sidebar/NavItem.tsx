import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentType, SVGProps } from 'react'
import { useSidebarStore } from '@/store/sidebarStore'
import { cn } from '@/lib/utils/cn'

interface NavItemProps {
  name: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  badge?: string | null
}

export function NavItem({ name, href, icon: Icon, badge }: NavItemProps) {
  const pathname = usePathname()
  const { isCollapsed } = useSidebarStore()

  const isActive = pathname === href || pathname?.startsWith(href + '/')

  return (
    <li>
      <Link
        href={href}
        className={cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
          'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
          isActive &&
            'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-medium'
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && (
          <>
            <span className="truncate">{name}</span>
            {badge && (
              <span className="ml-auto inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                {badge}
              </span>
            )}
          </>
        )}
        {isCollapsed && (
          <span
            className={cn(
              'pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-gray-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity',
              'group-hover:opacity-100'
            )}
          >
            {name}
          </span>
        )}
      </Link>
    </li>
  )
}


