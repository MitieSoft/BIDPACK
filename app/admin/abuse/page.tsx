// Abuse Detection Page
'use client'

import AbuseDetection from '@/components/admin/AbuseDetection'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import PageHeader from '@/components/PageHeader'

export default function AbuseDetectionPage() {
  return (
    <AdminRouteGuard>
      <div className="space-y-6">
        <PageHeader
          title="Abuse Detection"
          description="Monitor and manage abuse flags"
        />
        <AbuseDetection />
      </div>
    </AdminRouteGuard>
  )
}
