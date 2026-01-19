// Subscription Settings Page
import { useState } from 'react'
import SubscriptionCard from '@/components/subscription/SubscriptionCard'
import PlanComparison from '@/components/subscription/PlanComparison'
import CancelSubscriptionButton from '@/components/subscription/CancelSubscriptionButton'
import PageHeader from '@/components/PageHeader'

export default function SubscriptionSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription"
        description="Manage your subscription plan and billing"
      />
      <SubscriptionCard />
      <div className="flex justify-end">
        <CancelSubscriptionButton />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Plans</h2>
        <PlanComparison />
      </div>
    </div>
  )
}

