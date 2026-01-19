'use client'

// Export Confirmation Modal Component
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { XMarkIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface ExportConfirmationModalProps {
  isOpen: boolean
  validation: {
    canExport: boolean
    complianceStatus: {
      totalRequirements: number
      coveredCount: number
      missingCount: number
      nonCompliantCount: number
    }
    errors: string[]
  }
  onClose: () => void
  onExport: (format: 'zip' | 'pdf' | 'both') => void
}

export default function ExportConfirmationModal({
  isOpen,
  validation,
  onClose,
  onExport,
}: ExportConfirmationModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'zip' | 'pdf' | 'both'>('zip')

  if (!isOpen) return null

  const coveragePercentage =
    validation.complianceStatus.totalRequirements > 0
      ? Math.round(
          (validation.complianceStatus.coveredCount /
            validation.complianceStatus.totalRequirements) *
            100
        )
      : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Submission Pack</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Compliance Status */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Compliance Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Requirements</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {validation.complianceStatus.totalRequirements}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Covered</span>
                <Badge variant="success" size="sm">
                  {validation.complianceStatus.coveredCount}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Missing</span>
                <Badge variant="warning" size="sm">
                  {validation.complianceStatus.missingCount}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Non-Compliant</span>
                <Badge variant="error" size="sm">
                  {validation.complianceStatus.nonCompliantCount}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all"
                  style={{ width: `${coveragePercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {coveragePercentage}% compliance coverage
              </p>
            </div>
          </div>

          {/* Errors/Warnings */}
          {validation.errors.length > 0 && (
            <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Compliance Issues Detected
                </p>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 list-disc list-inside">
                  {validation.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {validation.canExport && (
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800 dark:text-green-200">
                All requirements are covered. Ready to export.
              </p>
            </div>
          )}

          {/* Export Format Selection */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Export Format</h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedFormat('zip')}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedFormat === 'zip'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <p className="font-medium text-gray-900 dark:text-white">ZIP</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">All files</p>
              </button>
              <button
                onClick={() => setSelectedFormat('pdf')}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedFormat === 'pdf'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <p className="font-medium text-gray-900 dark:text-white">PDF</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Single document</p>
              </button>
              <button
                onClick={() => setSelectedFormat('both')}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedFormat === 'both'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <p className="font-medium text-gray-900 dark:text-white">Both</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ZIP + PDF</p>
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => onExport(selectedFormat)}
              disabled={!validation.canExport}
            >
              {validation.canExport ? 'Export' : 'Cannot Export'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

