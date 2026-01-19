'use client'

// Analytics Dashboard Component
import { useEffect, useState } from 'react'
import { getAnalytics } from '@/lib/api/adminService'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface AnalyticsData {
  acuUsageOverTime: Array<{ date: string; usage: number }>
  aiRequestsOverTime: Array<{ date: string; requests: number }>
  orgGrowth: Array<{ date: string; count: number }>
  subscriptionDistribution: Array<{ plan: string; count: number }>
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    loadAnalytics()
  }, [startDate, endDate])

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics({
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      })
      setAnalytics(data)
    } catch (error) {
      toast.error('Failed to load analytics')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    if (!analytics) return

    const report = {
      period: `${startDate || 'All'} to ${endDate || 'Now'}`,
      acuUsage: analytics.acuUsageOverTime,
      aiRequests: analytics.aiRequestsOverTime,
      orgGrowth: analytics.orgGrowth,
      subscriptionDistribution: analytics.subscriptionDistribution,
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Analytics report exported')
  }

  if (isLoading) {
    return <Card>Loading analytics...</Card>
  }

  if (!analytics) {
    return <Card>No analytics data available</Card>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4">
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
          Export Report
        </Button>
      </div>

      {/* ACU Usage Over Time */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ACU Usage Over Time</h3>
        <div className="space-y-2">
          {analytics.acuUsageOverTime.map((point) => (
            <div key={point.date} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{point.date}</span>
              <div className="flex items-center gap-2">
                <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full"
                    style={{ width: `${(point.usage / 300) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-16 text-right">
                  {point.usage} ACUs
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Requests Over Time */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Requests Over Time</h3>
        <div className="space-y-2">
          {analytics.aiRequestsOverTime.map((point) => (
            <div key={point.date} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{point.date}</span>
              <div className="flex items-center gap-2">
                <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: `${(point.requests / 100) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-16 text-right">
                  {point.requests}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Organization Growth */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Organization Growth</h3>
        <div className="space-y-2">
          {analytics.orgGrowth.map((point) => (
            <div key={point.date} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{point.date}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{point.count} orgs</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Subscription Distribution */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subscription Distribution</h3>
        <div className="space-y-3">
          {analytics.subscriptionDistribution.map((dist) => (
            <div key={dist.plan}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400 capitalize">{dist.plan}</span>
                <span className="font-medium text-gray-900 dark:text-white">{dist.count} orgs</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (dist.count /
                        analytics.subscriptionDistribution.reduce((sum, d) => sum + d.count, 0)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

