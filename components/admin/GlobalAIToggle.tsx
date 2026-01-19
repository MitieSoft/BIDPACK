'use client'

// Global AI Toggle Component
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface GlobalAIToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export default function GlobalAIToggle({ enabled, onToggle }: GlobalAIToggleProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleToggle = () => {
    if (enabled) {
      // Disabling requires confirmation
      setShowConfirm(true)
    } else {
      // Enabling is immediate
      onToggle(true)
    }
  }

  const handleConfirm = () => {
    onToggle(false)
    setShowConfirm(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">AI System Status</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {enabled
              ? 'AI features are enabled globally'
              : 'AI features are disabled globally'}
          </p>
        </div>
        <Badge variant={enabled ? 'success' : 'error'} size="lg">
          {enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      </div>

      {showConfirm ? (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Disable AI System?
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                This will disable AI features for all organizations. This action can be reversed at any time.
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="error" onClick={handleConfirm}>
                  Confirm Disable
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleToggle}
          variant={enabled ? 'error' : 'primary'}
          className="w-full"
        >
          {enabled ? 'Disable AI System' : 'Enable AI System'}
        </Button>
      )}
    </div>
  )
}

