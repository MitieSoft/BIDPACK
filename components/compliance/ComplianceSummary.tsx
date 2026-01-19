'use client'

// Compliance Summary Component
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { BidRequirement } from '@/types'

interface ComplianceSummaryProps {
  requirements: BidRequirement[]
}

export default function ComplianceSummary({ requirements }: ComplianceSummaryProps) {
  const total = requirements.length
  const covered = requirements.filter((r) => r.status === 'covered').length
  const missing = requirements.filter((r) => r.status === 'missing').length
  const nonCompliant = requirements.filter((r) => r.status === 'non_compliant').length
  const coveragePercentage = total > 0 ? Math.round((covered / total) * 100) : 0

  return (
    <Card>
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Compliance Summary</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Requirements</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{covered}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Covered</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{missing}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Missing</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{nonCompliant}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Non-Compliant</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Coverage</span>
          <span className="font-medium text-gray-900 dark:text-white">{coveragePercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all"
            style={{ width: `${coveragePercentage}%` }}
          />
        </div>
      </div>
    </Card>
  )
}

