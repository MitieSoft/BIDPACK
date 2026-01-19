'use client'

// Bid Status Distribution Chart Component
import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import { getBidStatusDistribution } from '@/lib/api/dashboardService'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import type { BidStatusData } from '@/lib/api/dashboardService'

const statusColors: Record<string, string> = {
  draft: 'bg-gray-400 dark:bg-gray-500',
  in_progress: 'bg-blue-500 dark:bg-blue-600',
  ready: 'bg-green-500 dark:bg-green-600',
  submitted: 'bg-purple-500 dark:bg-purple-600',
}

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  in_progress: 'In Progress',
  ready: 'Ready',
  submitted: 'Submitted',
}

export default function BidStatusChart() {
  const [data, setData] = useState<BidStatusData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const chartData = await getBidStatusDistribution()
      setData(chartData)
    } catch (error) {
      console.error('Failed to load chart data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading chart...</div>
        </div>
      </Card>
    )
  }

  const total = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <DocumentTextIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bid Status Distribution</h3>
      </div>

      <div className="space-y-4">
        {data.map((item) => {
          const percentage = total > 0 ? (item.count / total) * 100 : 0

          return (
            <div key={item.status}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {statusLabels[item.status] || item.status}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.count} ({percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${statusColors[item.status] || 'bg-gray-400'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No bids yet
        </div>
      )}
    </Card>
  )
}

