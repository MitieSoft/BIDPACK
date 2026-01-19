'use client'

// Policy Templates Component
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getPolicyTemplates, createPolicyFromTemplate } from '@/lib/api/policyService'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import PolicyTypeBadge from './PolicyTypeBadge'
import { toast } from 'react-hot-toast'
import type { Policy } from '@/types'

export default function PolicyTemplates() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Policy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [creatingId, setCreatingId] = useState<string | null>(null)

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const data = await getPolicyTemplates()
      setTemplates(data)
    } catch (error) {
      toast.error('Failed to load templates')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseTemplate = async (templateId: string) => {
    setCreatingId(templateId)
    try {
      const newPolicy = await createPolicyFromTemplate(templateId)
      toast.success('Policy created from template')
      router.push(`/policies/${newPolicy.id}/edit`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to create policy from template')
    } finally {
      setCreatingId(null)
    }
  }

  if (isLoading) {
    return <Card>Loading templates...</Card>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <PolicyTypeBadge type={template.policyType} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {template.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {template.content.substring(0, 150)}...
          </p>
          <Button
            className="w-full"
            onClick={() => handleUseTemplate(template.id)}
            disabled={creatingId === template.id}
          >
            {creatingId === template.id ? 'Creating...' : 'Use Template'}
          </Button>
        </Card>
      ))}
    </div>
  )
}

