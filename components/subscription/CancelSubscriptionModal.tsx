'use client'

// Cancel Subscription Modal Component
import { useState } from 'react'
import { cancelSubscription } from '@/lib/api/subscriptionService'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'
import { toast } from 'react-hot-toast'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface CancelSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  onSuccess,
}: CancelSubscriptionModalProps) {
  const { subscription, setSubscription } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await cancelSubscription()
      toast.success(response.message)
      if (subscription) {
        setSubscription({ ...subscription, cancelAtPeriodEnd: true })
      }
      onSuccess?.()
      onClose()
    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel subscription')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cancel Subscription</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to cancel your subscription? You will continue to have access until the
            end of your current billing period.
          </p>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Keep Subscription
            </Button>
            <Button variant="error" onClick={handleCancel} disabled={isLoading}>
              {isLoading ? 'Canceling...' : 'Cancel Subscription'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

