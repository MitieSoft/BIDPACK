'use client'

// ACU Limits Manager Component
import { useState, useEffect } from 'react'
import { getGlobalAISettings, updateGlobalAISettings } from '@/lib/api/adminService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { toast } from 'react-hot-toast'
import type { GlobalAISettings } from '@/lib/api/adminService'

export default function ACULimitsManager() {
  const [settings, setSettings] = useState<GlobalAISettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    maxACUsPerRequest: 10,
    maxACUsPerDay: 100,
    maxACUsPerMonth: 2000,
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await getGlobalAISettings()
      setSettings(data)
      setFormData({
        maxACUsPerRequest: data.maxACUsPerRequest,
        maxACUsPerDay: data.maxACUsPerDay,
        maxACUsPerMonth: data.maxACUsPerMonth,
      })
    } catch (error) {
      toast.error('Failed to load AI settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updated = await updateGlobalAISettings(formData)
      setSettings(updated)
      toast.success('ACU limits updated successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update ACU limits')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <Card>Loading ACU limits...</Card>
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Global ACU Limits</h3>
      <div className="space-y-6">
        <Input
          label="Max ACUs Per Request"
          type="number"
          value={formData.maxACUsPerRequest}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, maxACUsPerRequest: parseInt(e.target.value) || 0 }))
          }
          helperText="Maximum ACUs that can be used in a single AI request"
          min={1}
          required
        />
        <Input
          label="Max ACUs Per Day (Global)"
          type="number"
          value={formData.maxACUsPerDay}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, maxACUsPerDay: parseInt(e.target.value) || 0 }))
          }
          helperText="Maximum ACUs that can be used globally per day across all organizations"
          min={1}
          required
        />
        <Input
          label="Max ACUs Per Month (Global)"
          type="number"
          value={formData.maxACUsPerMonth}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, maxACUsPerMonth: parseInt(e.target.value) || 0 }))
          }
          helperText="Maximum ACUs that can be used globally per month across all organizations"
          min={1}
          required
        />
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Limits'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

