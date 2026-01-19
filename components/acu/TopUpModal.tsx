'use client'

// Top-up Modal Component
import { useState } from 'react'
import { createTopUp, confirmTopUp } from '@/lib/api/acuService'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { toast } from 'react-hot-toast'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface TopUpModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const topUpPackages = [
  { acus: 20, price: 20, label: '20 ACUs' },
  { acus: 50, price: 45, label: '50 ACUs (10% off)', popular: true },
  { acus: 100, price: 80, label: '100 ACUs (20% off)', bestValue: true },
]

export default function TopUpModal({ isOpen, onClose, onSuccess }: TopUpModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTopUp = async () => {
    if (!selectedPackage) {
      toast.error('Please select a package')
      return
    }

    setIsLoading(true)
    try {
      // Mock: In real app, this would integrate with Stripe
      const { clientSecret } = await createTopUp(selectedPackage as 20 | 50 | 100)
      
      // Mock payment confirmation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await confirmTopUp(clientSecret)
      
      toast.success(`Successfully added ${selectedPackage} ACUs`)
      onSuccess?.()
      onClose()
      setSelectedPackage(null)
    } catch (error: any) {
      toast.error(error.message || 'Failed to process top-up')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Up ACUs</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Purchase additional ACUs to continue using AI-powered features.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {topUpPackages.map((pkg) => (
              <Card
                key={pkg.acus}
                className={`cursor-pointer transition-all ${
                  selectedPackage === pkg.acus
                    ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'hover:shadow-md'
                } ${pkg.popular ? 'border-2 border-yellow-400' : ''}`}
                onClick={() => setSelectedPackage(pkg.acus)}
              >
                <div className="text-center">
                  {pkg.popular && (
                    <Badge variant="warning" size="sm" className="mb-2">
                      Popular
                    </Badge>
                  )}
                  {pkg.bestValue && (
                    <Badge variant="success" size="sm" className="mb-2">
                      Best Value
                    </Badge>
                  )}
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.acus}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">ACUs</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">£{pkg.price}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleTopUp} disabled={!selectedPackage || isLoading}>
              {isLoading ? 'Processing...' : 'Purchase'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

