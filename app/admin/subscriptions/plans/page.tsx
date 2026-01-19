// Plan Management Page
'use client'

import PlanManagement from '@/components/admin/PlanManagement'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import PageHeader from '@/components/PageHeader'

export default function PlansPage() {
  return (
    <AdminRouteGuard>
      <div className="space-y-6">
        <PageHeader
          title="Plan Management"
          description="Create and manage subscription plans, pricing, and features"
        />
        <PlanManagement />
      </div>
    </AdminRouteGuard>
  )
}

