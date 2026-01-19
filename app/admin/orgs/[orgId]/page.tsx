// Organization Detail Page
'use client'

import { useParams } from 'next/navigation'
import OrgDetail from '@/components/admin/OrgDetail'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import PageHeader from '@/components/PageHeader'

export default function OrgDetailPage() {
  const params = useParams()
  const orgId = params?.orgId as string

  return (
    <AdminRouteGuard>
      <div className="space-y-6">
        <PageHeader
          title="Organization Details"
          description="View organization information and activity"
        />
        <OrgDetail orgId={orgId} />
      </div>
    </AdminRouteGuard>
  )
}
