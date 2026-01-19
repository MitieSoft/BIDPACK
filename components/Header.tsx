'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { useSidebarStore } from '@/store/sidebarStore'
import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { getACUBalance } from '@/lib/api/acuService'

export function Header() {
  const { toggleMobileMenu } = useSidebarStore()
  const { user } = useAuthStore()
  const [acuBalance, setAcuBalance] = useState<{ balance: number; monthlyAllocation: number } | null>(null)

  useEffect(() => {
    if (user) {
      getACUBalance()
        .then((balance) => setAcuBalance({ balance: balance.balance, monthlyAllocation: balance.monthlyAllocation }))
        .catch(() => {})
    }
  }, [user])

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : 'AA'

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:pl-72">
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label="Open sidebar"
          aria-expanded={false}
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          BidPack UK
        </span>
      </div>
      <div className="hidden items-center gap-3 lg:flex">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          We stop contractors getting disqualified before scoring.
        </span>
      </div>
      <div className="flex items-center gap-3">
        {acuBalance && (
          <div className="hidden items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-200 sm:flex">
            <span>ACUs</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] shadow-sm dark:bg-gray-900">
              {acuBalance.balance} / {acuBalance.monthlyAllocation}
            </span>
          </div>
        )}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
          {initials}
        </div>
      </div>
    </header>
  )
}


