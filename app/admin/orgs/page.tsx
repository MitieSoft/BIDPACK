// Organizations Management Page
'use client'

import OrgManagement from '@/components/admin/OrgManagement'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import PageHeader from '@/components/PageHeader'

export default function OrganizationsPage() {
  return (
    <AdminRouteGuard>
      <div className="space-y-6">
        <PageHeader
          title="Organization Management"
          description="View and manage all organizations"
        />
        <OrgManagement />
      </div>
    </AdminRouteGuard>
  )
}
