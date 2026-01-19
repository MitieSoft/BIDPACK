// Subscription Management Page
'use client'

import { useRouter } from 'next/navigation'
import SubscriptionManagement from '@/components/admin/SubscriptionManagement'
import AdminRouteGuard from '@/components/admin/AdminRouteGuard'
import PageHeader from '@/components/PageHeader'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Cog6ToothIcon, CreditCardIcon } from '@heroicons/react/24/outline'

export default function SubscriptionsPage() {
  const router = useRouter()

  return (
    <AdminRouteGuard>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <PageHeader
            title="Subscription Management"
            description="View and manage all organization subscriptions"
          />
          <Button
            variant="secondary"
            onClick={() => router.push('/admin/subscriptions/plans')}
          >
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
            Manage Plans
          </Button>
        </div>

        <Card>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <CreditCardIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                  Manage Subscription Plans
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  To edit plan prices, features, or create new plans, use the{' '}
                  <button
                    onClick={() => router.push('/admin/subscriptions/plans')}
                    className="underline font-medium"
                  >
                    Plan Management
                  </button>{' '}
                  page.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <SubscriptionManagement />
      </div>
    </AdminRouteGuard>
  )
}

