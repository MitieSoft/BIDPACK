'use client'

// Organization Management Component
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { listOrgs, suspendOrg } from '@/lib/api/adminService'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { MagnifyingGlassIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { OrgWithStats } from '@/lib/api/adminService'

export default function OrgManagement() {
  const router = useRouter()
  const [orgs, setOrgs] = useState<OrgWithStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [abuseFilter, setAbuseFilter] = useState<string>('all')

  useEffect(() => {
    loadOrgs()
  }, [searchQuery, statusFilter, abuseFilter])

  const loadOrgs = async () => {
    try {
      const data = await listOrgs({
        search: searchQuery || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        abuseFlagged: abuseFilter === 'flagged' ? true : abuseFilter === 'not-flagged' ? false : undefined,
      })
      setOrgs(data)
    } catch (error) {
      toast.error('Failed to load organizations')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuspend = async (orgId: string, orgName: string) => {
    if (!confirm(`Are you sure you want to suspend "${orgName}"?`)) {
      return
    }

    try {
      await suspendOrg(orgId)
      toast.success('Organization suspended successfully')
      loadOrgs()
    } catch (error: any) {
      toast.error(error.message || 'Failed to suspend organization')
    }
  }

  if (isLoading) {
    return <Card>Loading organizations...</Card>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search organizations..."
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
            <option value="active">Active</option>
            <option value="canceled">Canceled</option>
            <option value="past_due">Past Due</option>
          </select>
          <select
            value={abuseFilter}
            onChange={(e) => setAbuseFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All</option>
            <option value="flagged">Flagged</option>
            <option value="not-flagged">Not Flagged</option>
          </select>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ACU Usage
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Abuse
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {orgs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No organizations found
                  </td>
                </tr>
              ) : (
                orgs.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{org.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          org.subscriptionStatus === 'active' ? 'success' : org.subscriptionStatus === 'past_due' ? 'warning' : 'default'
                        }
                        size="sm"
                      >
                        {org.subscriptionStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {org.userCount}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {org.acuUsage} ACUs
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {org.abuseFlagged ? (
                        <Badge variant="error" size="sm">
                          <ShieldExclamationIcon className="h-4 w-4 mr-1" />
                          Flagged
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/orgs/${org.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSuspend(org.id, org.name)}
                      >
                        Suspend
                      </Button>
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

