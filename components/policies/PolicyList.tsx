'use client'

// Policy List Component
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { listPolicies, deletePolicy, duplicatePolicy } from '@/lib/api/policyService'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import TableSkeleton from '@/components/ui/TableSkeleton'
import EmptyState from '@/components/ui/EmptyState'
import PolicyTypeBadge from './PolicyTypeBadge'
import { format } from 'date-fns'
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, DocumentDuplicateIcon, TrashIcon, FolderIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { Policy } from '@/types'

export default function PolicyList() {
  const router = useRouter()
  const [policies, setPolicies] = useState<Policy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  useEffect(() => {
    loadPolicies()
  }, [])

  const loadPolicies = async () => {
    try {
      const data = await listPolicies()
      setPolicies(data)
    } catch (error) {
      toast.error('Failed to load policies')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      await deletePolicy(id)
      toast.success('Policy deleted successfully')
      loadPolicies()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete policy')
    }
  }

  const handleDuplicate = async (id: string) => {
    try {
      await duplicatePolicy(id)
      toast.success('Policy duplicated successfully')
      loadPolicies()
    } catch (error: any) {
      toast.error(error.message || 'Failed to duplicate policy')
    }
  }

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || policy.policyType === typeFilter
    return matchesSearch && matchesType
  })

  if (isLoading) {
    return <TableSkeleton rows={5} columns={5} />
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Types</option>
            <option value="h&s_cdm">H&S CDM</option>
            <option value="quality">Quality</option>
            <option value="environmental">Environmental</option>
            <option value="gdpr">GDPR</option>
            <option value="modern_slavery">Modern Slavery</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push('/policies/templates')}>
            Browse Templates
          </Button>
          <Button onClick={() => router.push('/policies/new')}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Policy
          </Button>
        </div>
      </div>

      {filteredPolicies.length === 0 ? (
        <Card>
          <EmptyState
            icon={<FolderIcon className="h-16 w-16" />}
            title={searchQuery || typeFilter !== 'all' ? 'No policies match your filters' : 'No policies yet'}
            description={
              searchQuery || typeFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Start building your policy library'
            }
            action={
              !searchQuery && typeFilter === 'all'
                ? {
                    label: 'Create Your First Policy',
                    onClick: () => router.push('/policies/new'),
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
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <PolicyTypeBadge type={policy.policyType} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {policy.title}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(policy.lastUpdatedAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant="info" size="sm">
                        v{policy.version}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/policies/${policy.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/policies/${policy.id}/edit`)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDuplicate(policy.id)}>
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(policy.id, policy.title)}
                      >
                        <TrashIcon className="h-4 w-4" />
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

