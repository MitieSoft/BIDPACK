'use client'

// AI Confirmation Modal Component
import { useState, useEffect } from 'react'
import { getAIQuote } from '@/lib/api/aiService'
import { getACUBalance } from '@/lib/api/acuService'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface AIConfirmationModalProps {
  isOpen: boolean
  actionType: string
  onClose: () => void
  onConfirm: () => Promise<void>
}

export default function AIConfirmationModal({
  isOpen,
  actionType,
  onClose,
  onConfirm,
}: AIConfirmationModalProps) {
  const [quote, setQuote] = useState<{ acusRequired: number; currentBalance: number; balanceAfter: number; canProceed: boolean } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)

  useEffect(() => {
    if (isOpen && actionType) {
      loadQuote()
    }
  }, [isOpen, actionType])

  const loadQuote = async () => {
    try {
      const { getAIQuote } = await import('@/lib/api/aiService')
      const quoteData = await getAIQuote(actionType)
      setQuote(quoteData)
    } catch (error) {
      toast.error('Failed to get AI quote')
    }
  }

  const handleConfirm = async () => {
    setIsExecuting(true)
    try {
      await onConfirm()
      onClose()
    } catch (error: any) {
      toast.error(error.message || 'AI action failed')
    } finally {
      setIsExecuting(false)
    }
  }

  if (!isOpen || !quote) return null

  const isLowBalance = quote.balanceAfter < 10
  const actionLabels: Record<string, string> = {
    generate_paragraph: 'Generate Paragraph',
    refine_section: 'Refine Section',
    compliance_gap_explain: 'Explain Compliance Gap',
    social_value_refine: 'Refine Social Value',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm AI Action</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            disabled={isExecuting}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Action:</p>
            <p className="font-medium text-gray-900 dark:text-white">{actionLabels[actionType] || actionType}</p>
          </div>

          <Card className="bg-gray-50 dark:bg-gray-900">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">ACUs Required:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{quote.acusRequired} ACUs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Balance:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{quote.currentBalance} ACUs</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Balance After:</span>
                <span
                  className={`font-semibold ${
                    quote.balanceAfter < 0
                      ? 'text-red-600 dark:text-red-400'
                      : isLowBalance
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {quote.balanceAfter} ACUs
                </span>
              </div>
            </div>
          </Card>

          {!quote.canProceed && (
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Insufficient ACU Balance
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  You need {quote.acusRequired} ACUs but only have {quote.currentBalance} ACUs remaining.
                </p>
              </div>
            </div>
          )}

          {isLowBalance && quote.canProceed && (
            <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Low Balance Warning</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Your balance will be low after this action. Consider topping up.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={onClose} disabled={isExecuting}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!quote.canProceed || isExecuting}
            >
              {isExecuting ? 'Processing...' : 'Confirm & Execute'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

