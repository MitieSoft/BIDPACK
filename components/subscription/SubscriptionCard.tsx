'use client'

// Subscription Card Component
import { useAuthStore } from '@/store/authStore'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { format } from 'date-fns'

export default function SubscriptionCard() {
  const { subscription } = useAuthStore()

  if (!subscription) {
    return <Card>No active subscription</Card>
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'trialing':
        return 'info'
      case 'past_due':
        return 'warning'
      case 'canceled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getPlanName = (planType: string) => {
    return planType.charAt(0).toUpperCase() + planType.slice(1)
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Plan</h3>
        <Badge variant={getStatusVariant(subscription.status)} size="sm">
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
        </Badge>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Plan Type</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {getPlanName(subscription.planType)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Current Period</p>
          <p className="text-gray-900 dark:text-white">
            {format(new Date(subscription.currentPeriodStart), 'MMM d, yyyy')} -{' '}
            {format(new Date(subscription.currentPeriodEnd), 'MMM d, yyyy')}
          </p>
        </div>
        {subscription.cancelAtPeriodEnd && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Subscription will be canceled at the end of the current period.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}

