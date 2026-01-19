'use client'

// Abuse Detection Component
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAbuseFlags, suspendOrg, unflagOrg } from '@/lib/api/adminService'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { format } from 'date-fns'
import { ShieldExclamationIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface AbuseFlag {
  orgId: string
  orgName: string
  flags: string[]
  detectedAt: string
}

export default function AbuseDetection() {
  const router = useRouter()
  const [flags, setFlags] = useState<AbuseFlag[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadFlags()
  }, [])

  const loadFlags = async () => {
    try {
      const data = await getAbuseFlags()
      setFlags(data)
    } catch (error) {
      toast.error('Failed to load abuse flags')
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
      loadFlags()
    } catch (error: any) {
      toast.error(error.message || 'Failed to suspend organization')
    }
  }

  const handleUnflag = async (orgId: string) => {
    try {
      await unflagOrg(orgId)
      toast.success('Organization unflagged successfully')
      loadFlags()
    } catch (error: any) {
      toast.error(error.message || 'Failed to unflag organization')
    }
  }

  if (isLoading) {
    return <Card>Loading abuse flags...</Card>
  }

  return (
    <div className="space-y-4">
      {flags.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <ShieldExclamationIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No abuse flags detected</p>
          </div>
        </Card>
      ) : (
        flags.map((flag) => (
          <Card key={flag.orgId} className="border-red-200 dark:border-red-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldExclamationIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{flag.orgName}</h3>
                  <Badge variant="error" size="sm">
                    Flagged
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Detected: {format(new Date(flag.detectedAt), 'MMM d, yyyy HH:mm')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => handleUnflag(flag.orgId)}>
                  <XCircleIcon className="h-4 w-4 mr-1" />
                  Unflag
                </Button>
                <Button variant="error" size="sm" onClick={() => handleSuspend(flag.orgId, flag.orgName)}>
                  Suspend
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Flag Reasons:</p>
              <ul className="list-disc list-inside space-y-1">
                {flag.flags.map((reason, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/admin/orgs/${flag.orgId}`)}
              >
                View Organization Details
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}

