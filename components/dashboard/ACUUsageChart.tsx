'use client'

// ACU Usage Chart Component
import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import { getACUUsageChartData } from '@/lib/api/dashboardService'
import { format } from 'date-fns'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import type { ACUUsageData } from '@/lib/api/dashboardService'

export default function ACUUsageChart() {
  const [data, setData] = useState<ACUUsageData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [days, setDays] = useState(30)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    loadData()
  }, [days])

  const loadData = async () => {
    try {
      const chartData = await getACUUsageChartData(days)
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

  const maxUsage = Math.max(...data.map((d) => d.usage), 1)
  const total = data.reduce((sum, d) => sum + d.usage, 0)
  const avg = total / data.length

  // Group data for better display (show every Nth day label)
  const labelInterval = days === 7 ? 1 : days === 30 ? 5 : 10

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CurrencyDollarIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ACU Usage Trend</h3>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 pr-2 w-10">
          <span className="text-right">{maxUsage}</span>
          <span className="text-right">{Math.floor(maxUsage / 2)}</span>
          <span className="text-right">0</span>
        </div>

        {/* Chart Area */}
        <div className="ml-12 h-64 flex items-end gap-1.5 pb-8 border-b border-gray-200 dark:border-gray-700">
          {data.map((point, index) => {
            const height = maxUsage > 0 ? (point.usage / maxUsage) * 100 : 0
            const isToday = index === data.length - 1
            const isHovered = hoveredIndex === index

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end group relative h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl z-10 whitespace-nowrap">
                    <div className="font-semibold">{format(new Date(point.date), 'MMM d, yyyy')}</div>
                    <div className="text-primary-300">{point.usage} ACUs</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
                    </div>
                  </div>
                )}

                {/* Bar */}
                <div
                  className={`w-full rounded-t transition-all duration-200 cursor-pointer ${
                    isToday
                      ? 'bg-primary-600 dark:bg-primary-500 ring-2 ring-primary-300 dark:ring-primary-700'
                      : isHovered
                      ? 'bg-primary-500 dark:bg-primary-400'
                      : 'bg-primary-400 dark:bg-primary-600'
                  }`}
                  style={{
                    height: `${Math.max(height, 2)}%`,
                    minHeight: point.usage > 0 ? '4px' : '2px',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* X-axis labels */}
        <div className="ml-12 mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          {data.map((point, index) => {
            if (index % labelInterval !== 0 && index !== data.length - 1) return null
            return (
              <div
                key={index}
                className="text-center"
                style={{ width: `${(100 / data.length) * labelInterval}%` }}
              >
                {format(new Date(point.date), days === 7 ? 'EEE' : 'MMM d')}
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Usage</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{total} ACUs</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Daily Average</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{Math.round(avg)} ACUs/day</p>
        </div>
      </div>
    </Card>
  )
}

