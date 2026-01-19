// ACU Management Page
'use client'

import LedgerViewer from '@/components/admin/LedgerViewer'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import PageHeader from '@/components/PageHeader'

export default function ACUManagementPage() {
  return (
    <AdminRouteGuard>
      <div className="space-y-6">
        <PageHeader
          title="ACU Management"
          description="View global ACU ledger and transactions"
        />
        <LedgerViewer />
      </div>
    </AdminRouteGuard>
  )
}
