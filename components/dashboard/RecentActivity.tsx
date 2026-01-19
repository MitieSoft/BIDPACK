'use client'

// Recent Activity Component
import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { getRecentActivity } from '@/lib/api/dashboardService'
import { format, formatDistanceToNow } from 'date-fns'
import {
  DocumentTextIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import type { RecentActivity as RecentActivityType } from '@/lib/api/dashboardService'

const activityIcons: Record<RecentActivityType['type'], typeof DocumentTextIcon> = {
  bid: DocumentTextIcon,
  policy: FolderIcon,
  method_statement: ClipboardDocumentListIcon,
  ai_request: SparklesIcon,
  export: ArrowDownTrayIcon,
}

const activityColors: Record<RecentActivityType['type'], string> = {
  bid: 'text-blue-600 dark:text-blue-400',
  policy: 'text-green-600 dark:text-green-400',
  method_statement: 'text-purple-600 dark:text-purple-400',
  ai_request: 'text-yellow-600 dark:text-yellow-400',
  export: 'text-indigo-600 dark:text-indigo-400',
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<RecentActivityType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadActivities()
  }, [])

  const loadActivities = async () => {
    try {
      const data = await getRecentActivity(8)
      setActivities(data)
    } catch (error) {
      console.error('Failed to load activities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading activities...</div>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">No recent activity</div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type]
            const colorClass = activityColors[activity.type]

            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

