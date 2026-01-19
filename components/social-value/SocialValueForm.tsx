'use client'

// Social Value Form Component
import { useEffect, useState } from 'react'
import { getSocialValue, createOrUpdateSocialValue } from '@/lib/api/socialValueService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import KPISummary from './KPISummary'
import AIActionButton from '@/components/ai/AIActionButton'
import { toast } from 'react-hot-toast'
import type { SocialValue } from '@/types'

interface SocialValueFormProps {
  bidId: string
}

export default function SocialValueForm({ bidId }: SocialValueFormProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    localEmploymentCount: 0,
    apprenticeshipsCount: 0,
    smeSpendPercentage: 0,
    carbonReductionKg: 0,
    communityEngagementHours: 0,
  })

  useEffect(() => {
    loadSocialValue()
  }, [bidId])

  const loadSocialValue = async () => {
    try {
      const data = await getSocialValue(bidId)
      if (data) {
        setFormData({
          localEmploymentCount: data.localEmploymentCount,
          apprenticeshipsCount: data.apprenticeshipsCount,
          smeSpendPercentage: data.smeSpendPercentage,
          carbonReductionKg: data.carbonReductionKg,
          communityEngagementHours: data.communityEngagementHours,
        })
      }
    } catch (error) {
      console.error('Failed to load social value')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSaving(true)
    try {
      await createOrUpdateSocialValue(bidId, formData)
      toast.success('Social value data saved successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to save social value data')
    } finally {
      setIsSaving(false)
    }
  }

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all social value data?')) {
      setFormData({
        localEmploymentCount: 0,
        apprenticeshipsCount: 0,
        smeSpendPercentage: 0,
        carbonReductionKg: 0,
        communityEngagementHours: 0,
      })
    }
  }

  if (isLoading) {
    return <Card>Loading social value data...</Card>
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Value KPIs</h3>
          <AIActionButton
            actionType="social_value_refine"
            prompt="Refine social value commitments based on current KPI values"
            context={JSON.stringify(formData)}
            bidId={bidId}
            onSuccess={(refinedContent) => {
              // Could parse and update form data from AI response
              toast.success('Social value refined. Review the suggestions.')
            }}
            size="sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Local Employment Count"
              type="number"
              value={formData.localEmploymentCount}
              onChange={(e) => handleChange('localEmploymentCount', parseInt(e.target.value) || 0)}
              helperText="Number of local jobs created"
              min={0}
            />
          </div>
          <div>
            <Input
              label="Apprenticeships Count"
              type="number"
              value={formData.apprenticeshipsCount}
              onChange={(e) => handleChange('apprenticeshipsCount', parseInt(e.target.value) || 0)}
              helperText="Number of apprenticeship opportunities"
              min={0}
            />
          </div>
          <div>
            <Input
              label="SME Spend Percentage"
              type="number"
              value={formData.smeSpendPercentage}
              onChange={(e) => handleChange('smeSpendPercentage', parseFloat(e.target.value) || 0)}
              helperText="Percentage of spend with SMEs"
              min={0}
              max={100}
            />
          </div>
          <div>
            <Input
              label="Carbon Reduction (kg)"
              type="number"
              value={formData.carbonReductionKg}
              onChange={(e) => handleChange('carbonReductionKg', parseInt(e.target.value) || 0)}
              helperText="Carbon reduction in kilograms"
              min={0}
            />
          </div>
          <div>
            <Input
              label="Community Engagement (hours)"
              type="number"
              value={formData.communityEngagementHours}
              onChange={(e) => handleChange('communityEngagementHours', parseInt(e.target.value) || 0)}
              helperText="Hours of community engagement"
              min={0}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="ghost" onClick={handleClear}>
            Clear
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Card>

      <KPISummary formData={formData} />
    </div>
  )
}

