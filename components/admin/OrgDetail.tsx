'use client'

// Organization Detail Component
import { useEffect, useState } from 'react'
import { getOrgDetail, suspendOrg, flagOrg, unflagOrg } from '@/lib/api/adminService'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { format } from 'date-fns'
import { ShieldExclamationIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { Organization, Subscription, User, AIRequest } from '@/types'

interface OrgDetailProps {
  orgId: string
}

export default function OrgDetail({ orgId }: OrgDetailProps) {
  const [org, setOrg] = useState<Organization | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [acuUsage, setAcuUsage] = useState(0)
  const [aiRequests, setAiRequests] = useState<AIRequest[]>([])
  const [abuseFlags, setAbuseFlags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadOrgDetail()
  }, [orgId])

  const loadOrgDetail = async () => {
    try {
      const data = await getOrgDetail(orgId)
      setOrg(data.org)
      setSubscription(data.subscription)
      setUsers(data.users)
      setAcuUsage(data.acuUsage)
      setAiRequests(data.aiRequests)
      setAbuseFlags(data.abuseFlags)
    } catch (error) {
      toast.error('Failed to load organization details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuspend = async () => {
    if (!confirm(`Are you sure you want to suspend "${org?.name}"?`)) {
      return
    }

    try {
      await suspendOrg(orgId)
      toast.success('Organization suspended successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to suspend organization')
    }
  }

  const handleFlag = async () => {
    const reason = prompt('Enter flag reason:')
    if (!reason) return

    try {
      await flagOrg(orgId, reason)
      toast.success('Organization flagged successfully')
      loadOrgDetail()
    } catch (error: any) {
      toast.error(error.message || 'Failed to flag organization')
    }
  }

  const handleUnflag = async () => {
    try {
      await unflagOrg(orgId)
      toast.success('Organization unflagged successfully')
      loadOrgDetail()
    } catch (error: any) {
      toast.error(error.message || 'Failed to unflag organization')
    }
  }

  if (isLoading) {
    return <Card>Loading organization details...</Card>
  }

  if (!org) {
    return <Card>Organization not found</Card>
  }

  return (
    <div className="space-y-6">
      {/* Organization Info */}
      <Card>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{org.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Created: {format(new Date(org.createdAt), 'MMM d, yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
            {abuseFlags.length > 0 ? (
              <Button variant="secondary" onClick={handleUnflag}>
                <XCircleIcon className="h-5 w-5 mr-2" />
                Unflag
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleFlag}>
                <ShieldExclamationIcon className="h-5 w-5 mr-2" />
                Flag
              </Button>
            )}
            <Button variant="error" onClick={handleSuspend}>
              Suspend
            </Button>
          </div>
        </div>

        {abuseFlags.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">Abuse Flags</h3>
            <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
              {abuseFlags.map((flag, index) => (
                <li key={index}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Subscription</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {subscription?.planType || 'None'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Users</p>
            <p className="font-medium text-gray-900 dark:text-white">{users.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ACU Usage</p>
            <p className="font-medium text-gray-900 dark:text-white">{acuUsage} ACUs</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Requests</p>
            <p className="font-medium text-gray-900 dark:text-white">{aiRequests.length}</p>
          </div>
        </div>
      </Card>

      {/* Users */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge variant="default" size="sm">
                      {user.role}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Requests */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent AI Requests</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ACUs
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {aiRequests.slice(0, 10).map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {format(new Date(request.createdAt), 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {request.actionType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {request.acusUsed}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge
                      variant={request.status === 'completed' ? 'success' : request.status === 'failed' ? 'error' : 'default'}
                      size="sm"
                    >
                      {request.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

