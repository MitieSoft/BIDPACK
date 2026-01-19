'use client'

// AI Paused Screen Component
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ExclamationTriangleIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

interface AIPausedScreenProps {
  monthlyAllocation: number
}

export default function AIPausedScreen({ monthlyAllocation }: AIPausedScreenProps) {
  const router = useRouter()

  return (
    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="h-16 w-16 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
          AI Assistance Paused
        </h3>
        <p className="text-yellow-800 dark:text-yellow-300 mb-6 max-w-md mx-auto">
          AI assistance is currently paused due to insufficient ACU balance. Please top up your ACUs to continue using AI-powered features.
        </p>
        <div className="space-y-3">
          <Button onClick={() => router.push('/dashboard/acu')}>
            <CurrencyDollarIcon className="h-5 w-5 mr-2" />
            Top Up ACUs
          </Button>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            Monthly allocation: {monthlyAllocation} ACUs
          </p>
        </div>
      </div>
    </Card>
  )
}

