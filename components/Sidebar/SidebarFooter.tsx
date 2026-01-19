'use client'

import { useSidebarStore } from '@/store/sidebarStore'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getACUBalance } from '@/lib/api/acuService'
import { cn } from '@/lib/utils/cn'

export function SidebarFooter() {
  const { isCollapsed } = useSidebarStore()
  const { user, logout: authLogout } = useAuthStore()
  const router = useRouter()
  const [acuBalance, setAcuBalance] = useState<number | null>(null)

  useEffect(() => {
    if (user) {
      getACUBalance()
        .then((balance) => setAcuBalance(balance.balance))
        .catch(() => {})
    }
  }, [user])

  const handleLogout = () => {
    authLogout()
    router.push('/login')
  }

  if (!user) return null

  const userName = `${user.firstName} ${user.lastName}`
  const userEmail = user.email
  const role = user.role.charAt(0).toUpperCase() + user.role.slice(1)

  const initials = userName
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()

  return (
    <div className="border-t border-gray-200 px-3 py-3 dark:border-gray-800">
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800',
          isCollapsed && 'justify-center'
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
          {initials}
        </div>
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-gray-900 dark:text-gray-100">
                  {userName}
                </p>
                <p className="truncate text-[11px] text-gray-500 dark:text-gray-400">
                  {userEmail}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {role}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
              <span>ACUs</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                {acuBalance ?? '...'}
              </span>
            </div>
          </div>
        )}
      </div>
      {!isCollapsed && (
        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 w-full rounded-md border border-gray-200 px-2 py-1.5 text-center text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Logout
        </button>
      )}
    </div>
  )
}


