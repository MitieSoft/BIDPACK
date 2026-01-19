'use client'

// Bid List Component
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { listBids } from '@/lib/api/bidService'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import TableSkeleton from '@/components/ui/TableSkeleton'
import EmptyState from '@/components/ui/EmptyState'
import { format } from 'date-fns'
import { PlusIcon, MagnifyingGlassIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import type { Bid } from '@/types'

export default function BidList() {
  const router = useRouter()
  const [bids, setBids] = useState<Bid[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    loadBids()
  }, [])

  const loadBids = async () => {
    try {
      const data = await listBids()
      setBids(data)
    } catch (error) {
      console.error('Failed to load bids:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredBids = bids.filter((bid) => {
    const matchesSearch = bid.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || bid.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'success'
      case 'ready':
        return 'info'
      case 'in_progress':
        return 'warning'
      case 'draft':
        return 'default'
      default:
        return 'default'
    }
  }

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const daysUntil = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil <= 7 && daysUntil > 0
  }

  const isDeadlineOverdue = (deadline: string) => {
    return new Date(deadline) < new Date()
  }

  if (isLoading) {
    return <TableSkeleton rows={5} columns={4} />
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by client name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="in_progress">In Progress</option>
            <option value="ready">Ready</option>
            <option value="submitted">Submitted</option>
          </select>
        </div>
        <Button onClick={() => router.push('/bids/new')}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Bid
        </Button>
      </div>

      {filteredBids.length === 0 ? (
        <Card>
          <EmptyState
            icon={<DocumentTextIcon className="h-16 w-16" />}
            title={searchQuery || statusFilter !== 'all' ? 'No bids match your filters' : 'No bids yet'}
            description={
              searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first bid'
            }
            action={
              !searchQuery && statusFilter === 'all'
                ? {
                    label: 'Create Your First Bid',
                    onClick: () => router.push('/bids/new'),
                  }
                : undefined
            }
          />
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredBids.map((bid) => (
                  <tr
                    key={bid.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => router.push(`/bids/${bid.id}`)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {bid.clientName}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${
                          isDeadlineOverdue(bid.deadline)
                            ? 'text-red-600 dark:text-red-400 font-semibold'
                            : isDeadlineNear(bid.deadline)
                            ? 'text-yellow-600 dark:text-yellow-400 font-semibold'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {format(new Date(bid.deadline), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(bid.status)} size="sm">
                        {bid.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/bids/${bid.id}`)
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

