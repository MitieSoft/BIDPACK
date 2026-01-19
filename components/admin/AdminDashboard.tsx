'use client'

// Admin Dashboard Component
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminStats, getGlobalAISettings, updateGlobalAISettings } from '@/lib/api/adminService'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import GlobalAIToggle from './GlobalAIToggle'
import { ShieldExclamationIcon, ChartBarIcon, BuildingOfficeIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { AdminStats, GlobalAISettings } from '@/lib/api/adminService'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [aiSettings, setAiSettings] = useState<GlobalAISettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [statsData, aiSettingsData] = await Promise.all([
        getAdminStats(),
        getGlobalAISettings(),
      ])
      setStats(statsData)
      setAiSettings(aiSettingsData)
    } catch (error) {
      toast.error('Failed to load admin data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAIToggle = async (enabled: boolean) => {
    try {
      const updated = await updateGlobalAISettings({ aiEnabled: enabled })
      setAiSettings(updated)
      toast.success(`AI ${enabled ? 'enabled' : 'disabled'} globally`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update AI settings')
    }
  }

  if (isLoading) {
    return <Card>Loading admin dashboard...</Card>
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Organizations</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalOrgs || 0}</p>
            </div>
            <BuildingOfficeIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Subscriptions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.activeSubscriptions || 0}
              </p>
            </div>
            <Badge variant="success" size="lg">
              Active
            </Badge>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total ACU Usage</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.totalACUUsage?.toLocaleString() || 0}
              </p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total AI Requests</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.totalAIRequests?.toLocaleString() || 0}
              </p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Global AI Controls</h3>
          {aiSettings && (
            <GlobalAIToggle
              enabled={aiSettings.aiEnabled}
              onToggle={handleAIToggle}
            />
          )}
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => router.push('/admin/abuse')}
            >
              <ShieldExclamationIcon className="h-5 w-5 mr-2" />
              View Abuse Flags
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => router.push('/admin/orgs')}
            >
              <BuildingOfficeIcon className="h-5 w-5 mr-2" />
              Manage Organizations
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => router.push('/admin/analytics')}
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              View Analytics
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => router.push('/admin/subscriptions')}
            >
              <CreditCardIcon className="h-5 w-5 mr-2" />
              Manage Subscriptions
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

