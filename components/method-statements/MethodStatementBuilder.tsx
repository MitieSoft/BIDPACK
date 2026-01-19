'use client'

// Method Statement Builder Component
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  createMethodStatement,
  updateMethodStatement,
  getMethodStatement,
} from '@/lib/api/methodStatementService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Card from '@/components/ui/Card'
import AIActionButton from '@/components/ai/AIActionButton'
import { toast } from 'react-hot-toast'
import type { MethodStatement, TradeType } from '@/types'

interface MethodStatementBuilderProps {
  methodStatementId?: string
}

const sections = [
  { key: 'scopeOfWorks', label: 'Scope of Works' },
  { key: 'resources', label: 'Resources' },
  { key: 'plantMaterials', label: 'Plant & Materials' },
  { key: 'hsControls', label: 'H&S Controls' },
  { key: 'rams', label: 'RAMS' },
  { key: 'environmentalControls', label: 'Environmental Controls' },
  { key: 'qa', label: 'QA' },
  { key: 'emergencyProcedures', label: 'Emergency Procedures' },
] as const

export default function MethodStatementBuilder({ methodStatementId }: MethodStatementBuilderProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMS, setIsLoadingMS] = useState(!!methodStatementId)
  const [tradeType, setTradeType] = useState<TradeType>('highways')
  const [title, setTitle] = useState('')
  const [formData, setFormData] = useState<Record<string, string>>({
    scopeOfWorks: '',
    resources: '',
    plantMaterials: '',
    hsControls: '',
    rams: '',
    environmentalControls: '',
    qa: '',
    emergencyProcedures: '',
  })

  useEffect(() => {
    if (methodStatementId) {
      loadMethodStatement()
    }
  }, [methodStatementId])

  const loadMethodStatement = async () => {
    try {
      const ms = await getMethodStatement(methodStatementId!)
      if (ms) {
        setTradeType(ms.tradeType)
        setTitle(ms.title)
        setFormData({
          scopeOfWorks: ms.scopeOfWorks,
          resources: ms.resources,
          plantMaterials: ms.plantMaterials,
          hsControls: ms.hsControls,
          rams: ms.rams,
          environmentalControls: ms.environmentalControls,
          qa: ms.qa,
          emergencyProcedures: ms.emergencyProcedures,
        })
      }
    } catch (error) {
      toast.error('Failed to load method statement')
    } finally {
      setIsLoadingMS(false)
    }
  }

  const handleSectionChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title')
      return
    }

    setIsLoading(true)
    try {
      if (methodStatementId) {
        await updateMethodStatement(methodStatementId, {
          title,
          tradeType,
          ...formData,
        })
        toast.success('Method statement updated successfully')
      } else {
        const newMS = await createMethodStatement({
          tradeType,
          title,
          ...formData,
        } as any)
        toast.success('Method statement created successfully')
        router.push(`/method-statements/${newMS.id}`)
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save method statement')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingMS) {
    return <Card>Loading method statement...</Card>
  }

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trade Type
          </label>
          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value as TradeType)}
            disabled={!!methodStatementId}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
          >
            <option value="groundworks_civils">Groundworks & Civils</option>
            <option value="electrical">Electrical</option>
            <option value="mechanical">Mechanical</option>
            <option value="fit_out">Fit-Out</option>
            <option value="highways">Highways</option>
          </select>
        </div>

        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Highways Maintenance – Night Works"
          required
        />

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.key}>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {section.label}
                </label>
                <AIActionButton
                  actionType="refine_section"
                  prompt={`Refine the ${section.label} section`}
                  context={formData[section.key] || ''}
                  onSuccess={(refinedContent) => {
                    handleSectionChange(section.key, refinedContent)
                  }}
                  size="sm"
                />
              </div>
              <Textarea
                value={formData[section.key] || ''}
                onChange={(e) => handleSectionChange(section.key, e.target.value)}
                rows={6}
                placeholder={`Enter ${section.label.toLowerCase()}...`}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Saving...' : methodStatementId ? 'Update Method Statement' : 'Create Method Statement'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

