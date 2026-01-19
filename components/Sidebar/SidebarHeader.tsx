import { Bars3Icon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import { useSidebarStore } from '@/store/sidebarStore'
import { cn } from '@/lib/utils/cn'

export function SidebarHeader() {
  const { isCollapsed, toggleSidebar } = useSidebarStore()

  return (
    <div className="flex items-center justify-between px-3 py-4 border-b border-gray-200 dark:border-gray-800">
      <div className={cn('flex items-center gap-2', isCollapsed && 'justify-center w-full')}>
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-600 text-white font-semibold">
          B
        </div>
        {!isCollapsed && (
          <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            BidPack UK
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={toggleSidebar}
        className={cn(
          'inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800',
          isCollapsed && 'mx-auto'
        )}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <Bars3Icon className="h-4 w-4" />
        ) : (
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}


