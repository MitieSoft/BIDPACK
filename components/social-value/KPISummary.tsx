'use client'

// KPI Summary Component
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface KPISummaryProps {
  formData: {
    localEmploymentCount: number
    apprenticeshipsCount: number
    smeSpendPercentage: number
    carbonReductionKg: number
    communityEngagementHours: number
  }
}

export default function KPISummary({ formData }: KPISummaryProps) {
  const apprenticeshipRate =
    formData.localEmploymentCount > 0
      ? ((formData.apprenticeshipsCount / formData.localEmploymentCount) * 100).toFixed(1)
      : '0'

  const isPPNCompliant = formData.smeSpendPercentage >= 20

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">KPI Summary</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Local Employment</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formData.localEmploymentCount} jobs
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Apprenticeships</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formData.apprenticeshipsCount} ({apprenticeshipRate}%)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">SME Spend</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formData.smeSpendPercentage}%
            </p>
            {isPPNCompliant ? (
              <Badge variant="success" size="sm" className="mt-1">
                PPN 06/20 Compliant
              </Badge>
            ) : (
              <Badge variant="warning" size="sm" className="mt-1">
                Below PPN 06/20 (20% required)
              </Badge>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Carbon Reduction</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formData.carbonReductionKg.toLocaleString()} kg
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Community Engagement</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formData.communityEngagementHours} hours
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

