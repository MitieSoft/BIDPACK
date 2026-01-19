'use client'

// Ledger Viewer Component
import { useEffect, useState } from 'react'
import { getGlobalACULedger } from '@/lib/api/adminService'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { format } from 'date-fns'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { ACULedgerEntry } from '@/types'

export default function LedgerViewer() {
  const [ledger, setLedger] = useState<ACULedgerEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [orgFilter, setOrgFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    loadLedger()
  }, [orgFilter, typeFilter, startDate, endDate])

  const loadLedger = async () => {
    try {
      const data = await getGlobalACULedger({
        orgId: orgFilter || undefined,
        type: typeFilter !== 'all' ? typeFilter : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      })
      setLedger(data)
    } catch (error) {
      toast.error('Failed to load ledger')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const csv = [
      ['Date', 'Org ID', 'Type', 'Amount', 'Balance After', 'Description'].join(','),
      ...ledger.map((entry) =>
        [
          new Date(entry.createdAt).toISOString(),
          entry.orgId,
          entry.transactionType,
          entry.amount,
          entry.balanceAfter,
          entry.description,
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `acu-ledger-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Ledger exported successfully')
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

  if (isLoading) {
    return <Card>Loading ledger...</Card>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex gap-4">
          <input
            type="text"
            placeholder="Filter by Org ID..."
            value={orgFilter}
            onChange={(e) => setOrgFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Types</option>
            <option value="grant">Grant</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
            <option value="topup">Top-up</option>
            <option value="expiry">Expiry</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <Button variant="secondary" onClick={handleExport}>
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Org ID
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
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No ledger entries found
                  </td>
                </tr>
              ) : (
                ledger.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {format(new Date(entry.createdAt), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {entry.orgId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant={getTypeBadgeVariant(entry.transactionType)} size="sm">
                        {entry.transactionType}
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
    </div>
  )
}

