'use client'

// AI Usage History Component
import { useEffect, useState } from 'react'
import { getAIHistory } from '@/lib/api/aiService'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import TableSkeleton from '@/components/ui/TableSkeleton'
import EmptyState from '@/components/ui/EmptyState'
import { format } from 'date-fns'
import { MagnifyingGlassIcon, ArrowDownTrayIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { AIRequest } from '@/types'

export default function AIUsageHistory() {
  const [history, setHistory] = useState<AIRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionTypeFilter, setActionTypeFilter] = useState<string>('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    loadHistory()
  }, [actionTypeFilter, startDate, endDate])

  const loadHistory = async () => {
    try {
      const data = await getAIHistory({
        actionType: actionTypeFilter !== 'all' ? actionTypeFilter : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      })
      setHistory(data)
    } catch (error) {
      toast.error('Failed to load AI history')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    // Mock CSV export
    const csv = [
      ['Date', 'Action Type', 'ACUs Used', 'Tokens Used', 'Status'].join(','),
      ...history.map((entry) =>
        [
          new Date(entry.createdAt).toISOString(),
          entry.actionType,
          entry.acusUsed,
          entry.tokensUsed,
          entry.status,
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-history-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('History exported successfully')
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'failed':
        return 'error'
      case 'pending':
        return 'warning'
      default:
        return 'default'
    }
  }

  const actionTypeLabels: Record<string, string> = {
    generate_paragraph: 'Generate Paragraph',
    refine_section: 'Refine Section',
    compliance_gap_explain: 'Explain Gap',
    social_value_refine: 'Refine Social Value',
  }

  if (isLoading) {
    return <TableSkeleton rows={5} columns={5} />
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex gap-4">
          <select
            value={actionTypeFilter}
            onChange={(e) => setActionTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Actions</option>
            <option value="generate_paragraph">Generate Paragraph</option>
            <option value="refine_section">Refine Section</option>
            <option value="compliance_gap_explain">Explain Gap</option>
            <option value="social_value_refine">Refine Social Value</option>
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
                  Date/Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ACUs Used
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tokens Used
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {history.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8">
                    <EmptyState
                      icon={<SparklesIcon className="h-12 w-12" />}
                      title="No AI requests found"
                      description="Your AI usage history will appear here once you start using AI features"
                    />
                  </td>
                </tr>
              ) : (
                history.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {format(new Date(entry.createdAt), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {actionTypeLabels[entry.actionType] || entry.actionType}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {entry.acusUsed} ACUs
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {entry.tokensUsed.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(entry.status)} size="sm">
                        {entry.status}
                      </Badge>
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

