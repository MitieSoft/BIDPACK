'use client'

// Recent Bids Component
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { getRecentBids } from '@/lib/api/dashboardService'
import { format, isAfter, differenceInDays } from 'date-fns'
import { DocumentTextIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import type { Bid } from '@/types'

const statusColors: Record<Bid['status'], string> = {
  draft: 'default',
  in_progress: 'success',
  ready: 'warning',
  submitted: 'success',
}

export default function RecentBids() {
  const router = useRouter()
  const [bids, setBids] = useState<Bid[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadBids()
  }, [])

  const loadBids = async () => {
    try {
      const data = await getRecentBids(5)
      setBids(data)
    } catch (error) {
      console.error('Failed to load bids:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const daysUntil = differenceInDays(deadlineDate, now)

    if (isAfter(now, deadlineDate)) {
      return { text: 'Overdue', color: 'error' }
    } else if (daysUntil <= 7) {
      return { text: `${daysUntil} days left`, color: 'warning' }
    } else {
      return { text: `${daysUntil} days left`, color: 'default' }
    }
  }

  if (isLoading) {
    return (
      <Card>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading bids...</div>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Bids</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => router.push('/bids')}>
          View All
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {bids.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No bids yet. Create your first bid to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {bids.map((bid) => {
            const deadlineStatus = getDeadlineStatus(bid.deadline)

            return (
              <div
                key={bid.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => router.push(`/bids/${bid.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                    {bid.clientName}
                  </h4>
                  <Badge variant={statusColors[bid.status] as any} size="sm">
                    {bid.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Deadline: {format(new Date(bid.deadline), 'MMM d, yyyy')}</span>
                  <Badge variant={deadlineStatus.color as any} size="sm">
                    {deadlineStatus.text}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

