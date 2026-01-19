'use client'

// Status Indicator Component
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import type { BidRequirement } from '@/types'

interface StatusIndicatorProps {
  status: BidRequirement['status']
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  switch (status) {
    case 'covered':
      return (
        <div className="flex items-center text-green-600 dark:text-green-400">
          <CheckCircleIcon className="h-5 w-5 mr-1" />
          <span className="text-sm">Covered</span>
        </div>
      )
    case 'missing':
      return (
        <div className="flex items-center text-yellow-600 dark:text-yellow-400">
          <ExclamationTriangleIcon className="h-5 w-5 mr-1" />
          <span className="text-sm">Missing</span>
        </div>
      )
    case 'non_compliant':
      return (
        <div className="flex items-center text-red-600 dark:text-red-400">
          <XCircleIcon className="h-5 w-5 mr-1" />
          <span className="text-sm">Non-Compliant</span>
        </div>
      )
    default:
      return null
  }
}

