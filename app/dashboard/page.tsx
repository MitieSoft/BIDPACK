// Dashboard Page
'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import PageHeader from '@/components/PageHeader'
import LoadingSpinner from '@/components/LoadingSpinner'
import ACUUsageChart from '@/components/dashboard/ACUUsageChart'
import BidStatusChart from '@/components/dashboard/BidStatusChart'
import RecentActivity from '@/components/dashboard/RecentActivity'
import RecentBids from '@/components/dashboard/RecentBids'
import { getACUBalance } from '@/lib/api/acuService'
import { getDashboardStats } from '@/lib/api/dashboardService'
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const { user, isAuthenticated, checkAuth } = useAuthStore()
  const router = useRouter()
  const [acuBalance, setAcuBalance] = useState<{ balance: number; usageThisMonth: number; monthlyAllocation: number } | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      setIsChecking(true)
      await checkAuth()
      setIsChecking(false)
    }
    verifyAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      router.push('/login')
    }
  }, [isChecking, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated && user) {
      Promise.all([getACUBalance(), getDashboardStats()])
        .then(([balance, dashboardStats]) => {
          setAcuBalance(balance)
          setStats(dashboardStats)
        })
        .catch(() => {})
    }
  }, [isAuthenticated, user])

  if (isChecking || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner text="Loading dashboard..." />
      </div>
    )
  }

  const acuUsageChange = stats
    ? stats.acuUsageLastMonth > 0
      ? ((stats.acuUsageThisMonth - stats.acuUsageLastMonth) / stats.acuUsageLastMonth) * 100
      : 0
    : 0

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${user.firstName}! Here's your overview.`}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">ACU Balance</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {acuBalance?.balance ?? '...'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {acuBalance?.usageThisMonth ?? 0} used this month
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <CurrencyDollarIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Bids</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.totalBids ?? 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stats?.activeBids ?? 0} active
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">ACU Usage</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.acuUsageThisMonth ?? 0}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {acuUsageChange > 0 ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-red-500" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 text-green-500" />
                )}
                <p className={`text-xs ${acuUsageChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {acuUsageChange > 0 ? '+' : ''}
                  {Math.abs(acuUsageChange).toFixed(0)}% vs last month
                </p>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <SparklesIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">AI Requests</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.aiRequestsThisMonth ?? 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This month</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <SparklesIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ACUUsageChart />
        <BidStatusChart />
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBids />
        <RecentActivity />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <FolderIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Policies</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.totalPolicies ?? 0}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <ClipboardDocumentListIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Method Statements</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.totalMethodStatements ?? 0}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ready to Submit</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.readyBids ?? 0}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

