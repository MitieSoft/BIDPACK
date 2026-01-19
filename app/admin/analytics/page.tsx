// Analytics Page
'use client'

import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import PageHeader from '@/components/PageHeader'

export default function AnalyticsPage() {
  return (
    <AdminRouteGuard>
      <div className="space-y-6">
        <PageHeader
          title="Analytics Dashboard"
          description="View system-wide analytics and metrics"
        />
        <AnalyticsDashboard />
      </div>
    </AdminRouteGuard>
  )
}
