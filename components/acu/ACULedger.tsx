'use client'

// ACU Ledger Component
import { useEffect, useState } from 'react'
import { getACULedger } from '@/lib/api/acuService'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import TableSkeleton from '@/components/ui/TableSkeleton'
import EmptyState from '@/components/ui/EmptyState'
import { format } from 'date-fns'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import type { ACULedgerEntry } from '@/types'

export default function ACULedger() {
  const [ledger, setLedger] = useState<ACULedgerEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadLedger()
  }, [])

  const loadLedger = async () => {
    try {
      const data = await getACULedger()
      setLedger(data)
    } catch (error) {
      console.error('Failed to load ledger:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'grant':
      case 'credit':
      case 'topup':
        return 'success'
      case 'debit':
        return 'default'
      case 'expiry':
        return 'warning'
      default:
        return 'default'
    }
  }

  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')
  }

  if (isLoading) {
    return <TableSkeleton rows={5} columns={5} />
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ACU Transaction History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Balance After
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {ledger.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8">
                  <EmptyState
                    icon={<CurrencyDollarIcon className="h-12 w-12" />}
                    title="No transactions found"
                    description="Your ACU transaction history will appear here"
                  />
                </td>
              </tr>
            ) : (
              ledger.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {format(new Date(entry.createdAt), 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge variant={getTypeBadgeVariant(entry.transactionType)} size="sm">
                      {formatType(entry.transactionType)}
                    </Badge>
                  </td>
                  <td
                    className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${
                      entry.transactionType === 'debit' || entry.transactionType === 'expiry'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}
                  >
                    {entry.transactionType === 'debit' || entry.transactionType === 'expiry' ? '-' : '+'}
                    {entry.amount} ACUs
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {entry.balanceAfter} ACUs
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {entry.description}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

