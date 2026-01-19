'use client'

// ACU Balance Component
import { useEffect, useState } from 'react'
import { getACUBalance } from '@/lib/api/acuService'
import Card from '@/components/ui/Card'
import type { ACUBalance as ACUBalanceType } from '@/types'

export default function ACUBalance() {
  const [balance, setBalance] = useState<ACUBalanceType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadBalance()
  }, [])

  const loadBalance = async () => {
    try {
      const data = await getACUBalance()
      setBalance(data)
    } catch (error) {
      console.error('Failed to load ACU balance:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Card>Loading balance...</Card>
  }

  if (!balance) {
    return <Card>Unable to load balance</Card>
  }

  const usagePercentage = balance.monthlyAllocation > 0
    ? (balance.usageThisMonth / balance.monthlyAllocation) * 100
    : 0

  return (
    <Card>
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Balance</p>
        <p className="text-5xl font-bold text-gray-900 dark:text-white">{balance.balance}</p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">ACUs</p>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Monthly Allocation</span>
            <span className="font-medium text-gray-900 dark:text-white">{balance.monthlyAllocation} ACUs</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Used This Month</span>
            <span className="font-medium text-gray-900 dark:text-white">{balance.usageThisMonth} ACUs</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all"
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {usagePercentage.toFixed(1)}% of monthly allocation used
          </p>
        </div>
      </div>
    </Card>
  )
}

