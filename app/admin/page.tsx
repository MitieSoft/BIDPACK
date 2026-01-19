// Admin Dashboard Page
'use client'

import AdminDashboard from '@/components/admin/AdminDashboard'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import PageHeader from '@/components/PageHeader'

export default function AdminPage() {
  return (
    <AdminRouteGuard>
      <div className="space-y-6">
        <PageHeader
          title="Admin Dashboard"
          description="System overview and quick actions"
        />
        <AdminDashboard />
      </div>
    </AdminRouteGuard>
  )
}
